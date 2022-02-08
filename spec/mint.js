'strict'

describe('Mint Interpreter', function () {
  it('Shall have a valid version', function () {
    expect(mintVersion()).toBe('MINT Version 1.0.0 Build(20220207)')
  })

  it('test "1", 1', function () {
    mintInterpreter('1')
    expect(mintPop()).toBe(1)
  })

  it('test "0", 0', function () {
    mintInterpreter('0')
    expect(mintPop()).toBe(0)
  })

  it('test "10", 10', function () {
    mintInterpreter('10')
    expect(mintPop()).toBe(10)
  })

  it('test "#10", $10', function () {
    mintInterpreter('#10')
    expect(mintPop()).toBe(0x10)
  })

  it('test "#FF", $FF', function () {
    mintInterpreter('#FF')
    expect(mintPop()).toBe(0xFF)
  })

  it('test "2 3=", 0', function () {
    mintInterpreter('2 3=')
    expect(mintPop()).toBe(0)
  })

  it('test "3 3=", 1', function () {
    mintInterpreter('3 3=')
    expect(mintPop()).toBe(1)
  })

  it('test "2 3<", 1', function () {
    mintInterpreter('2 3<')
    expect(mintPop()).toBe(1)
  })

  it('test "3 3<", 0', function () {
    mintInterpreter('3 3<')
    expect(mintPop()).toBe(0)
  })

  it('test "3 3>", 0', function () {
    mintInterpreter('3 3>')
    expect(mintPop()).toBe(0)
  })

  it('test "4 3>", 1', function () {
    mintInterpreter('4 3>')
    expect(mintPop()).toBe(1)
  })

  it('test "1 2+", 3', function () {
    mintInterpreter('1 2+')
    expect(mintPop()).toBe(3)
  })

  it('test "123 456+", 123+456', function () {
    mintInterpreter('123 456+')
    expect(mintPop()).toBe(123 + 456)
  })

  it('test "64 128+", 64+128', function () {
    mintInterpreter('64 128+')
    expect(mintPop()).toBe(64 + 128)
  })

  it('test "5 3-", 2', function () {
    mintInterpreter('5 3-')
    expect(mintPop()).toBe(2)
  })

  it('test "1_ 2+",1', function () {
    mintInterpreter('1_ 2+')
    expect(mintPop()).toBe(1)
  })

  it('test "1_1+",0', function () {
    mintInterpreter('1_1+')
    expect(mintPop()).toBe(0)
  })

  it('test "3 5&", 1', function () {
    mintInterpreter('3 5&')
    expect(mintPop()).toBe(1)
  })

  it('test "3 5|", 7', function () {
    mintInterpreter('3 5|')
    expect(mintPop()).toBe(7)
  })

  it('test "1{", 2', function () {
    mintInterpreter('1{')
    expect(mintPop()).toBe(2)
  })

  it('test "1}", 0', function () {
    mintInterpreter('1}')
    expect(mintPop()).toBe(0)
  })

  it('test "2}", 1', function () {
    mintInterpreter('2}')
    expect(mintPop()).toBe(1)
  })

  it('test "1 2 3 \' +", 3', function () {
    mintInterpreter('1 2 3 \' +')
    expect(mintPop()).toBe(3)
  })

  it('test "2 3*", 6', function () {
    mintInterpreter('2 3*')
    expect(mintPop()).toBe(6)
  })

  it('test "1 2 3+*", 5', function () {
    mintInterpreter('1 2 3+*')
    expect(mintPop()).toBe(5)
  })

  //call enter
  //.cstr "1 3",$22,"+"
  //expect "1 3 DUP +", 6
  it('test "1 3 \" +", 6', function () {
    mintInterpreter('1 3 " +')
    expect(mintPop()).toBe(6)
    mintPop()
  })

  //   // it('test "5 2/\'", 2', function () {
  //   //   mintInterpreter('5 2/\'')
  //   //   expect(mintPop()).toBe(2)
  //   // })

  it('test "3 5$ -", 2', function () {
    mintInterpreter('3 5$ -')
    expect(mintPop()).toBe(2)
  })

  it('test "5 2/$ \'", 1', function () {
    mintInterpreter('5 2/$ \'')
    expect(mintPop()).toBe(1)
  })

  it('test "2 3%++", 7', function () {
    mintInterpreter('2 3%++')
    expect(mintPop()).toBe(7)
  })

  it('test "1 2 3~\'\'", 2', function () {
    mintInterpreter('1 2 3~\'\'')
    expect(mintPop()).toBe(2)
  })

  it('test "1 2 3~+*", 8', function () {
    mintInterpreter('1 2 3~+*')
    expect(mintPop()).toBe(8)
  })

  // it('test "10 11 12\\#3$ \'$ \'$ \'", 4', function () {
  //   mintInterpreter('10 11 12\\#3$ \'$ \'$ \'')
  //   expect(mintPop()).toBe(4)
  // })

  it('test "2a!a@",2', function () {
    mintInterpreter('2a!a@')
    expect(mintPop()).toBe(2)
  })

  it('test "3x! 1 x@+x! x@", 4', function () {
    mintInterpreter('3x! 1 x@+x! x@')
    expect(mintPop()).toBe(4)
  })

  it('test "3x! 1_ x@+x! x@", 2', function () {
    mintInterpreter('3x! 1_ x@+x! x@')
    expect(mintPop()).toBe(2)
  })

})

