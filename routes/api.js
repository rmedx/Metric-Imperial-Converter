'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get(function(req, res, next) {
    let input = req.query.input;
    let pair = convertHandler.getNum(input);
    let initNum = pair.roundedResult;
    let initUnit = convertHandler.getUnit(input);
    if (initNum == null && initUnit == null) {
      res.send("invalid number and unit");
    } else if (initNum == null) {
      res.send("invalid number")
    } else if (initUnit == null) {
      res.send("invalid unit")
    } else {
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(pair.result, initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.send({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    }
  });
};
