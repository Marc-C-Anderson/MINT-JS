'strict'

describe("Mint interpreter", function () {
  const m = mint()
  it('test "1", 1', function () {
    m.interpret('1')
    expect(m.pop()).toBe(1);
  });
  it('test "0", 0', function () {
    m.interpret('0')
    expect(m.pop()).toBe(0);
  });
  it('test "10", 10', function () {
    m.interpret('10')
    expect(m.pop()).toBe(10);
  });
  // it('test "#10", $10', function () {
  //   m.interpret('#10')
  //   expect(m.pop()).toBe(0x10);
  // });
  // it('test "#FF", $FF', function () {
  //   m.interpret('#FF')
  //   expect(m.pop()).toBe(0xFF);
  // });
  it('test "2 3=", 0', function () {
    m.interpret('2 3=')
    expect(m.pop()).toBe(0);
  });
  it('test "3 3=", 1', function () {
    m.interpret('3 3=')
    expect(m.pop()).toBe(1);
  });
  it('test "2 3<", 1', function () {
    m.interpret('2 3<')
    expect(m.pop()).toBe(1);
  });
  it('test "3 3<", 0', function () {
    m.interpret('3 3<')
    expect(m.pop()).toBe(0);
  });
  it('test "3 3>", 0', function () {
    m.interpret('3 3>')
    expect(m.pop()).toBe(0);
  });
  it('test "4 3>", 1', function () {
    m.interpret('4 3>')
    expect(m.pop()).toBe(1);
  });
  it('test "1 2+", 3', function () {
    m.interpret('1 2+')
    expect(m.pop()).toBe(3);
  });
  it('test "123 456+", 123+456', function () {
    m.interpret('123 456+')
    expect(m.pop()).toBe(123 + 456);
  });
  it('test "64 128+", 64+128', function () {
    m.interpret('64 128+')
    expect(m.pop()).toBe(64 + 128);
  });
  it('test "5 3-", 2', function () {
    m.interpret('5 3-')
    expect(m.pop()).toBe(2);
  });
  it('test "1_ 2+",1', function () {
    m.interpret('1_ 2+')
    expect(m.pop()).toBe(1);
  });
  it('test "1_1+",0', function () {
    m.interpret('1_1+')
    expect(m.pop()).toBe(0);
  });
  it('test "3 5&", 1', function () {
    m.interpret('3 5&')
    expect(m.pop()).toBe(1);
  });
  it('test "3 5|", 7', function () {
    m.interpret('3 5|')
    expect(m.pop()).toBe(7);
  });
  it('test "1{", 2', function () {
    m.interpret('1{')
    expect(m.pop()).toBe(2);
  });
  it('test "1}", 0', function () {
    m.interpret('1}')
    expect(m.pop()).toBe(0);
  });
  it('test "2}", 1', function () {
    m.interpret('2}')
    expect(m.pop()).toBe(1);
  });
  it('test "1 2 3 \' +", 3', function () {
    m.interpret('1 2 3 \' +')
    expect(m.pop()).toBe(3);
  });
  it('test "2 3*", 6', function () {
    m.interpret('2 3*')
    expect(m.pop()).toBe(6);
  });
  it('test "1 2 3+*", 5', function () {
    m.interpret('1 2 3+*')
    expect(m.pop()).toBe(5);
  });



  //call enter
  //.cstr "1 3",$22,"+"
  //expect "1 3 DUP +", 6


  // it('test "5 2/\'", 2', function () {
  //   m.interpret('5 2/\'')
  //   expect(m.pop()).toBe(2);
  // });
  it('test "3 5$ -", 2', function () {
    m.interpret('3 5$ -')
    expect(m.pop()).toBe(2);
  });
  // it('test "5 2/$ \'", 1', function () {
  //   m.interpret('5 2/$ \'')
  //   expect(m.pop()).toBe(1);
  // });
  it('test "2 3%++", 7', function () {
    m.interpret('2 3%++')
    expect(m.pop()).toBe(7);
  });
  it('test "1 2 3~\'\'", 2', function () {
    m.interpret('1 2 3~\'\'')
    expect(m.pop()).toBe(2);
  });
  it('test "1 2 3~+*", 8', function () {
    m.interpret('1 2 3~+*')
    expect(m.pop()).toBe(8);
  });
  // it('test "10 11 12\\#3$ \'$ \'$ \'", 4', function () {
  //   m.interpret('10 11 12\\#3$ \'$ \'$ \'')
  //   expect(m.pop()).toBe(4);
  // });



  // 
  // test "2a!a@",2
  // test "3x! 1 x@+x! x@", 4
  // test "3x! 1_ x@+x! x@", 2
  // test ":X1; X", 1
  // test ":A100;A", 100
  // test ":Aa!; 3A a@", 3
  // test ":Aa!;:Ba@;4AB", 4
  // test "\\:2; \\^", 2
  // test "[]$ '", 0
  // test "[3]$ '", 1
  // test "[3]'@", 3
  // test "[1 2 3]'@", 1
  // test "[1 2 3]'2+@", 2
  // test "\\h@[1]''\\h@$-", 2
  // test "\\h@[1 2 3]''\\h@$-", 6
  // test "\\[]$ '", 0
  // test "\\[3]'\\@", 3
  // test "\\[3]$ '", 1
  // test "\\[1 2 3]'\\@", 1
  // test "\\[1 2 3]'1+\\@", 2
  // test "\\h@\\[1 2 3]''\\h@$-", 3
  // test "\\h@\\[1]''\\h@$-", 1
  // test "\\`A`\\@",65
  // test "0 0(1+)", 0
  // test "0 1(1+)", 1
  // test "0 2(1+)", 2
  // test "0 1(0(1+))", 0
  // test "0 1(1(1+))", 1
  // test "0 2(1(1+))", 2
  // test "0 2(2(1+))", 4
  // test "0 1(\\i@+)", 0
  // test "0 2(\\i@+)", 1
  // test "0 3(\\i@+)", 3
  // test "0 2(2(\\i@ \\i6+@ ++))", 4
  // test "0t! 10(1 t@+t!) t@",10
  // test "0(100)(200)",200
  // test "1(100)(200)",100
  // test "0t! 10(\\i@ 4>\\~ \\i@ 1 t@+t!) t@",5
  // test "0t! [1 2 3] $ a! ( a@ \\i@ {+ @ t@+t! ) t@", 6
  // test ":X10;\\0X", 10
  // test "2 \\1x! \\1x@", 2








});




describe("Mint", function () {
  const m = mint()
  it("Shall have a valid version", function () {
    expect(m.version()).toBe('MINT Version 1.0.0 Build(20220201)')
  });
  it("Reset the machine.", function () {
    m.init()
    expect(m.tos()).toBe(0)
  });
});

describe("Stack Operations", function () {
  const m = mint()
  it("push a value onto the stack", function () {
    m.init()
    m.push(55)
    expect(m.tos()).toBe(1)
  });
  it("pop a value from the stack", function () {
    m.init()
    m.push(55)
    expect(m.pop()).toBe(55)
    expect(m.tos()).toBe(0)
  });
});

