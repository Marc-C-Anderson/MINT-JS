# Developer Notes

Develop a js implementation of MINT

## TDD

Start from the ground up with unit tests in mind. Jasmine on the command line is the simplest.

<https://jasmine.github.io/pages/getting_started.html>

Getting started with jasmine

<https://www.testim.io/blog/jasmine-js-a-from-scratch-tutorial-to-start-testing/>

## Node and NPM

Current versions

```shell
node -v
v14.18.1
npm -v
6.14.15
```

## Development Log

| Date     | Item                                                        |
|----------|-------------------------------------------------------------|
| 20220122 | Initial idea and conversation with J.H                      |
|          | Project stood up in github                                  |
| 20220123 | Test framework and initial documentation                    |
|          | Moving away from nodejs towards BBD with standalone Jasmine |
| 20220201 | Converted to Crockford objects                              |
| 20220203 | Adding tests                                                |
| 20220204 | Multidigit and hex numbers done                             |

## TODO

| Item | Activity                               | Status   | Priority |
|------|----------------------------------------|----------|----------|
| tty  | Develop a simple glass terminal        | progress | 1        |
| tty  | Capture keyboard input                 | planned  | 2        |
| tty  | Add circular i/o buffers               | planned  | 4        |
| tty  | Test with loopback                     | planned  | 3        |
| tty  | Add Jasmine tests                      | progress | 9        |
| mint | convert crockford to vanilla           | progress | 1        |
| mint | revisit number parsing                 | planned  | 2        |
| mint | Add jasmine tests                      | progress | 9        |
| mint | convert to internal 8 bit architecture | planned  | 9        |
| mint | Add support for hexadecimal numbers    | done     | 9        |
| mint | Add support for multidigit numbers     | done     | 9        |

## Language Specification

### Numbers

Numbers are 16 bit.
Negation is achieved using the _ operator.

### Operators

|Symbol|Operation   |Notes                                         |
|------|------------|----------------------------------------------| 
|'     |drop        |pop the top value off the stack and discard it|
|_     |negate      ||
|{     |shift left  ||
|}     |shift right ||
|+     |add         ||
|-     |subtract    ||
|*     |multiply    ||
|/     |divide      ||
|&     |and         ||
|\|    |or          ||
|>     |greater than||
|<     |less than   ||
|=     |equals      ||
|$     |swap        |a b -- b a  |
|%     |over        |a b -- a b a|
|~     |bitwise invert |a -- a|
|~     |rotate |a b c -- b c a|

## John Notes

Yes that's good. Mint is pretty good for self contained tests. I can launch from the z80 by calling a routine located immediately before a C string

```asm
CALL ENTER
.cstr "Mint code goes here"
HALT
```

Enter pops the return stack which is the address of the start of the C string and runs the interpreter until it reaches the null (which is a Mint opcode to exit). The Mint instruction pointer then points to the address on the main line to return to do it jumps there. It means that Mint can easily be integrated with machine code and vica versa

Structured items should be checked for balance, matching [ ] ( )   etc

John Hardy
If you haven't already looked at it the README has an up to date glossary of the parts of the language.

Loops and conditionals are the same structure. Also false=0 and true=1 (not -1 as with C)

```forth
100(x) \\ prints 100 x's
```

If is done using the loop mechanism
```forth
3 2>(true)
```

Also ELSE is also possible by following loop immediately after by the else (this is a case where whitespace is significant)
```forth
3 2>(true)(false)
```

OK it looks good.
Mint is a very simple state machine. I can see the big switch statement You can model it with an array which looks up a function according to a byte code.
You need an instruction pointer which points to the byte in your program.
A heap pointer for pointing into unallocated memory
A text input buffer
There are two stack pointers, one for parameters, and one for storing the return address of the IP.

{ and } btw mean shift left and shift right rather than increment / decrement

Ignore the stuff about "You can model it with an array which looks up a function according to a byte code" that got left in after I had already found your switch table, same thing, more or less

You sent
Early days. Thanks for the heads up on shifts

John Hardy
I'd ditch the Crockford stuff, there's really very little point futzing about with Object.freeze and so on. Do it all with functions