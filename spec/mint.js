'strict'

describe("Mint interpreter", function () {
  it("evaluate < and >", function () {
    const mint = mint2()
    expect(mint.interpret('2 3<')).toBe(1);
    expect(mint.interpret('4 3>')).toBe(1);
  });
});

describe("Mint2", function () {
  const mint = mint2()
  it("Shall have a valid version", function () {
    expect(mint.version()).toBe('MINT Version 1.0.0 Build(20220201)')
  });
  it("Reset the machine.", function () {
    mint.init()
    expect(mint.tos()).toBe(0)
  });
});

describe("Stack Operations", function () {
  const mint = mint2()
  it("push a value onto the stack", function () {
    mint.init()
    mint.push(55)
    expect(mint.tos()).toBe(1)
  });
  it("pop a value from the stack", function () {
    mint.init()
    mint.push(55)
    expect(mint.pop()).toBe(55)
    expect(mint.tos()).toBe(0)
  });
});

