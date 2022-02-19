/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 22:45:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-20 03:23:46
 */
// eslint-disable-next-line node/no-unpublished-require
const { PrismaClient } = require("../../node_modules/.prisma/generated/notion");

class Prisma {
	constructor() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = Prisma.init();
		return this.instance;
	}

	static init() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new PrismaClient();
		return this.instance;
	}
}
module.exports = Prisma;
