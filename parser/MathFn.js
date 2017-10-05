class MathFn {
    constructor(fName, postArgs, preArgs, fn) {
        this.name = fName;
        this.postArgs = postArgs;
        this.preArgs = preArgs;
        this.fn = fn;
    }
    exec() {
        this.fn(...arguments);
    }
}