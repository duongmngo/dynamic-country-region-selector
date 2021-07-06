import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var defaultAPITimeout = 1000;
import wait from "./wait";
import { get } from "lodash";
export default (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ip, IP_STACK_KEY) {
    var location;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return detectLocationExtremeIp(ip).then(function (value) {
              return value;
            }).catch(function () {
              return detectLocationIpApi(ip);
            }).then(function (value) {
              return value;
            }).catch(function () {
              return detectLocationIpStack(ip, IP_STACK_KEY);
            }).then(function (value) {
              return value;
            });

          case 3:
            location = _context.sent;
            return _context.abrupt("return", location);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var detectLocationIpStack = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(ip, IP_STACK_KEY) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              try {
                Promise.race([fetch("http://api.ipstack.com/" + ip + "?access_key=" + IP_STACK_KEY), wait(defaultAPITimeout)]).then(function (res) {
                  return res ? res.json() : null;
                }).then(function (res) {
                  if (!res || res.error) {
                    reject(null);
                  } else {
                    resolve({
                      countryName: get(res, "country_name"),
                      countryCode: get(res, "country_code"),
                      languageCode: get(res, "location.languages[0].code")
                    });
                  }
                });
              } catch (ex) {
                reject(null);
              }
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function detectLocationIpStack(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var detectLocationExtremeIp = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(ip) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              try {
                Promise.race([fetch("https://extreme-ip-lookup.com/json/" + ip), wait(defaultAPITimeout)]).then(function (res) {
                  return res ? res.json() : null;
                }).then(function (res) {
                  if (!res || res.status === "fail") {
                    reject(null);
                  } else {
                    resolve({
                      countryCode: get(res, "countryCode")
                    });
                  }
                });
              } catch (ex) {
                reject(null);
              }
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function detectLocationExtremeIp(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var detectLocationIpApi = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(ip) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              try {
                Promise.race([fetch("http://ip-api.com/json/" + ip), wait(defaultAPITimeout * 2)]).then(function (res) {
                  return res ? res.json() : null;
                }).then(function (res) {
                  if (!res || res.status === "fail") {
                    reject(null);
                  } else {
                    resolve({
                      countryCode: get(res, "countryCode")
                    });
                  }
                });
              } catch (ex) {
                reject(null);
              }
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function detectLocationIpApi(_x6) {
    return _ref4.apply(this, arguments);
  };
}();