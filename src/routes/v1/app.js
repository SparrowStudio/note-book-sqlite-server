/**
 * @Description:
 * @author: bubao
 * @Date: 2022-02-19 12:57:26
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-20 15:10:07
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/notion.prisma").init();
const redis = require("../../db/redis").init();

// info 通用方法
const { errcode, MyError } = require("../../../utils/index");
// const { update_user_info, update_user_email, update_user_password } = require("../../joi/v1/user.joi");

router.post("", async (req, res, next) => {
	// create_app;
	try {
		// info 检验参数
		// info 加锁
		// await register.validateAsync(req.body).catch(err => {
		// 	throw new MyError(40001, err);
		// });
		const { name, user_id, desc, color } = req.body;
		const workspace_id = "";
		const redisLock = await redis.set(`createApp#${req.body.user_id}`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			// 加锁失败
			throw new MyError(40004);
		}
		const workspace = await prisma.workspace.findUnique({
			where: {
				id: req.body.workspace_id,
				user_id
			}
		});
		if (!workspace) {
			// await redis.del(`createApp#${req.body.user_id}`);
			throw new MyError(41003);
		}
		// info 创建用户
		await prisma.app.create({
			color,
			name,
			description: desc,
			workspace_id,
			user_id
		});
		// info 删除锁
		await redis.del(`createApp#${req.body.user_id}`);
		const { status, body } = errcode(0);
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
