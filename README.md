# MINT-JS

A Javascript implementation of MINT

## Repository

<https://github.com/Marc-C-Anderson/MINT-JS>

## Unit Tests

To run all the unit tests

Open SpecRunner.html in a browser.

## Converting to Crockford Objects

<https://fek.io/blog/crockford-objects-in-java-script>


## John Notes

Yes that's good. Mint is pretty good for self contained tests. I can launch from the z80 by calling a routine located immediately before a C string

```asm
CALL ENTER
.cstr "Mint code goes here"
HALT
```

Enter pops the return stack which is the address of the start of the C string and runs the interpreter until it reaches the null (which is a Mint opcode to exit). The Mint instruction pointer then points to the address on the main line to return to do it jumps there. It means that Mint can easily be integrated with machine code and vica versa
