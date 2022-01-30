'strict'

// const mint = () => { console.log('A Javascript implementation of MINT') }
// const version = 'MINT Version 1.0.0 Build(20220129)'

// const stack = new Array(8192)
// let tos = 0

Mint = function () {
    this._version = 'MINT Version 1.0.0 Build(20220129)'
    this._stack = new Array(8192)
    this._tos = 0
}

Mint.prototype.version = function () {
    return this._version // 'MINT Version 1.0.0 Build(20220129)'
}

Mint.prototype.interpret = function (exp) {
    return 1
}

Mint.prototype.tos = function () {
    return this._tos
}


Mint.prototype.push = function (val) {
    this._stack[_tos] = val
    this._tos += 1
    if (this._tos > this._stack.length) { console.error('stack overun.') }
}

Mint.prototype.pop = function () {
    this._tos -= 1
    if (this._tos < 0) { console.error('stack underun.') }
    let val = this._stack[_tos]
    return val
}

Mint.prototype.init = function () {
    _tos = 0
}
