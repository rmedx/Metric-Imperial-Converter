function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let roundedResult;
    // regex tests for number, fraction, or decimal w/ lookahead that finds letters at end
    // gives either provided number or null if invalid number
    let regex = /^\d*(\.\d+)?((?<=[1-9])\/((\d*[1-9]\d*(\.\d+)?)|(\d+(\.\d*[1-9]\d*))))?(?=[A-Za-z]+$|$)/
    let matched = input.match(regex);
    // regex tests for existence of unit but no number and returns 1 if no number
    let regex2 = /^[A-Za-z]+$/
    if (Array.isArray(matched) && matched[0] != "") {
      console.log("match array");
      let splitFraction = matched[0].split('/');
      console.log(splitFraction);
      result = (splitFraction.length === 1) ? splitFraction[0] : splitFraction[0] / splitFraction[1];
      roundedResult = Number(Number.parseFloat(result).toFixed(5))
    } else {
      if (regex2.test(input)) {
        result = 1;
        roundedResult = 1;
      } else {
        result = null;
        roundedResult = null;
      }
    }
    return {result, roundedResult};
  };
  
  this.getUnit = function(input) {
    let result;
    let lowercaseUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    let units = ["gal", "L", "mi", "km", "lbs", "kg"];
    let regex = /[A-Za-z]+$/
    let matched = input.match(regex);
    result = Array.isArray(matched) ? matched[0] : null;
    if (result != null) {
      result = lowercaseUnits.includes(result.toLowerCase()) ? units[lowercaseUnits.indexOf(result.toLowerCase())] : null;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let conversion = {
      "gal": "L", 
      "L": "gal", 
      "mi": "km", 
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    }
    return conversion[initUnit];
  };

  this.spellOutUnit = function(unit) {
    let conversion = {
      "gal": "gallons", 
      "L": "liters", 
      "mi": "miles", 
      "km": "kilometers", 
      "lbs": "pounds", 
      "kg": "kilograms"};
    return conversion[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let conversion = {
      "gal": galToL, 
      "L": 1 / galToL, 
      "mi": miToKm, 
      "km": 1 / miToKm,
      "lbs": lbsToKg,
      "kg": 1 / lbsToKg
    }
    return Number((initNum * conversion[initUnit]).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };
}

module.exports = ConvertHandler;