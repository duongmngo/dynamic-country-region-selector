"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _country = require("./data/country");

var _country2 = _interopRequireDefault(_country);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(countryCode) {
    var isExist, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isExist = _country2.default.indexOf(countryCode) === -1;

            if (!isExist) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", []);

          case 3:
            _context.next = 5;
            return import("./data/" + countryCode + ".json");

          case 5:
            data = _context.sent;
            return _context.abrupt("return", (0, _lodash.get)(data, "default.settings.labelLevels") || []);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports["default"];