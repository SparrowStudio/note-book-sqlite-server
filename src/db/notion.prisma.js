/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 22:45:28
 * @LastEditors: bubao
 * @LastEditTime: 2022-02-23 18:15:37
 */
// eslint-disable-next-line node/no-unpublished-require
const { PrismaClient } = require("../../.prisma/generated/notion");

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
		this.instance = new PrismaClient({
			log: [
				{
					emit: "event",
					level: "query"
				},
				{
					emit: "stdout",
					level: "error"
				},
				{
					emit: "stdout",
					level: "info"
				},
				{
					emit: "stdout",
					level: "warn"
				}
			]
		});

		this.instance.$on("query", e => {
			if (!(process.env.NODE_ENV === "production")) {
				console.log("Query: " + e.query);
				console.log("Duration: " + e.duration + "ms");
			}
		});
		return this.instance;
	}
}
module.exports = Prisma;
