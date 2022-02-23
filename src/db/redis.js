/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 22:45:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-23 18:13:49
 */
const ioredis = require("ioredis");
class Redis {
	constructor(options) {
		if (this.instance) {
			return this.instance;
		}
		this.instance = Redis.init(options);
		return this.instance;
	}

	static init(options = { host: "192.168.1.11" }) {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ioredis(options);
		return this.instance;
	}
}
module.exports = Redis;
