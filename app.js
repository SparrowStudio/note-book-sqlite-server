/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-03-17 16:07:22
 */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MyError = require("./utils/MyError");
const { errcode } = require("./utils/index");
const authMiddleware = require("./src/middleware/auth");
const indexRouter = require("./src/routes/index");

const app = express();
app.all("*", function(req, res, next) {
	// 设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	// 允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	// 跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() === "options") {
		// 让options尝试请求快速结束
		res.send(200);
	} else { next(); }
});
app.use(logger("dev"));
app.use(express.json({ 
	verify(req, res, buf, encoding){
		try {
			JSON.parse(buf.toString());
		} catch (error) {
			throw new MyError(40001, {err:"JSON_ERROR"});
		}
	}
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	authMiddleware({
		excludes: [{
			method: "POST",
			path: "/api/v1/auth"
		}, {
			method: "POST",
			path: "/api/v1/register"
		}]
	})
);
app.use("/", indexRouter);

// info 404 错误捕捉
app.use(function ErrorHandler(err, req, res, next) {
	next(err || errcode(404).body);
});
// info 错误捕捉
app.use(function ErrorHandler(err, req, res, next) {
	// console.error("sss",err)
	const error = errcode(err.errcode);
	// console.log(err);
	res.status(error.status)
		.send({ ...error.body, ...(err.name === "MyError" ? err.resBody : {}) });
});
module.exports = app;
