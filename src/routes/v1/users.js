/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 11:37:54
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 15:31:30
 */

const express = require("express");
const router = express.Router();
const { login } = require("../../joi/users.joi");

const { errcode } = require("../../../utils/index");
/**
 * 登录
 */
router.post("/", async function(req, res) {
	// console.log(req.body);
	try {
		await login.validateAsync(req.body);
		// console.log(value);
	} catch (err) {
		console.log(err);
		const { body, status } = errcode("40001", err);
		res.status(status).send(body);
		return;
	}
	res.send("respond with a resource");
});

router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
