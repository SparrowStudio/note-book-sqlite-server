/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 13:38:02
 */
const express = require("express");
const router = express.Router();
const SqliteDB = require("../../db/index");

/**
 * 获取回收栏中的数据
 */
router.get("/", async (req, res) => {
	const { limit = 10, offset = 0 } = req.query;
	if (isNaN(limit) || isNaN(offset)) {
		return res.json({ error: "xxx" });
	}
	try {
		const db = await SqliteDB.init();
		const [result, { total }] = await Promise.all([db.all(`SELECT * FROM note WHERE del_token = 1 LIMIT ${limit} OFFSET ${offset}`), db.get("SELECT COUNT(*) AS total FROM note WHERE del_token = 1")]);
		res.json({ total, data: result });
	} catch (error) {
		res.json({ error: "xxx" });
	}
});

/**
 * 从回收栏取回文件
 */
router.put("/", async (req, res) => {
	const { id } = req.query;
	if (isNaN(id)) {
		return res.json({ error: "xxx" });
	}
	try {
		const db = await SqliteDB.init();
		await db.run(`UPDATE note SET del_token = 0 WHERE id = ${id}`);
		res.json({ code: 0 });
	} catch (error) {
		res.json({ error: "xxx" });
	}
});

/**
 * 从回收栏取回文件
 */
router.delete("/", async (req, res) => {
	const { id } = req.query;
	if (isNaN(id) || id === undefined) {
		return res.json({ error: "xxx" });
	}
	try {
		const db = await SqliteDB.init();
		await db.run(`DELETE note WHERE del_token = 1${id ? ` WHERE id = ${id}` : ""}`);
		res.json({ code: 0 });
	} catch (error) {
		res.json({ error: "xxx" });
	}
});

module.exports = router;
