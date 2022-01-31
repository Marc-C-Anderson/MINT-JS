'strict'

function mint2() {
    const _stack = new Array(8192)
    let _tos = 0
    const version = () => { return 'MINT Version 1.0.0 Build(20220201)' }
    const tos = () => { return _tos }
    const init = () => { _tos = 0 }
    const push = (val) => {
        _stack[_tos] = val
        _tos += 1
        if (_tos > _stack.length) { console.error('stack overflow') }
    }
    const pop = () => {
        _tos -= 1
        if (_tos < 0) { console.error('stack underun.') }
        let val = _stack[_tos]
        return val
    }
    const interpret = () => 1
    return Object.freeze({ version, tos, init, push, pop, interpret })
}

