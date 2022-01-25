/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-25 23:27:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-26 00:33:34
 */
const express = require("express");
const router = express.Router();

// info 数据库单例
const prisma = require("../../db/prisma").init();
const redis = require("../../db/redis").init();

// info 通用方法
const { errcode, MyError } = require("../../../utils/index");
const { create_workspace, update_workspace } = require("../../joi/v1/workspace.joi");
/**
 * 创建
 */
router.post("", async function(req, res, next) {
	try {
		await create_workspace.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});
		const deToken = req.decodeToken;
		const user_id = deToken.id;
		const { name, description } = req.body;
		const redisLock = await redis.set(`${deToken.id}#create_workspace`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			throw new MyError(40003);
		}
		// modified_time
		const workspace = await prisma.workspace.create({
			data: {
				modified_time: new Date(),
				user_id,
				name,
				description
			},
			select: {
				id: true,
				name: true,
				description: true,
				user_id: true,
				modified_time: true,
				create_time: true
			}
		});
		await redis.del(`${deToken.id}#create_workspace`);
		const { status, body } = errcode(0, { ...workspace });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

/**
 * 更新
 */
router.patch("", async function(req, res, next) {
	try {
		await update_workspace.validateAsync(req.body).catch(err => {
			throw new MyError(40001, err);
		});
		const deToken = req.decodeToken;
		const user_id = deToken.id;
		const { name, description, id } = req.body;
		const redisLock = await redis.set(`${deToken.id}#update_workspace#${id}`, true, "Ex", 5, "Nx");
		if (!redisLock) {
			throw new MyError(40003);
		}
		// modified_time
		const workspace = await prisma.workspace.update({
			data: {
				modified_time: new Date(),
				name,
				description
			},
			select: {
				id: true,
				create_time: true,
				modified_time: true,
				name: true,
				description: true
			},
			where: {
				id,
				user_id
			}
		}).catch(async () => {
			await redis.del(`${deToken.id}#update_workspace#${id}`);
			throw new MyError(40001);
		});
		await redis.del(`${deToken.id}#update_workspace#${id}`);
		const { status, body } = errcode(0, { ...workspace });
		res.status(status).send(body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
