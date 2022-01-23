/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:09:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 16:00:02
 */

const ERRCODE = {
	40001: {
		status: 400,
		body: {
			errcode: "40001",
			errmsg: "参数错误"
		}
	},
	40002: {
		status: 400,
		body: {
			errcode: "40002",
			errmsg: "无权访问"
		}
	},
	40003: {
		status: 400,
		body: {
			errcode: "40003",
			errmsg: "无效token"
		}
	},
	41000: {
		status: 400,
		body: {
			errcode: "41000",
			errmsg: "邮箱或者密码错误"
		}
	}
};

function errcode(code, res = {}) {
	const errRes = ERRCODE[code];
	errRes.body = { ...errRes.body, ...res };
	return errRes;
}

module.exports = errcode;
