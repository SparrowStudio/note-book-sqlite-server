/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 10:25:51
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();

// info 通用方法
const { errcode, MyError } = require("../../../utils/index");
const { update_user_info, update_user_email, update_user_password } = require("../../joi/v1/user.joi");

/**
 * 获取token所属用户信息
 */
router.get("", async function(req, res, next) {
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
		if (!users) {
			throw new MyError(41001);
		}
		const { status, body } = errcode(0, { ...users });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

router.patch("/info", async function(req, res, next) {
	try {
		// info 检验参数
		await update_user_info.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});

		const res = req.body;
		const deToken = req.decodeToken;
		const users = await prisma.users.update({
			where: {
				id: deToken.id
			},
			data: {
				name: res.name
			}
		});
		if (!users) {
			throw new MyError(41001);
		}
		const { status, body } = errcode(0, { ...users });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

router.patch("/email", async function(req, res, next) {
	try {
		// todo 加锁
		// info 检验参数
		await update_user_email.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});

		const { email, captcha } = req.body;
		const deToken = req.decodeToken;
		const redisData = await redis.get(`${deToken.id}#captcha#email`);
		if (!redisData) {
			throw new MyError(41002);
		}
		const [redisEmail, redisCaptcha] = redisData.split("?");
		if (email !== redisEmail || redisCaptcha !== captcha) {
			throw new MyError(41002);
		}
		await prisma.users.update({
			where: {
				id: deToken.id
			},
			data: {
				email: res.email
			}
		});
		const user = await prisma.users.findFirst({
			where: {
				id: deToken.id
			},
			select: {
				id: true,
				name: true,
				email: true,
				create_time: true
			}
		});

		const { status, body } = errcode(0, { ...user });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});
router.patch("/password", async function(req, res, next) {
	// info 检验参数
	try {
		await update_user_password.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});

		const { password, captcha } = req.body;
		const deToken = req.decodeToken;
		const redisData = await redis.get(`${deToken.id}#captcha#password`);
		if (!redisData) {
			throw new MyError(41002);
		}
		const redisCaptcha = redisData;
		if (redisCaptcha !== captcha) {
			throw new MyError(41002);
		}
		const users = await prisma.users.update({
			where: {
				id: deToken.id
			},
			data: {
				password
			}
		});
		const { status, body } = errcode(0, { ...users });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
