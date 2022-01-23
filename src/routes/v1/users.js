/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 23:25:33
 */

const express = require("express");
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();
const router = express.Router();
const { login } = require("../../joi/users.joi");

const { errcode, md5Slat, generateToken } = require("../../../utils/index");
/**
 * 登录
 */
router.post("/", async function(req, res, next) {
	// info 检验参数
	try {
		await login.validateAsync(req.body);
	} catch (err) {
		console.log(err);
		const { body, status } = errcode("40001", err);
		res.status(status).send(body);
		return;
	}
	// info 查找用户
	const { email, password } = req.body;
	console.log("email", email, password);
	try {
		const users = await prisma.users.findFirst({
			where: {
				email,
				password: md5Slat(password)
			},
			select1: {
				id: true,
				name: true,
				email: true,
				create_time: true
			}
		});
		// info 账号或者密码错误
		if (!users) {
			const { status, body } = errcode(41000);
			res.status(status).send(body);
			return;
		}
		// info 生成 token
		const accessToken = generateToken(users);
		const refreshToken = generateToken(users, 24 * 60 * 60 * 1000);
		await redis.set(`${users.id}#access_token`, accessToken, "Ex", 2 * 60 * 60);
		await redis.set(`${users.id}#refresh_token`, refreshToken, "Ex", 24 * 60 * 60);
		res.send({ ...users, accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
});

router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
