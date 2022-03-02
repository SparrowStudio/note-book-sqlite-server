/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-24 18:51:23
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 19:36:31
 */
const fs = require("fs");
const { promisify } = require("util");
const ReadFilePromise = promisify(fs.readFile);
const path = require("path");
let config = null;

/**
 * @description 获取.env文件
 * @author bubao
 * @date 2022-01-24 19:01:13
 * @param {boolean} [force=false] 强制刷新
 * @return {*} config
 */
async function ReadDotFile(force = false) {
	if (config && !force) {
		return config;
	}
	const dotData = await ReadFilePromise(path.join(__dirname, "../.env"));
	const item = dotData.toString()
		.split("\n")
		.filter((v, index) => {
			return v.length;
		});
	config = {};
	console.log(item);
	item.forEach((v, i) => {
		const [key, value] = v.split("=")
			.map(v => v.trim()
				.replace(/"|'/g, ""));
		config[key] = value;
	});
	console.log("config", config);
	return config;
}

module.exports = ReadDotFile;
