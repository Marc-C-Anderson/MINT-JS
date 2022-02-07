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
 
 const doNumber = (ch) => { isNumber = true; number *= isHex ? 0x10 : 10; number += ch | 0 }
 
 const endNumber = () => { if (isNumber) { mintPush(number); number = 0; isNumber = false } if (isHex) isHex = false; }
 
 const doDefault = (ch) => {
     endNumber()
     console.log('default \'' + ch + '\'');
 }
 
 const doHash = () => { isHex = true }
 
 const mintInterpret = (ch) => {
     switch (ch) {
         case '#': doHash(); break
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
         default: doDefault(ch); break
     }
 }
 
 const mintInterpreter = (str) => {
     const chars = str.split('')
     chars.forEach(ch => {
         mintInterpret(ch)
     });
     if (mintTos == 0) { endNumber() }
 }
 
 const mintPop = () => {
     mintTos -= 1
     if (mintTos < 0) { console.error('stack underun.') }
     let val = mintStack[mintTos]
     return val
 }
 
 /**
  * A testbed function to debug features as they are added.
  * @param {*} str The expression to test
  * @param {*} expects The expected result
  */
 const mintTest = (str, expects) => {
     mintInterpreter(str)
     const result = mintPop()
     if (expects == result) {
         console.log('test success ' + str + ' expects ' + expects + ' got ' + result)
     } else {
         console.error('test failed ' + str + ' expects ' + expects + ' got ' + result)
     }
 }
 
 mintTest('#10', 0x10)
 
// function mint() {
//     const _stack = new Array(8192)
//     let _tos = 0
//     const version = () => { return 'MINT Version 1.0.0 Build(20220207)' }
//     const tos = () => { return _tos }
//     const init = () => { _tos = 0 }
//     const push = (val) => {
//         _stack[_tos] = val
//         _tos += 1
//         if (_tos > _stack.length) { console.error('stack overflow') }
//     }
//     const pop = () => {
//         _tos -= 1
//         if (_tos < 0) { console.error('stack underun.') }
//         let val = _stack[_tos]
//         return val
//     }

//     const interpret = (str) => {
//         const chars = str.split('')
//         let isNumber = false
//         let isHex = false
//         let number = 0;
//         chars.forEach(ch => {
//             if (ch >= '0' && ch <= '9') {
//                 isNumber = true
//                 number *= isHex ? 16 : 10 // 0 * 10 = 0
//                 number += ch | 0 // 0 + digit = digit
//             } else if (isHex && ch >= 'A' && ch <= 'F') {
//                 isNumber = true
//                 number *= 16
//                 number += parseInt(ch, 16)
//             } else if (ch >= 'a' && ch <= 'z') { // registers
//                 push(ch)
//             } else {
//                 if (isNumber) {
//                     push(number)
//                     isNumber = false
//                     isHex = false
//                     number = 0
//                 }
//                 switch (ch) {
//                     case '#': isHex = true; break
//                     case '<': {
//                         const a = pop()
//                         const b = pop()
//                         push(b - a < 0 ? 1 : 0)
//                     } break
//                     case '>': {
//                         const a = pop()
//                         const b = pop()
//                         push(b - a > 0 ? 1 : 0)
//                     } break
//                     case '=': {
//                         const a = pop()
//                         const b = pop()
//                         push(b - a == 0 ? 1 : 0)
//                     } break
//                     case '+': {
//                         const a = pop()
//                         const b = pop()
//                         push(b + a)
//                     } break
//                     case '-': {
//                         const a = pop()
//                         const b = pop()
//                         push(b - a)
//                     } break
//                     case '_': { // unary negate
//                         push(0 - pop())
//                     } break
//                     case '&': {
//                         const a = pop()
//                         const b = pop()
//                         push(b & a)
//                     } break
//                     case '|': {
//                         const a = pop()
//                         const b = pop()
//                         push(b | a)
//                     } break
//                     case '*': {
//                         const a = pop()
//                         const b = pop()
//                         push(b * a)
//                     } break
//                     case '/': {
//                         const a = pop()
//                         const b = pop()
//                         push(b / a)
//                     } break
//                     case '{': { // shift left
//                         push(pop() << 1)
//                     } break
//                     case '}': { // shift right
//                         push(pop() >> 1)
//                     } break
//                     case '\'': { // drop
//                         pop()
//                     } break
//                     case '$': { // swap
//                         const a = pop()
//                         const b = pop()
//                         push(a)
//                         push(b)
//                     } break
//                     case '%': { // over
//                         const a = pop()
//                         const b = pop()
//                         push(b)
//                         push(a)
//                         push(b)
//                     } break
//                     case '~': { // rot a b c - b c a
//                         const a = pop() // b c
//                         const b = pop() // c
//                         const c = pop() // tos
//                         push(b) // b
//                         push(c) // b c
//                         push(a) // b c a
//                     } break
//                     default: console.log('default \'' + ch + '\''); break
//                 }
//             }
//         });
//         if (isNumber) {
//             push(number)
//             isNumber = false
//             isHex = false
//             number = 0
//         }
//     }

//     return Object.freeze({ version, tos, init, push, pop, interpret })
// }
