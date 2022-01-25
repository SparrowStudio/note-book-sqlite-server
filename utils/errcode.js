/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:09:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 10:20:27
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
	41001: {
		status: 400,
		body: {
			errcode: "41001",
			errmsg: "用户不存在"
		}
	},
	41002: {
		status: 400,
		body: {
			errcode: "41002",
			errmsg: "验证码错误"
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
	return {
		...(ERRCODE[code] || ERRCODE[50000]),
		body: {
			...(ERRCODE[code] || ERRCODE[50000]).body, ...res
		}
	};
}

module.exports = errcode;
