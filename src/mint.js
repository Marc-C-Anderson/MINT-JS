'strict'

function mint() {
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


    const interpret = (str) => {
        const chars = str.split('')
        let result = 0
        chars.forEach(element => {
            switch (element) {
                case '1': push(element|0); break
                case '2': push(element|0); break
                case '3': push(element|0); break
                case '4': push(element|0); break
                case '<': {
                    const a = pop()
                    const b = pop()
                    const c = a - b
                    result = c > 0 ? 1 : 0
                } break
                case '>': {
                    const a = pop()
                    const b = pop()
                    const c = a - b
                    result = c < 0 ? 1 : 0
                } break
                case '=': {
                    const a = pop()
                    const b = pop()
                    const c = a - b
                    result = c == 0 ? 1 : 0
                } break
                case '+': {
                    const a = pop()
                    const b = pop()
                    //const c = a - b
                    result = a + b
                } break

                default: break
            }
        });
        return result
    }
    return Object.freeze({ version, tos, init, push, pop, interpret })
}

const m = mint()
const str = '1 2+'
const r = m.interpret(str)
console.log(str, r)
