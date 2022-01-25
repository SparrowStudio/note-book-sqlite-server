/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 23:13:36
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();

// info 通用方法
const { errcode, MyError, md5Slat } = require("../../../utils/index");
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

/**
 * 更换用户基础信息
 */
router.patch("/info", async function(req, res, next) {
	try {
		// info 检验参数
		await update_user_info.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});
		const deToken = req.decodeToken;
		const redisLock = await redis.set(`update_user_info#${deToken.id}`, true, "Ex", 5, "Nx");

		if (!redisLock) {
			throw new Error(40003);
		}

		const { name } = req.body;
		const users = await prisma.users.update({
			where: {
				id: deToken.id
			},
			data: {
				name
			},
			select: {
				id: true,
				name: true,
				email: true,
				create_time: true
			}
		});
		if (!users) {
			throw new MyError(41001);
		}
		await redis.del(`update_user_info#${deToken.id}`);
		const { status, body } = errcode(0, { ...users });
		res.status(status).send(body);
	} catch (error) {
		console.log("error", error);
		next(error);
	}
});

/**
 *  更换邮箱
 */
router.patch("/email", async function(req, res, next) {
	try {
		// * 加锁
		// info 检验参数
		await update_user_email.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});

		const { email, captcha } = req.body;
		const deToken = req.decodeToken;
		const redisLock = await redis.set(`update_user_email#${deToken.id}`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			throw new Error(40003);
		}
		const redisData = await redis.get(`${deToken.id}#captcha#email`);
		if (!redisData) {
			await redis.del(`update_user_email#${deToken.id}`);
			throw new MyError(41002);
		}
		const [redisEmail, redisCaptcha] = redisData.split("?");
		if (email !== redisEmail || redisCaptcha !== captcha) {
			await redis.del(`update_user_email#${deToken.id}`);
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
		await redis.del(`update_user_email#${deToken.id}`);

		await redis.del(`${deToken.id}#refresh_token`);
		await redis.del(`${deToken.id}#access_token`);
		const { status, body } = errcode(0);
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});
/**
 * 更换密码
 */
router.patch("/password", async function(req, res, next) {
	// info 检验参数
	try {
		await update_user_password.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});

		const { password } = req.body;
		const deToken = req.decodeToken;
		const redisLock = await redis.set(`update_user_password#${deToken.id}`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			throw new Error(40003);
		}
		await prisma.users.update({
			where: {
				id: deToken.id
			},
			data: {
				password: await md5Slat(password)
			}
		});
		await redis.del(`${deToken.id}#refresh_token`);
		await redis.del(`${deToken.id}#access_token`);
		await redis.del(`update_user_password#${deToken.id}`);
		const { status, body } = errcode(0);
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
