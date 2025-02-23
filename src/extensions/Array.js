/**
 * Faster than .forEach
 * @param {(function())} fn The function to call
 */
Array.prototype.each = function (fn) {
	const l = this.length

	for(let i = 0; i < l; i++) {
		const e = this[i]

		if (e) {
			fn(e,i)
		}
	}
}

/**
 * Give NodeList some Array functions
 * 给NodeList添加一些Array的方法
 */
NodeList.prototype.each = Array.prototype.each
NodeList.prototype.filter = Array.prototype.filter
