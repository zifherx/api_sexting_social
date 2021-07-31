"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  username: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  titleImage: {
    type: String
  },
  imageProfile: {
    type: String
  },
  description: {
    type: String
  },
  roles: {
    ref: "Role",
    type: _mongoose.Schema.Types.ObjectId
  },
  status: {
    type: Boolean,
    "default": true
  },
  online: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clave) {
    var salto;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salto = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(clave, salto);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.statics.matchPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clave, claveRecibida) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(clave, claveRecibida);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;
//# sourceMappingURL=User.js.map