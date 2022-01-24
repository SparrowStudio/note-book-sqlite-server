/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:09:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 14:00:13
 */

const ERRCODE = {
	0: {
		status: 200,
		body: {
			errcode: "0",
			errmsg: "ok"
		}
	},
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
	},
	50000: {
		status: 500,
		body: {
			errcode: "50000",
			errmsg: "服务端错误"
		}
	}
};

function errcode(code, res = {}) {
	const errRes = ERRCODE[code] || ERRCODE[50000];
	errRes.body = { ...errRes.body, ...res };
	return errRes;
}

module.exports = errcode;
