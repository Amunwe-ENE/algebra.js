var Fraction = require('../src/fractions');

describe("An invalid fraction", function() {
    it("should not initialize with a denominator of 0", function() {
        var frac = new Fraction(1, 0);
        expect(frac.numer).toBeUndefined();
        expect(frac.denom).toBeUndefined();
    });

    it("should not initialize with a denominator of -0", function() {
        var frac = new Fraction(1, -0);
        expect(frac.numer).toBeUndefined();
        expect(frac.denom).toBeUndefined();
    });

    it("should not initialize with decimals in the numerator", function() {
        var frac = new Fraction(0.25, 1);
        expect(frac.numer).toBeUndefined();
        expect(frac.denom).toBeUndefined();
    });

    it("should not initialize with decimals in the denominator", function() {
        var frac = new Fraction(1, 0.25);
        expect(frac.numer).toBeUndefined();
        expect(frac.denom).toBeUndefined();
    });

    it("should not initialize with decimals in both the numerator and denominator", function() {
        var frac = new Fraction(0.75, 0.25);
        expect(frac.numer).toBeUndefined();
        expect(frac.denom).toBeUndefined();
    });
});

describe("A valid, positive fraction", function() {
    var frac = new Fraction(1, 2);

    it("should initialize", function() {
        expect(frac).toBeDefined();
    });

    it("should print to string properly", function() {
        expect(frac.print()).toEqual("1/2");
    });

    it("should print to tex properly", function() {
        expect(frac.tex()).toEqual("\\frac{1}{2}");
    });

    it("should coerce to a number properly", function() {
        expect(frac.decimal()).toEqual(0.5);
    });
});

describe("A valid fraction with a negative numerator", function() {
    var frac = new Fraction(-1, 2);

    it("should initialize", function() {
        expect(frac).toBeDefined();
    });

    it("should print to string properly", function() {
        expect(frac.print()).toEqual("-1/2");
    });

    it("should print to tex with the negative out in front", function() {
        expect(frac.tex()).toEqual("-\\frac{1}{2}");
    });

    it("should coerce to a decimal properly", function() {
        expect(frac.decimal()).toEqual(-0.5);
    })
});

describe("A valid fraction with a negative denominator", function() {
    var frac = new Fraction(2, -4);

    it("should initialize", function() {
        expect(frac).toBeDefined();
    });

    it("should print to string with a negative denominator", function() {
        expect(frac.print()).toEqual("2/-4");
    });

    it("should print to tex with a negative denominator", function() {
        expect(frac.tex()).toEqual("\\frac{2}{-4}");
    });

    it("should bring the negative up to the numerator when reduced", function() {
        var reduced = frac.reduce();
        expect(reduced.numer).toEqual(-1);
        expect(reduced.denom).toEqual(2);
    });

    it("should coerce to a decimal properly", function() {
        expect(frac.decimal()).toEqual(-0.5);
    });
});

describe("Fractions with 1 in the denominator", function() {
    var frac = new Fraction(5, 1);

    it("should initialize", function() {
        expect(frac).toBeDefined();
    });

    it("should print to string with positive integers", function() {
        expect(frac.print()).toEqual("5");
    });

    it("should print to tex with positive integers", function() {
        expect(frac.tex()).toEqual("5");
    });
});

describe("Fractions with -1 in the denominator", function() {
    var frac = new Fraction(5, -1);

    it("should initialize", function() {
        expect(frac).toBeDefined();
    });

    it("should print to string with negative integers", function() {
        expect(frac.print()).toEqual("-5");
    });

    it("should print to tex with negative integers", function() {
        expect(frac.print()).toEqual("-5");
    });
});

describe("Fraction addition", function() {
    var x = new Fraction(1, 3);

    it("should allow addition of other fractions", function() {
        var y = new Fraction(1, 5);
        var answer = x.add(y);

        expect(answer.print()).toEqual("8/15");
    });

    it("should allow addition of integers", function() {
        var answer = x.add(2);

        expect(answer.print()).toEqual("7/3");
    });

    it("should not allow addition of floats", function() {
        var answer = x.add(0.25);

        expect(answer).toBeUndefined();
    });

    it("should return an unreduced version of the answer", function() {
        var y = new Fraction(2, 3);
        var answer = x.add(y);

        expect(answer.print()).toEqual("3/3");
    });

    it("should allow an answer of 0", function() {
        var y = new Fraction(-1, 3);
        var answer = x.add(y);

        expect(answer.print()).toEqual("0");
    });
});

describe("Fraction subtraction", function() {
    var x = new Fraction(1, 3);

    it("should allow subtraction of other fractions", function() {
        var y = new Fraction(1, 5);
        var answer = x.subtract(y);

        expect(answer.print()).toEqual("2/15");
    });

    it("should allow subtraction of integers", function() {
        var answer = x.subtract(2);

        expect(answer.print()).toEqual("-5/3");
    });

    it("should not allow subtraction of floats", function() {
        var answer = x.subtract(0.25);

        expect(answer).toBeUndefined();
    });

    it("should return an unreduced version of the answer", function() {
        var y = new Fraction(4, 6);
        var answer = x.subtract(y);

        expect(answer.print()).toEqual("-2/6");
    });

    it("should allow an answer of 0", function() {
        var y = new Fraction(1, 3);
        var answer = x.subtract(y);

        expect(answer.print()).toEqual("0");
    });
});

describe("Fraction multiplication", function() {
    var x = new Fraction(1, 2);

    it("should allow multplication of other fractions", function() {
        var y = new Fraction(1, 2);
        var answer = x.multiply(y);

        expect(answer.print()).toEqual("1/4");
    });

    it("should allow multiplication of integers", function() {
        var answer = x.multiply(5);

        expect(answer.print()).toEqual("5/2");
    });

    it("should not allow multiplication of floats", function() {
        var answer = x.multiply(0.25);

        expect(answer).toBeUndefined();
    });

    it("should get NaN if multiplying by an invalid fraction", function() {
        var y = new Fraction(1, 0);
        var answer = x.multiply(y);

        expect(answer.numer).toBeNaN();
        expect(answer.denom).toBeNaN();
    });
});

describe("Fraction division", function() {
    var x = new Fraction(1, 2);

    it("should allow division of other fractions", function() {
        var y = new Fraction(1, 2);
        var answer = x.divide(y);

        expect(answer.print()).toEqual("2/2");
    });

    it("should allow division of integers", function() {
        var answer = x.divide(5);

        expect(answer.print()).toEqual("1/10");
    });

    it("should not allow division of floats", function() {
        var answer = x.divide(0.25);

        expect(answer).toBeUndefined();
    });

    it("should get NaN if dividing by an invalid fraction", function() {
        var y = new Fraction(1, 0);
        var answer = x.divide(y);

        expect(answer.numer).toBeNaN();
        expect(answer.denom).toBeNaN();
    });
});