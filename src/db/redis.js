/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 22:45:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 22:48:18
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

	static init(options = {}) {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ioredis(options);
		return this.instance;
	}
}
module.exports = Redis;
