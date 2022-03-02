/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 21:49:49
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-20 18:20:11
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/notion.prisma")
	.init();
const redis = require("../../db/redis")
	.init();

// info 通用方法
const { errcode, MyError, md5Slat, cherry } = require("../../../utils/index");
const { register } = require("../../joi/v1/register.joi");
/**
 * register 邮箱密码注册
 */
router.post("", async function(req, res, next) {
	try {
		// info 检验参数
		// info 加锁
		const { name, email, password } = await register.validateAsync(req.body)
			.catch(err => {
				throw new MyError(40001, err);
			});
		const redisLock = await redis.set(`register#${email}`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			// 加锁失败
			throw new MyError(40004);
		}
		const user = await prisma.notionUser.findUnique({
			where: {
				email: req.body.email
			}
		});
		if (user) {
			await redis.del(`register#${email}`);
			throw new MyError(41003);
		}
		const meta_user_id = cherry.id();
		const meta_user_role = "editor";
		// info 创建用户
		await prisma.$transaction([
			prisma.notionUser.create({
				data: {
					id: meta_user_id,
					name: name,
					email: email,
					password: await md5Slat(password),
					meta_user_id,
					meta_user_role
				}
			}),
			prisma.userRoot.create({
				data: {
					id: meta_user_id,
					meta_user_id,
					meta_user_role
				}
			})
		]);
		// info 删除锁
		await redis.del(`register#${email}`);
		const { status, body } = errcode(0);
		res.status(status)
			.send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
