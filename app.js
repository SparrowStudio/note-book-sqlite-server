/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 15:30:26
 */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const redisMiddleware = require("./src/middleware/redis");
const authMiddleware = require("./src/middleware/auth");
const indexRouter = require("./src/routes/index");
// const usersRouter = require("./routes/users");
// const noteRouter = require("./routes/note");
// const trashRouter = require("./routes/trash");
// const tagsRouter = require("./routes/tags");

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
app.use(redisMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(authMiddleware({
	excludes: [{
		method: "POST",
		path: "/api/v1/users"
	}]
}));

app.use("/", indexRouter);

module.exports = app;
