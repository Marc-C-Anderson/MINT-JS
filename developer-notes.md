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
PS C:\Users\Marc\projects\MINT-JS> node -v
v14.18.1
PS C:\Users\Marc\projects\MINT-JS> npm -v
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

## TODO

| Item | Activity                        | Status   |
|------|---------------------------------|----------|
| tty  | Develop a simple glass terminal | progress |
| tty  | Capture keyboard input          | planned  |
| tty  | Add circular i/o buffers        | planned  |
| tty  | Test with loopback              | planned  |
| tty  | Add Jasmine tests                   | progress |
| mint | Add jasmine tests                   | progress |
| mint | Add support for hexadecimal numbers | planned  |
| mint | Add support for multidigit numbers  | planned  |

## Language Specification

### Numbers

Numbers are 16bit.
Negation is achieved using the _ operator.

### Operators

|Symbol|Operation|Notes                                          |
|------|---------|-----------------------------------------------| 
|'     | drop    |pop the top value off the stack and discard it |
|_| negate||
|{| increment||
|}| decrement||
|+| add||
|-| subtract||
|*| multiply||
|&| and||
|\|| or||
|>| greater than||
|<| less than||
|=| equals||

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
