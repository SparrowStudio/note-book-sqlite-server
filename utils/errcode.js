/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:09:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 13:08:13
 */

const ERRCODE = {
	40001: {
		status: 400,
		body: {
			errcode: "40001",
			errmsg: "参数错误"
		}
	}
};

function errcode(code, res = {}) {
	const errRes = ERRCODE[code];
	errRes.body = { ...errRes.body, ...res };
	return errRes;
}

module.exports = errcode;
