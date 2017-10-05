const MathSet = require("./MathSet.js");
class DataSet extends MathSet {
	constructor() {
		super(...arguments);
		this.array.sort
	}
	get stats() {
		this.array.sort();
		return {
			q1: this.q1,
			median: this.median,
			q3: this.q3,
			IQR: this.iqr,
			mode: this.mode,
			mean: this.mean,
			stdDev: this.stdDev,
			zScoreList: this.zsl 
		}
	}
	get q1() {
		return (this.array[Math.floor(1/4 * this.array.length + 0.5) - (this.array.length % 2 ? 1 : 2)] + this.array[Math.ceil(1/4 * this.array.length + 0.5) - (this.array.length % 2 ? 1 : 2)]) / 2;
	}
	get median() {
		return (this.array[Math.floor(1/2 * this.array.length) - 1] + this.array[Math.ceil(1/2 * this.array.length) - 1]) / 2;
	}
	get q3() {
		return (this.array[Math.floor(3/4 * this.array.length + 0.5) - (this.array.length % 2 ? 0 : 1)] + this.array[Math.ceil(3/4 * this.array.length + 0.5) - (this.array.length % 2 ? 0 : 1)]) / 2;
	}
	get iqr() {
		return this.q3 - this.q1;
	}
	get mean() {
		return this.sum / this.array.length;
	}
	get mode() {
		if (this.array.length == 0) return null;
		let modeMap = {},
			maxCount = 1, 
			modes = [];
		for(let i = 0; i < this.array.length; i++) {
			let el = this.array[i];
			if (modeMap[el] == null) {
				modeMap[el] = 1;
			} else {
				modeMap[el]++;
			}
			if (modeMap[el] > maxCount) {
				modes = [el];
				maxCount = modeMap[el];
			}
			else if (modeMap[el] == maxCount) {
				modes.push(el);
				maxCount = modeMap[el];
			}
		}
		return modes;
	}
	get stdDev() {
		let mean = this.mean;
		if (this.isNumeric) {
			let sds = 0;
			this.array.forEach((val) => {
				sds += (val - mean) ^ 2;
			})
            return Math.sqrt(sds / this.array.length);
        } else return this.err("Cannot sum non-numerical data!!");
	}
	zScore(val, mean, stdDev) {
		let mn = mean || this.mean;
		let sd = stdDev || this.stdDev;
		return (val - mn)/sd;
	}
	get zsl() {
		let list = [];
		let mean = this.mean;
		let stdDev = this.stdDev;
		this.array.forEach(((val) => {
			list.push(this.zScore(val, mean, stdDev));
		}).bind(this));
		return list;
	}
	get range() {
		return this.array[this.array.length - 1] - this.array[0]
	}
}
module.exports = DataSet;
