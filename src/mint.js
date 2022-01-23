'strict'

const mint = () => { console.log('A Javascript implementation of MINT') }

const interpret = (exp) => { return 1 }

const stack = new Array(8192)

let tos = 0

const push = (val) => {
    stack[tos] = val
    tos += 1
    if (tos > stack.length) { console.error('stack overun.') }
}

const pop = () => {
    tos -= 1
    if (tos < 0) { console.error('stack underun.') }
    let val = stack[tos]
    return val
}

const init = () => {
    tos = 0
}
