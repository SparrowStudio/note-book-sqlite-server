const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const noteRouter = require("./routes/note");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/note", noteRouter);

module.exports = app;
