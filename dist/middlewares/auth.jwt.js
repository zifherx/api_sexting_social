"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

var _User = _interopRequireDefault(require("../models/User"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var requestHeader, token, decoded, id, usuario;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            requestHeader = "x-access-token";
            token = req.header(requestHeader);

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: 'Falta Token'
            }));

          case 5:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            res.locals.jwtPayload = decoded;
            id = decoded.id;
            _context.next = 10;
            return _User["default"].findById(id, {
              password: 0
            });

          case 10:
            usuario = _context.sent;

            if (usuario) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'No se encontró usuario.'
            }));

          case 13:
            next();
            _context.next = 24;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            if (!(_context.t0.message == 'jwt expired')) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'Token ha expirado'
            }));

          case 23:
            return _context.abrupt("return", res.status(401).json({
              message: 'No Autorizado'
            }));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.jwt.js.map