"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startConnection = startConnection;

var _mongoose = require("mongoose");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function startConnection() {
  return _startConnection.apply(this, arguments);
}

function _startConnection() {
  _startConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongoose.connect)(_config["default"].mongoURL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
            });

          case 2:
            db = _context.sent;
            console.log("Database ".concat(db.connection.name, " is connected"));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startConnection.apply(this, arguments);
}
//# sourceMappingURL=database.js.map