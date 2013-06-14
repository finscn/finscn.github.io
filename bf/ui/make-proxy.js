var fs = require('fs');

var UIAction = require('./ui-action.js').UIAction;
var UICtrl = require('./ui-ctrl.js').UICtrl;


function makeProxy(module,name){
	var noArgFunc=/function\s*\(\s*\)/ ;

// ViewBridge.evalRemote("Module.method()");
// ViewBridge.evalRemoteWithArgs("Module.method",arguments);

	var proxy=[];
	for (var p in module){
		if (p.indexOf("_proxy")>=0){
			continue;
		}
		var v=module[p];
		if (module["_proxy_"+p]){
			proxy.push(
				p+" : "+String(module["_proxy_"+p])+","
			);
		}else if (typeof v=="function"){
			var func=String(v);
			func=func.substring(0,func.indexOf("\n"));
			if (noArgFunc.test(func)){
				proxy.push(
					p+" : function(){\n    ViewBridge.evalRemote(\""+name+"."+p+"()\");\n},"
				);
			}else{
				proxy.push(
					p+" : function(){\n    ViewBridge.evalRemoteWithArgs(\""+name+"."+p+"\",arguments);\n},"
				);

			}
		}
	}
	proxy.unshift("var "+name+"={");
	proxy.push("};");
	return proxy;
}




UIActionProxy= makeProxy(UIAction,"UIAction");
UICtrlProxy= makeProxy(UICtrl,"UICtrl");

var encoding="utf8";
fs.writeFileSync("ui-action-proxy.js", UIActionProxy.join("\n"), encoding);
fs.writeFileSync("ui-ctrl-proxy.js", UICtrlProxy.join("\n"), encoding);






