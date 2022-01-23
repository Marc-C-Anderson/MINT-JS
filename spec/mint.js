'strict'

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    expect(true).toBe(true);
    // expect(interpret('0\\(100)(200)')).toBe(200);
    // expect(interpret('1\\(100)(200)')).toBe(100);
    expect(interpret('2 3<')).toBe(1);
    // expect(interpret('3 3<')).toBe(0);
    // expect(interpret('3 3>')).toBe(0);
    expect(interpret('4 3>')).toBe(1);
  });
});

describe("Test initialisation", function () {
  it("Reset the machine.", function () {
    init()
    expect(tos).toBe(0)
  });
});

describe("Test the stack.", function () {
  it("push", function () {
    init()
    push(55)
    expect(tos).toBe(1)
    expect(stack[0]).toBe(55)
  });
  it("pop", function () {
    init()
    push(55)
    expect(pop()).toBe(55)
    expect(tos).toBe(0)
  });
});
