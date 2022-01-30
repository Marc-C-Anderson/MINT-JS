'strict'

describe('Terminal', function () {
  it('Should be the correct version', function () {
    const terminal = new Terminal()
    expect(terminal.version()).toBe('Terminal Version 1.0.0 (Build 20220129)');
  });
});

