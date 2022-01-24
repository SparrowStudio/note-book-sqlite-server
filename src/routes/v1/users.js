/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 14:01:57
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();

// info 数据校验
const { login } = require("../../joi/v1/users.joi");

// info 通用方法
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
			select: {
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
		const { status, body } = errcode(0, { ...users, accessToken, refreshToken });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

/**
 * 获取token所属用户信息
 */
router.get("/me", async function(req, res, next) {
	try {
		const deToken = req.decodeToken;
		const users = await prisma.users.findUnique({
			where: {
				id: deToken.id
			},
			select: {
				id: true,
				name: true,
				create_time: true,
				email: true
			}
		});
		const { status, body } = errcode(0, { ...users });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
