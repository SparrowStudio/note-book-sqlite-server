/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 13:42:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 13:51:15
 */
const Path2Regexp = require("path-to-regexp");
const { errcode, verifyToken } = require("../../utils/index");

function AuthenticationMiddleWare(pathObj = { }) {
	const includes = pathObj.includes;
	const excludes = pathObj.excludes;
	const [pathIncludesMap, pathExcludesMap] = [
		{ GET: {}, POST: {}, PUT: {}, DELETE: {}, OPTIONS: {} },
		{ GET: {}, POST: {}, PUT: {}, DELETE: {}, OPTIONS: {} }
	];
	Array.isArray(includes)
		? includes.forEach(item => {
			const { method, path } = item;
			pathIncludesMap[method][Path2Regexp.pathToRegexp(path)] = Path2Regexp.pathToRegexp(path);
		})
		: excludes &&
			excludes.forEach(item => {
				const { method, path } = item;
				pathExcludesMap[method][Path2Regexp.pathToRegexp(path)] = Path2Regexp.pathToRegexp(path);
			})
	;
	const f = (req, res, next) => {
		// 如果excludes为空
		let needAuth = true;
		if (!pathExcludesMap && !pathIncludesMap) {
			needAuth = true;
		} else if (pathExcludesMap) {
			const pathList = pathExcludesMap[req.method];
			for (const element in pathList) {
				if (pathList[element].test(req.url)) {
					needAuth = false;
					break;
				}
			}
		} else {
			needAuth = false;
			const pathList = pathIncludesMap[req.method];
			for (const element in pathList) {
				if (element.test(req.url)) {
					needAuth = true;
					break;
				}
			}
		}
		if (needAuth) {
			const Authorization = req.headers.authorization;
			if (Authorization) {
				const token = Authorization.replace(/^Bearer /, "");
				try {
					const decodeToken = verifyToken(token);
					req.decodeToken = decodeToken;
					next();
				} catch (error) {
					const { status, body } = errcode(40003);
					res.status(status);
					res.send(body);
				}
			} else {
				const { status, body } = errcode(40002);
				res.status(status);
				res.send(body);
			}
		} else {
			next();
		}
	};
	return f;
}

module.exports = AuthenticationMiddleWare;
