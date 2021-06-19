const express = require("express");
const router = express.Router();
const SqliteDB = require("../db/index");
// const util = require("util");

/**
 * 获取笔记列表
 */
router.get("/", async function(req, res, next) {
	const { limit = 10, offset = 0, id } = req.query;
	console.log("xxx");
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
			result = await db.get(`SELECT * FROM note WHERE id=${id};`);
		} else {
			const query = `SELECT * FROM note LIMIT ${limit} OFFSET ${offset}`;
			result = await db.all(query);
		}
		res.json({ id: req.query.id, data: result || {} });
		console.log(result);
	} catch (error) {
		res.json(req.query);
	}
});

router.post("/", async function(req, res) {
	const { title, content } = req.body || {};
	if (!title || !content) {
		res.json({ error: "xxx" });
		return;
	}
	try {
		const db = await SqliteDB.init();
		console.log("content", content);
		const result = await db.run("INSERT INTO note (title,content,created_at,updated_at) VALUES (?,?,?,?)", [title, content, new Date().valueOf(), new Date().valueOf()]);
		console.log("db", result);
		res.json(req.body);
	} catch (error) {
		res.status(400).json({ error: "xxx" });
	}
});

module.exports = router;
