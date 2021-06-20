const express = require("express");
const router = express.Router();
const SqliteDB = require("../db/index");
const { cherry } = require("../utils");
const Joi = require("joi");

/**
 * 获取tags类型详情
 */
router.get("/type", async (req, res) => {
	try {
		const db = await SqliteDB.init();
		const list = await db.all("SELECT name, color, background, description, created_at, updated_at FROM tags_type");
		const result = {};
		list.forEach(value => {
			const { name, ...other } = value;
			result[name] = other;
		});
		res.json({ data: result });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 新增 tags
 */
router.post("/type", async (req, res) => {
	try {
		const { name, color, background, description } = req.body;
		const db = await SqliteDB.init();
		const time = new Date().valueOf();
		const list = await db.run("INSERT INTO tags_type (name, color, background, description, created_at, updated_at) VALUES (?,?,?,?,?,?)", [name, color, background, description, time, time]);
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 新增 tags
 */
router.put("/type", async (req, res) => {
	try {
		const { name, color, background, description } = req.body;
		const db = await SqliteDB.init();
		const time = new Date().valueOf();
		const list = await db.run("INSERT INTO tags_type (name, color, background, description, updated_at) VALUES (?,?,?,?,?,?)", [name, color, background, description, time, time]);
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 删除tags类型，并清除已存在的该tag的文章标记
 */
router.delete("/type", async (req, res) => {
	try {
		const { name } = req.body;
		const db = await SqliteDB.init();
		const query = tb => `DELETE FROM ${tb} WHERE name = ${name}`;
		const tagsType = db.run(query("tags_type"));
		const tags = db.run(query("tags"));
		await Promise.all([tagsType, tags]);
		res.json({ code: 0 });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});

/**
 * 获取tags个数
 */
router.get("/", async (req, res) => {
	try {
		const db = await SqliteDB.init();
		const list = await db.all("SELECT name, COUNT(name) AS tatol FROM tags GROUP BY name");
		res.json({ data: list });
	} catch (error) {
		console.log(error);
		res.json({ error: "xxx" });
	}
});
/**
 * 文章新增tags
 */
router.post("/", async (req, res) => {
	try {
		const db = await SqliteDB.init();
		const time = new Date().valueOf();
		const validate = await Joi.object({
			name: Joi.string().alphanum().min(1).required(),
			note_id: Joi.number().required()
		}).validateAsync(req.body).catch(error => {
			return { error };
		});
		if (validate.error) {
			return res.status.json(validate.error);
		}
		const [{ name }, { note_id }] = await Promise.all([
			db.get(`SELECT name FROM tags_type WHERE name = ${req.body.name}`),
			db.get(`SELECT id AS note_id FROM note WHERE name = ${req.body.note_id}`)
		]);
		if (name === undefined || note_id === undefined) {
			return res.json({ error: "xxx" });
		}
		const id = cherry.id();
		db.run("INSERT INTO tags SET (id,name,note_id,created_at,updated_at) VALUES (?,?,?,?,?)", [id, name, note_id, time, time]);
	} catch (error) {
		res.json({ error: "xxx" });
	}
});

module.exports = router;
