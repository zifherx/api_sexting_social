"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(clave) {
    var salto;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(clave, claveRecibida) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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