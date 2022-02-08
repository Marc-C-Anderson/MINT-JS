'strict'

/****************************************\
 * MINT Version 1.0                      *
 * A black box javascript implementation *
 \***************************************/

const mintVersion = () => { return 'MINT Version 1.0.0 Build(20220207)' }
const mintSignon = () => { return 'MINT 1.0 >' }

let mintTos = 0
const mintStack = new Array(8192)

const mintPush = (val) => {
    mintStack[mintTos] = val
    mintTos += 1
    if (mintTos > mintStack.length) { console.error('stack overflow') }
}

let isNumber = false
let number = 0
let isHex = false

const doNumber = (ch) => { isNumber = true; number *= isHex ? 0x10 : 10; number += ch | 0 }

const endNumber = () => { if (isNumber) { mintPush(number); number = 0; isNumber = false } if (isHex) isHex = false }

const doDefault = (ch) => { endNumber(); console.log('default \'' + ch + '\'') }

const doHash = () => { endNumber(); isHex = true }

/**
 * For now, this is for hexadecimal numbers.
 * If the hex flag is set, treat 'A' - 'F' as hexadecimal numbers
 * @param {*} ch The current character
 */
const doFunction = (ch) => { if (isHex) { doNumber(parseInt(ch, 16)) } }

/**
 * pop the 2 values off the top of the stack, check for equality, push the result onto the stack.
 */
const doEquals = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b === a ? 1 : 0) }

/**
 * pop the 2 values off the top of the stack, check if the first is less than the second, push the result onto the stack.
 */
const doLessThan = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b < a ? 1 : 0) }

/**
* pop the 2 values off the top of the stack, check if the first is greater than the second, push the result onto the stack.
*/
const doGreaterThan = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b > a ? 1 : 0) }

/**
* pop the 2 values off the top of the stack and add them, push the result onto the stack.
*/
const doAdd = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b + a) }

/**
* pop the 2 values off the top of the stack and subtract them, push the result onto the stack.
*/
const doSubtract = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b - a) }

/**
* pop the value off the top of the stack, negate it and push the result onto the stack.
*/
const doNegate = () => { endNumber(); const a = mintPop(); mintPush(0 - a) }

/**
* pop the 2 values off the top of the stack, and them, push the result onto the stack.
*/
const doAnd = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b & a) }

/**
* pop the 2 values off the top of the stack, or them, push the result onto the stack.
*/
const doOr = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b | a) }

/**
* pop the value off the top of the stack, shift it left and push the result onto the stack.
*/
const doShiftLeft = () => { endNumber(); const a = mintPop(); mintPush(a << 1) }

/**
* pop the value off the top of the stack, shift it right and push the result onto the stack.
*/
const doShiftRight = () => { endNumber(); const a = mintPop(); mintPush(a >> 1) }

/**
* drop the value off the top of the stack and throw it away.
*/
const doDrop = () => { endNumber(); mintPop() }

/**
* pop the 2 values off the top of the stack, or them, push the result onto the stack.
*/
const doMultiply = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b * a) }

/**
* pop the value off the top of the stack push it twice.
*/
const doDup = () => { endNumber(); const a = mintPop(); mintPush(a); mintPush(a) }

/**
* pop the 2 values off the top of the stack, divide them, push the result onto the stack.
* TODO This needs checking.
*/
const doDivide = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b / a); mintPush(b % a) }

/**
* swap the top 2 values on the top of the stack.
*/
const doSwap = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(a); mintPush(b) }

/**
* copy the 2nd item over the top of the stack.
*/
const doOver = () => { endNumber(); const a = mintPop(); const b = mintPop(); mintPush(b); mintPush(a); mintPush(b) }

/**
* rotate the top 3 items on the top of the stack.
*/
const doRot = () => { endNumber(); const a = mintPop(); const b = mintPop(); const c = mintPop(); mintPush(b); mintPush(c); mintPush(a) }

/**
 * Calculate the address of the variable and place it on the stack.
 * @param {*} ch The variable name
 * TODO calculate the address
 */
const doVariable = (ch) => { endNumber(); const addr = 0; mintPush(addr) }

const mintRegister = []

/**
 * pop the address of the variable and the value off the stack and store it in the variable.
 */
const doStore = (ch) => { endNumber(); const addr = mintPop(); const val = mintPop(); mintRegister[addr] = val }

/**
 * pop the address of the variable off the stack, fetch the value from the register and push it onto the stack.
 */
const doFetch = (ch) => { endNumber(); const addr = mintPop(); mintPush(mintRegister[addr]) }

const mintInterpret = (ch) => {
    switch (ch) {
        case ' ': endNumber(); break
        case '!': doStore(); break
        case '"': doDup(); break
        case '#': doHash(); break
        case '$': doSwap(); break
        case '%': doOver(); break
        case '&': doAnd(); break
        case '*': doMultiply(); break
        case '+': doAdd(); break
        case '\'': doDrop(); break
        case '-': doSubtract(); break
        case '/': doDivide(); break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': doNumber(ch); break
        case '<': doLessThan(); break
        case '=': doEquals(); break
        case '>': doGreaterThan(); break
        case '@': doFetch(); break
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F': doFunction(ch); break
        case '_': doNegate(); break
        case 'a': case 'x': doVariable(ch); break
        case '{': doShiftLeft(); break
        case '|': doOr(); break
        case '}': doShiftRight(); break
        case '~': doRot(); break
        default: doDefault(ch); break
    }
}

const mintInterpreter = (str) => {
    const chars = str.split('')
    chars.forEach(ch => {
        mintInterpret(ch)
    })
    if (mintTos === 0) { endNumber() }
}

const mintPop = () => {
    mintTos -= 1
    if (mintTos < 0) { console.error('stack underun.') }
    return mintStack[mintTos]
}

/**
 * A testbed function to debug features as they are added.
 * @param {*} str The expression to test
 * @param {*} expects The expected result
 */
const mintTest = (str, expects) => {
    mintInterpreter(str)
    const result = mintPop()
    if (expects === result) {
        console.log('test success ' + str + ' expects ' + expects + ' got ' + result)
    } else {
        console.error('test failed ' + str + ' expects ' + expects + ' got ' + result)
    }
    console.log('tos = ' + mintTos)
}

mintTest('2a!a@', 2)
mintTest('3x! 1 x@+x! x@', 4)
mintTest('3x! 1_ x@+x! x@', 2)
