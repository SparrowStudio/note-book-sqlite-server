/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 16:59:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 13:53:33
 */
const jwt = require("jsonwebtoken");
const Redis = require("../src/db/redis");
function generateToken(paylod, expiresIn = 60 * 60 * 2) {
	return jwt.sign(paylod, "token", {
		expiresIn
	});
}
/**
 * @description 验证token
 * @author bubao
 * @date 2022-01-24 13:01:06
 * @param {*} token
 * @param {number} [type=1] 1: accessToken 2:refreshToken
 */
async function verifyToken(token, type = 1) {
	let res;
	try {
		res = jwt.verify(token, "token");
	} catch (error) {
		// info token超时或者无效token
		throw new Error(40003);
	}
	const redis = Redis.init();
	const redisToken = await redis.get(`${JSON.parse(res).id}#${type === 1 ? "access_token" : "refresh_token"}`);
	if (redisToken !== token) {
		// info 用户重新登录，旧token失效
		throw new Error(40003);
	}
	return JSON.parse(res);
}

module.exports = { generateToken, verifyToken };
