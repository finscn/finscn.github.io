var width = 640;
var height = 480;

var params = getUrlParams();
var particleCount = parseInt(params.p) || 2 * 10000;

var zoom = parseFloat(params.z) || 0.5 * 2;

var useFilter = parseFloat(params.f) || false;
var useFramebuffer = parseFloat(params.fb) || null;
