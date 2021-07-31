"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var requestHeader, token, decoded, id, usuario;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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