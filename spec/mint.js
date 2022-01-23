//const interpret = require('../src/mint.js')

//const interpret = (exp) => { return 1 }

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
      expect(interpret('0\\(100)(200)')).toBe(200);
      expect(interpret('1\\(100)(200)')).toBe(100);
      expect(interpret('2 3<')).toBe(1);
      expect(interpret('3 3<')).toBe(0);
      expect(interpret('3 3>')).toBe(0);
      expect(interpret('4 3>')).toBe(1);
    });
  });
