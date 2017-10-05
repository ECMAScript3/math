class MathSet {
    constructor() {
        this.array = [];
        this.silent = false;
        if (arguments.length != 0) {
            var arr = Array.prototype.slice.call(arguments);
            this.array = arr.reduce((i, val) => {
                if (!Array.isArray(val)) val = [val];
                if (!Array.isArray(i)) i = [i];
                return i.concat(val);
            }) || [];
        }
        //alt fn defs
        this.summate = this.sum;
        this.product = this.prod;
    }
    get array() {
        return this.arr;
    }
    set array(val) {
        this.arr = val;
        this.isNumeric = true;
        this.arr.forEach(((val) => {
            if (typeof val != "number") this.isNumeric = false;
        }).bind(this));
    }
    get sum() {
        if (this.isNumeric) {
            return this.array.reduce((i, val) => {
                return i + val;
            }) || 0;
        } else return this.err("Cannot sum non-numerical data!!");
    }
    get prod() {
        if (this.isNumeric) {
            return this.array.reduce((i, val) => {
                return i * val || 0;
            }) || 0;
        } else return this.err("Cannot multiply non-numerical data!!");
    }
    sort(fn) {
        if (fn) {
            return this.array.sort(fn);
        } else {
            return this.array.sort((a, b) =>{
                return a - b;
            });
        }
    }
    sorted(fn) {
        let arr = this.array;
        if (fn) {
            return arr.sort(fn);
        } else {
            return arr.sort((a, b) =>{
                return a - b;
            });
        }
        return arr;
    }
    err(errString) {
        if (!this.silent) {
            throw new Error(errString);
        } else return NaN;
    }
}
module.exports = MathSet;