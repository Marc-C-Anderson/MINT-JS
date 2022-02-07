'strict'

describe('Terminal', function () {
  it('Shall have a valid version', function () {
    expect(ttyVersion()).toBe('Terminal Version 1.0.0 (Build 20220207)')
  })
})
