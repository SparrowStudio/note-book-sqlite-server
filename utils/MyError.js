/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 00:53:13
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 10:44:27
 */
function MyError(errcode = 50000, message = { }) {
	this.name = "MyError";
	this.errcode = errcode;
	this.resBody = message;
	this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;
// global.MyError = MyError;
module.exports = MyError;
// try {
// 	throw new MyError();
// } catch (e) {
// 	console.log(e.name); // 'MyError'
// 	console.log(e.message); // 'Default Message'
// }

// try {
// 	throw new MyError("custom message");
// } catch (e) {
// 	console.log(e.name); // 'MyError'
// 	console.log(e.message); // 'custom message'
// }
