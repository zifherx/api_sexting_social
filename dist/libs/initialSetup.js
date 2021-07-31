"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdminUser = exports.createRoles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var createRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var conteo, valores;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].estimatedDocumentCount();

          case 3:
            conteo = _context.sent;

            if (!(conteo > 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return Promise.all([new _Role["default"]({
              name: 'Administrador',
              description: 'Webmaster'
            }).save(), new _Role["default"]({
              name: 'Usuario',
              description: 'Usuario Común'
            }).save()]);

          case 8:
            valores = _context.sent;
            console.log(valores);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdminUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var master, roleAdmin, codigoRol, usuario;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].estimatedDocumentCount();

          case 3:
            master = _context2.sent;
            _context2.next = 6;
            return _Role["default"].find({
              name: 'Administrador'
            });

          case 6:
            roleAdmin = _context2.sent;
            codigoRol = roleAdmin.map(function (a) {
              return a._id;
            });

            if (!(master > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return");

          case 10:
            _context2.t0 = Promise;
            _context2.t1 = _User["default"];
            _context2.next = 14;
            return _User["default"].encryptPassword('admin');

          case 14:
            _context2.t2 = _context2.sent;
            _context2.t3 = codigoRol;
            _context2.t4 = {
              name: 'Fernando Rojas',
              username: 'zifherx',
              password: _context2.t2,
              email: 'frojasq@ziphonex.com',
              description: 'Webmaster de Sexting Social',
              roles: _context2.t3
            };
            _context2.t5 = new _context2.t1(_context2.t4).save();
            _context2.t6 = [_context2.t5];
            _context2.next = 21;
            return _context2.t0.all.call(_context2.t0, _context2.t6);

          case 21:
            usuario = _context2.sent;
            console.log(usuario);
            _context2.next = 28;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t7 = _context2["catch"](0);
            console.log(_context2.t7);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 25]]);
  }));

  return function createAdminUser() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdminUser = createAdminUser;
//# sourceMappingURL=initialSetup.js.map