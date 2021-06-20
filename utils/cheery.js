const CherryId = require("cherry-id");

// /**
//  * 使用cherry-id生成唯一id
//  * @returns {number} id
//  */
// function genid() {
// 	return cherry.NextId();
// }

class GenId {
	constructor(props = {}) {
		if (this.instance) {
			return this.instance;
		}
		return GenId.init(props);
	}

	static init(props) {
		if (this.instance) {
			return this.instance;
		}
		if (isNaN(props.WorkerId)) {
			props.WorkerId = 1;
		}
		this.instance = new CherryId(props);
		return this.instance;
	}
}

module.exports = GenId;
