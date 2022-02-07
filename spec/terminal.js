'strict'

describe('Terminal', function () {
  it('Shall have a valid version', function () {
    //const myTerminal = terminal()
    expect(ttyVersion()).toBe('Terminal Version 1.0.0 (Build 20220207)');
  });
});

