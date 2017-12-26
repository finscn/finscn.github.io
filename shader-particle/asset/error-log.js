"use strict";

window.printLog = function(msgs) {
    var body = document.body;
    if (!body || !body.style) {
        setTimeout(function() {
            window.printLog(msgs);
        }, 300);
        return;
    }
    body.style.backgroundColor = "#111111";
    body.style.color = "#eeeeee";
    body.style.padding = "4px";
    var html = msgs.join('<br>') + "<br><br><br><br>";
    html += '<input type="button" value="刷 新 重 试" onclick="window.reloadAll()" style="font-szie:30px;margin:4px;padding:5px;">';
    body.innerHTML = html;
};

window.globalErrorCount = 0;
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber) {
    window.globalErrorCount++;
    var msgs = [];
    msgs.push("Error:");
    msgs.push("\n错误信息：", errorMessage);
    msgs.push("\n出错文件：", scriptURI);
    msgs.push("\n出错位置：", lineNumber + '行，' + columnNumber + '列');

    if (window.submitError) {
        // window.submitError(msgs.join(" ; "));
        window.submitError(lineNumber + '行，' + columnNumber + '列，' + errorMessage);
    }
    if (window.ignoreErrors) {
        var ignore = false;
        window.ignoreErrors.some(function(keyWord) {
            if (errorMessage.indexOf(keyWord) != -1) {
                ignore = true;
                return true;
            }
        });
        if (ignore) {
            console.log(msgs.join(";\n"));
            return;
        }
    }
    window.printLog(msgs)
};
