/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

loadLib("Start.json")
loadLib("version.json")
loadLib("unpack.json")
//-----libs-begin-----
loadLib("libs/box2d.js")
//-----libs-end-------
loadLib("laya.js");
loadLib("js/bundle.js");