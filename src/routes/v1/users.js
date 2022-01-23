/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 16:18:12
 */

const express = require("express");
const Prisma = require("@prisma/client");

const prisma = new Prisma.PrismaClient();
const router = express.Router();
const { login } = require("../../joi/users.joi");

const { errcode, md5Slat } = require("../../../utils/index");
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
	const users = await prisma.users.findFirst({
		where: {
			email, password: md5Slat(password)
		}
	});
	// info 账号或者密码错误
	if (!users) {
		const { status, body } = errcode(41000);
		res.status(status).send(body);
		return;
	}
	// TODO 生成 token
	res.send(users);
});

router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
