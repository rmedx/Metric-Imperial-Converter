const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1
    test('convertHandler should correctly read a whole number input', function () {
        let input = "12mi"
        assert.equal(convertHandler.getNum(input).result, 12);
    });
    // #2
    test('convertHandler should correctly read a decimal number input', function () {
        let input = "12.2mi"
        assert.equal(convertHandler.getNum(input).result, 12.2);
    });
    // #3
    test('convertHandler should correctly read a fractional input', function () {
        let input = "1/12mi"
        assert.equal(convertHandler.getNum(input).result, 1/12);
    });
    // #4
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        let input = "1.2/3.4";
        assert.equal(convertHandler.getNum(input).result, 1.2/3.4)
    });
    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)#isNull, #isNotNull', function () {
        let input = "3/2/3";
        assert.isNull(convertHandler.getNum(input).result);
    });
    // #6
    test('#convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        let input = "mi";
        assert.equal(convertHandler.getNum(input).result, 1);
    });
    // #7
    test('convertHandler should correctly read each valid input unit.', function () {
        let inputArr = ["1gal", "1L", "1mi", "1km", "1lbs", "1kg"];
        let filtered = inputArr.filter(d => convertHandler.getUnit(d) != null);
        assert.equal(filtered.length, 6);
    });
    // #8
    test('convertHandler should correctly return an error for an invalid input unit', function () {
        let input = "5gloogs";
        assert.isNull(convertHandler.getUnit(input));
    });
    // #9
    test('convertHandler should return the correct return unit for each valid input unit', function () {
        let inputArr = ["1gal", "1L", "1mi", "1km", "1lbs", "1kg"];
        let mappedArr = inputArr.map(d => convertHandler.getUnit(d));
        let testArr = ["gal", "L", "mi", "km", "lbs", "kg"];
        assert.deepEqual(mappedArr, testArr);
    });
    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        let inputArr = ["gal", "L", "mi", "km", "lbs", "kg"];
        let mappedArr = inputArr.map(d => convertHandler.spellOutUnit(d));
        let testArr = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
        assert.deepEqual(mappedArr, testArr);
    });
    // #11
    test('convertHandler should correctly convert gal to L', function () {
        let input = "1gal";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "3.78541L");
    });
    // #12
    test('convertHandler should correctly convert L to gal', function () {
        let input = "1L";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "0.26417gal");
    });
    // #13
    test('convertHandler should correctly convert mi to km', function () {
        let input = "1mi";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "1.60934km");
    });
    // #14
    test('convertHandler should correctly convert km to mi', function () {
        let input = "1km";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "0.62137mi");
    });
    // #15
    test('convertHandler should correctly convert lbs to kg', function () {
        let input = "1lbs";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "0.45359kg");
    });
    // #16
    test('convertHandler should correctly convert kg to lbs', function () {
        let input = "1kg";
        let initNum = convertHandler.getNum(input).result;
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let result = "" + returnNum + returnUnit;
        assert.equal(result, "2.20462lbs");
    });
});