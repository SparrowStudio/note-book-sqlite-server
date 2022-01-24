/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-24 23:06:36
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 01:24:27
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();

// info 数据校验
const { login } = require("../../joi/v1/auth.joi");

// info 通用方法
const { errcode, md5Slat, generateToken, MyError } = require("../../../utils/index");

/**
 * 登录
 */
router.post("", async function(req, res, next) {
	try {
		// info 检验参数
		await login.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});
		const { email, password } = req.body;

		// info 查找用户
		const users = await prisma.users.findFirst({
			where: {
				email,
				password: await md5Slat(password)
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
		const accessToken = await generateToken(users);
		const refreshToken = await generateToken(users, 24 * 60 * 60 * 1000);
		await redis.set(`${users.id}#access_token`, accessToken, "Ex", 2 * 60 * 60);
		await redis.set(`${users.id}#refresh_token`, refreshToken, "Ex", 24 * 60 * 60);
		const { status, body } = errcode(0, { ...users, accessToken, refreshToken });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});
/**
 * 安全退出
 */
router.delete("", async (req, res, next) => {
	try {
		const decodeToken = req.decodeToken;
		await redis.del(`${decodeToken.id}#refresh_token`);
		await redis.del(`${decodeToken.id}#access_token`);
		const { status, body } = errcode(0);
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
