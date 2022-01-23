/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 13:12:52
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 17:28:20
 */
const ioredis = require("ioredis");
// eslint-disable-next-line no-unused-vars
const { RedisOptions, Redis } = require("ioredis");
/** @type {Redis} */
let client;

/**
 * @description
 * @author bubao
 * @date 2022-01-23 13:01:02
 * @param {RedisOptions} options
 * @param {String} name
 */
function redis(options, name = "redis") {
	client = new ioredis(options);
	const f = (req, res, next) => {
		if (client.connect) {
			req[name] = client;
			next();
		} else {
			client.on("ready", () => {
				req[name] = client;
				next();
			});
		}
	};
	f.client = client;
	f.disconnect = next => {
		if (client) {
			client.once("end", () => {
				client = null;
				next();
			});
			client.quit();
		} else {
			next();
		}
	};
	return f;
}

module.exports = redis;