//   // test ":X1; X", 1
//   // test ":A100;A", 100
//   // test ":Aa!; 3A a@", 3
//   // test ":Aa!;:Ba@;4AB", 4
//   // test "\\:2; \\^", 2
//   // test "[]$ '", 0
//   // test "[3]$ '", 1
//   // test "[3]'@", 3
//   // test "[1 2 3]'@", 1
//   // test "[1 2 3]'2+@", 2
//   // test "\\h@[1]''\\h@$-", 2
//   // test "\\h@[1 2 3]''\\h@$-", 6
//   // test "\\[]$ '", 0
//   // test "\\[3]'\\@", 3
//   // test "\\[3]$ '", 1
//   // test "\\[1 2 3]'\\@", 1
//   // test "\\[1 2 3]'1+\\@", 2
//   // test "\\h@\\[1 2 3]''\\h@$-", 3
//   // test "\\h@\\[1]''\\h@$-", 1
//   // test "\\`A`\\@",65
//   // test "0 0(1+)", 0
//   // test "0 1(1+)", 1
//   // test "0 2(1+)", 2
//   // test "0 1(0(1+))", 0
//   // test "0 1(1(1+))", 1
//   // test "0 2(1(1+))", 2
//   // test "0 2(2(1+))", 4
//   // test "0 1(\\i@+)", 0
//   // test "0 2(\\i@+)", 1
//   // test "0 3(\\i@+)", 3
//   // test "0 2(2(\\i@ \\i6+@ ++))", 4
//   // test "0t! 10(1 t@+t!) t@",10
//   // test "0(100)(200)",200
//   // test "1(100)(200)",100
//   // test "0t! 10(\\i@ 4>\\~ \\i@ 1 t@+t!) t@",5
//   // test "0t! [1 2 3] $ a! ( a@ \\i@ {+ @ t@+t! ) t@", 6
//   // test ":X10;\\0X", 10
//   // test "2 \\1x! \\1x@", 2
// })

// describe("Stack Operations", function () {
//   const m = mint()
//   it("push a value onto the stack", function () {
//     m.init()
//     m.push(55)
//     expect(m.tos()).toBe(1)
//   })
//   it("pop a value from the stack", function () {
//     m.init()
//     m.push(55)
//     expect(mintPop()).toBe(55)
//     expect(m.tos()).toBe(0)
//   })
// })
