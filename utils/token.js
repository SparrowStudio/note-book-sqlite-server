/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 16:59:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 19:43:44
 */
const jwt = require("jsonwebtoken");
const Redis = require("../src/db/redis");
const dotFile = require("./dotFile");
async function generateToken(paylod, expiresIn = 60 * 60 * 2) {
	const { JWT_TOKEN } = await dotFile();
	return jwt.sign(paylod, JWT_TOKEN, {
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
		const { JWT_TOKEN } = await dotFile();
		res = jwt.verify(token, JWT_TOKEN);
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
