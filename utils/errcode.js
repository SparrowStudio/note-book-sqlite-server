/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:09:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-22 13:08:30
 */

const ERRCODE = {
	0: {
		status: 200,
		body: {
			errcode: "0",
			errmsg: "ok"
		}
	},
	404: {
		status: 404,
		body: {
			errcode: "404",
			errmsg: "404"
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
	40004: {
		status: 400,
		body: {
			errcode: "40004",
			errmsg: "请求太频繁，请稍后重试"
		}
	},
	40005: {
		status: 400,
		body: {
			errcode: "40005",
			errmsg: "workspace更新失败，请稍后重试"
		}
	},
	40006: {
		status: 400,
		body: {
			errcode: "40006",
			errmsg: "workspace不存在"
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
	41003: {
		status: 400,
		body: {
			errcode: "41003",
			errmsg: "邮箱已被注册"
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
