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
        chars.forEach(element => {
            switch (element) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': push(element | 0); break
                case '<': {
                    const a = pop()
                    const b = pop()
                    push(b - a < 0 ? 1 : 0)
                } break
                case '>': {
                    const a = pop()
                    const b = pop()
                    push(b - a > 0 ? 1 : 0)
                } break
                case '=': {
                    const a = pop()
                    const b = pop()
                    push(b - a == 0 ? 1 : 0)
                } break
                case '+': {
                    const a = pop()
                    const b = pop()
                    push(b + a)
                } break
                case '-': {
                    const a = pop()
                    const b = pop()
                    push(b - a)
                } break
                case '_': { // unary negate
                    push(0 - pop())
                } break
                case '&': {
                    const a = pop()
                    const b = pop()
                    push(b & a)
                } break
                case '|': {
                    const a = pop()
                    const b = pop()
                    push(b | a)
                } break
                case '*': {
                    const a = pop()
                    const b = pop()
                    push(b * a)
                } break
                case '{': { // increment
                    push(pop() + 1)
                } break
                case '}': { // decrement
                    push(pop() - 1)
                } break
                case '\'': { // drop
                    pop()
                } break
                default: console.log('default \'' + element + '\''); break
            }
        });
    }
    return Object.freeze({ version, tos, init, push, pop, interpret })
}

// const m = mint()
// const str = '1 2+'
// const r = m.interpret(str)
// console.log(str, r)
