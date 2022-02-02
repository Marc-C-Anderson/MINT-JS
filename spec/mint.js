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
  // it('test "10", 10', function () {
  //   m.interpret('10')
  //   expect(m.pop()).toBe(10);
  // });
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
  // it('test "123 456+", 123+456', function () {
  //   m.interpret('123 456+')
  //   expect(m.pop()).toBe(123 + 456);
  // });
  // it('test "64 128+", 64+128', function () {
  //   m.interpret('64 128+')
  //   expect(m.pop()).toBe(64 + 128);
  // });
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

