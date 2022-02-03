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
        let isNumber = false
        let isHex = false
        let number = 0;
        chars.forEach(ch => {
            if (ch >= '0' && ch <= '9') {
                isNumber = true
                number *= isHex ? 16 : 10 // 0 * 10 = 0
                number += ch | 0 // 0 + digit = digit
            } else if (isHex && ch >= 'A' && ch <= 'F') {
                isNumber = true
                number *= 16
                number += parseInt(ch, 16)
            } else {
                if (isNumber) {
                    push(number)
                    isNumber = false
                    isHex = false
                    number = 0
                }
                switch (ch) {
                    case '#': isHex = true; break
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
                    case '/': {
                        const a = pop()
                        const b = pop()
                        push(b / a)
                    } break
                    case '{': { // shift left
                        push(pop() << 1)
                    } break
                    case '}': { // shift right
                        push(pop() >> 1)
                    } break
                    case '\'': { // drop
                        pop()
                    } break
                    case '$': { // swap
                        const a = pop()
                        const b = pop()
                        push(a)
                        push(b)
                    } break
                    case '%': { // over
                        const a = pop()
                        const b = pop()
                        push(b)
                        push(a)
                        push(b)
                    } break
                    case '~': { // rot a b c - b c a
                        const a = pop() // b c
                        const b = pop() // c
                        const c = pop() // tos
                        push(b) // b
                        push(c) // b c
                        push(a) // b c a
                    } break
                    default: console.log('\'' + ch + '\''); break
                }

            }
        });
        if (isNumber) {
            push(number)
            isNumber = false
            isHex = false
            number = 0
        }
    }

    return Object.freeze({ version, tos, init, push, pop, interpret })
}

// dont forget to comment this out after testing
// ideally delete when the interpreter is complete
const m2 = mint()
const str = '#FF' // 0x10
m2.interpret(str)
console.log('test "' + str + '", ' + m2.pop())
