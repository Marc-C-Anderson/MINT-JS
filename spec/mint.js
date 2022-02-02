'strict'

describe("Mint interpreter", function () {
  const mintv = mint()
  it("Expect 0", function () {
    expect(mintv.interpret('0')).toBe(0);
  });
  // it("Expect 1", function () {
  //   expect(mintv.interpret('1')).toBe(1);
  // });
  // it("Expect 10", function () {
  //   expect(mintv.interpret('10')).toBe(10);
  // });
  // it("Expect #10", function () {
  //   expect(mintv.interpret('#10')).toBe(16);
  // });
  // it("Expect #FF", function () {
  //   expect(mintv.interpret('#FF')).toBe(255);
  // });
  it("Expect 2 = 3", function () {
    expect(mintv.interpret('2 3=')).toBe(0);
  });
  it("Expect 3 = 3", function () {
    expect(mintv.interpret('3 3=')).toBe(1);
  });
  it("Expect 2 < 3", function () {
    expect(mintv.interpret('2 3<')).toBe(1);
  });
  it("Expect 3 < 3", function () {
    expect(mintv.interpret('3 3<')).toBe(0);
  });
  it("Expect 3 > 3", function () {
    expect(mintv.interpret('3 3>')).toBe(0);
  });
  it("Expect 4 > 3", function () {
    expect(mintv.interpret('4 3>')).toBe(1);
  });
  it("Expect 1 + 2", function () {
    expect(mintv.interpret('1 2+')).toBe(3);
  });
});

describe("Mint", function () {
  const mintv = mint()
  it("Shall have a valid version", function () {
    expect(mintv.version()).toBe('MINT Version 1.0.0 Build(20220201)')
  });
  it("Reset the machine.", function () {
    mintv.init()
    expect(mintv.tos()).toBe(0)
  });
});

describe("Stack Operations", function () {
  const mintv = mint()
  it("push a value onto the stack", function () {
    mintv.init()
    mintv.push(55)
    expect(mintv.tos()).toBe(1)
  });
  it("pop a value from the stack", function () {
    mintv.init()
    mintv.push(55)
    expect(mintv.pop()).toBe(55)
    expect(mintv.tos()).toBe(0)
  });
});

