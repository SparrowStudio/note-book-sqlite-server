/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 17:28:32
 */

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
const { login } = require("../../joi/users.joi");

const { errcode, md5Slat, generateToken } = require("../../../utils/index");
/**
 * 登录
 */
router.post("/", async function(req, res) {
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
	const users = await prisma.users.findFirst({
		where: {
			email,
			password: md5Slat(password)
		},
		select: {
			id: true,
			name: true,
			email: true,
			create_time: true
		}
	});
	console.log(users);
	// info 账号或者密码错误
	if (!users) {
		const { status, body } = errcode(41000);
		res.status(status).send(body);
		return;
	}
	const accessToken = generateToken(users);
	const refreshToken = generateToken(users, 24 * 60 * 60 * 1000);
	await req.redis.sadd(`${users.id}#access_token`, accessToken, 2 * 60 * 60 * 1000);
	await req.redis.sadd(`${users.id}#refresh_token`, refreshToken, 24 * 60 * 60 * 1000);
	// TODO 生成 token
	res.send({ ...users, accessToken, refreshToken });
});

router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
