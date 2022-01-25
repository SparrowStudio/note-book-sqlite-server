/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 21:49:49
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 22:16:32
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
// const redis = require("../../db/redis").init();

// info 通用方法
const { errcode, MyError, md5Slat } = require("../../../utils/index");
const { register } = require("../../joi/v1/register.joi");
/**
 * register 注册
 */
router.post("", async function(req, res, next) {
	try {
		// info 检验参数
		await register.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});
		const user = await prisma.users.findUnique({
			where: {
				email: req.body.email
			}
		});
		if (user) {
			throw new MyError(41003);
		}
		await prisma.users.create({
			name: req.body.name,
			email: req.body.email,
			password: await md5Slat(req.body.password)
		});
		const { status, body } = errcode(0);
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
