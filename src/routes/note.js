/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 13:40:09
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-13 17:47:14
 */
const express = require("express");
const router = express.Router();
const SqliteDB = require("../../db/index");
const { cherry } = require("../../utils");

/**
 * 获取笔记列表
 */
router.get("/", async function(req, res) {
	const { limit = 10, offset = 0, id } = req.query;
	try {
		const db = await SqliteDB.init();

		if (id === undefined && (isNaN(limit) || isNaN(offset))) {
			res.status(400).json({ error: "error" });
			return;
		}
		if (id !== undefined && isNaN(id)) {
			res.status(400).json({ error: "error" });
			return;
		}
		let result;

		if (id !== undefined) {
			result = await db.get(`SELECT * FROM note WHERE id=${id} AND del_token = 0;`);
			res.json({ id: req.query.id, data: result || {} });
		} else {
			const query = `SELECT * FROM note WHERE del_token = 0 LIMIT ${limit} OFFSET ${offset};`;
			result = await db.all(query);
			const total = "SELECT COUNT(*) FROM note WHERE del_token = 0";
			res.json({ id: req.query.id, total, data: result || {} });
		}
	} catch (error) {
		res.json(req.query);
	}
});

/**
 * 删除文章，加入到垃圾桶
 */
router.delete("/", async function(req, res) {
	const { id } = req.query;
	if (isNaN(id - 0)) {
		res.status(400).json({ error: "xxx" });
		return;
	}
	const query = `UPADATE note SET del_token = 1 WHERE id = ${id} AND del_token = 0`;
	try {
		const db = await SqliteDB.init();
		const result = await db.run(query);
		console.log(result);
		res.json({ code: 0 });
	} catch (error) {
		res.status(400).json({ error: "xxx" });
	}
});

/**
 * 更新文章
 */
router.put("/", async function(req, res) {
	const { title, content, id } = req.body || {};
	if (isNaN(id - 0)) {
		res.json({ error: "xxx" });
		return;
	}
	try {
		const db = await SqliteDB.init();
		const result = await db.run("UPADATE note SET title = ? content = ? update_at = ? WHERE id = ?", [title, content, new Date().valueOf(), id]);
		console.log(result);
	} catch (err) {
		res.status(400).json({ error: "xxx" });
	}
});

/**
 * 新增文章
 */
router.post("/", async function(req, res) {
	const { title, content } = req.body || {};
	if (!title || !content) {
		res.json({ error: "xxx" });
		return;
	}
	try {
		const db = await SqliteDB.init();
		const id = cherry.id();
		const time = new Date().valueOf();
		await db.run("INSERT INTO note (id,title,content,created_at,updated_at) VALUES (?,?,?,?,?)", [id, title, content, time, time]);
		console.log("insert ", id);
		res.json({ id, ...req.body });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "xxx" });
	}
});

module.exports = router;
