/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 16:59:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 13:47:30
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
		throw new Error(42000);
	}
	const redis = Redis.init();
	const redisToken = await redis.get(`${JSON.parse(res).id}#${type === 1 ? "access_token" : "refresh_token"}`);
	if (redisToken !== token) {
		throw new Error(42001);
	}
	return JSON.parse(res);
}

module.exports = { generateToken, verifyToken };
