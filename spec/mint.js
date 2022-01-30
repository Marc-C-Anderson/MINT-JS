'strict'

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    //expect(true).toBe(true);
    // expect(interpret('0\\(100)(200)')).toBe(200);
    // expect(interpret('1\\(100)(200)')).toBe(100);
    const mint = new Mint()
    expect(mint.interpret('2 3<')).toBe(1);
    // expect(interpret('3 3<')).toBe(0);
    // expect(interpret('3 3>')).toBe(0);
    expect(mint.interpret('4 3>')).toBe(1);
  });
});

describe("Test initialisation", function () {
  it("Reset the machine.", function () {
    const mint = new Mint()
    mint.init()
    expect(mint.tos()).toBe(0)
  });
});

describe("Test the stack.", function () {
  it("push", function () {
    const mint = new Mint()
    mint.init()
    mint.push(55)
    expect(mint.tos()).toBe(1)
//    expect(stack[0]).toBe(55)
  });
  it("pop", function () {
    const mint = new Mint()
    mint.init()
    mint.push(55)
    expect(mint.pop()).toBe(55)
    expect(mint.tos()).toBe(0)
  });
});

describe("Test the version.", function () {
  it("version", function () {
//    init()
    //push(55)

    const mint = new Mint()
    expect(mint.version()).toBe('MINT Version 1.0.0 Build(20220129)')
    //expect(stack[0]).toBe(55)
  });
});
