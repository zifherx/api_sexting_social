"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authCtrl = {};

authCtrl.iniciarSesion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, userFound, matchPassword, token, online;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            userFound = _context.sent;

            if (userFound) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 6:
            if (userFound.status) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'Usuario Inactivo'
            }));

          case 8:
            _context.next = 10;
            return _User["default"].matchPassword(password, userFound.password);

          case 10:
            matchPassword = _context.sent;

            if (matchPassword) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              token: null,
              message: 'Contraseña Errónea'
            }));

          case 13:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: '24h'
            }); //Cambio de estado de online

            _context.next = 16;
            return _User["default"].findByIdAndUpdate(userFound._id, {
              online: 1
            });

          case 16:
            online = _context.sent;
            res.json({
              token: token,
              codigo: userFound._id
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

authCtrl.cambiarContrasena = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, _req$body2, oldPassword, newPassword, userFound, matchPassword, newObj;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = res.locals.jwtPayload.id;
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword;

            if (oldPassword && newPassword) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'Las contraseñas no coinciden'
            }));

          case 4:
            _context2.next = 6;
            return _User["default"].findById(id);

          case 6:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 9:
            _context2.next = 11;
            return _User["default"].matchPassword(oldPassword, userFound.password);

          case 11:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: 'Contraseña Errónea'
            }));

          case 14:
            _context2.next = 16;
            return _User["default"].encryptPassword(newPassword);

          case 16:
            userFound.password = _context2.sent;
            _context2.next = 19;
            return userFound.save();

          case 19:
            newObj = _context2.sent;
            _context2.prev = 20;

            if (!newObj) {
              _context2.next = 23;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: 'Contraseña actualizada con éxito'
            }));

          case 23:
            _context2.next = 29;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](20);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[20, 25]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

authCtrl.registrarCuenta = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, name, username, password, email, roles, newUser, foundRole, rol, query, token;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, name = _req$body3.name, username = _req$body3.username, password = _req$body3.password, email = _req$body3.email, roles = _req$body3.roles;
            _context3.t0 = _User["default"];
            _context3.t1 = name;
            _context3.t2 = username;
            _context3.next = 6;
            return _User["default"].encryptPassword(password);

          case 6:
            _context3.t3 = _context3.sent;
            _context3.t4 = email;
            _context3.t5 = {
              name: _context3.t1,
              username: _context3.t2,
              password: _context3.t3,
              email: _context3.t4
            };
            newUser = new _context3.t0(_context3.t5);

            if (!roles) {
              _context3.next = 17;
              break;
            }

            _context3.next = 13;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 13:
            foundRole = _context3.sent;
            newUser.roles = foundRole.map(function (a) {
              return a._id;
            });
            _context3.next = 21;
            break;

          case 17:
            _context3.next = 19;
            return _Role["default"].findOne({
              name: 'Usuario'
            });

          case 19:
            rol = _context3.sent;
            newUser.roles = [rol._id];

          case 21:
            _context3.next = 23;
            return newUser.save();

          case 23:
            query = _context3.sent;
            token = _jsonwebtoken["default"].sign({
              id: query._id
            }, _config["default"].SECRET, {
              expiresIn: '24h'
            });
            res.json({
              token: token,
              codigo: query._id,
              message: 'Cuenta registrada con éxito'
            });

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

authCtrl.deleteAccount = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, nowPassword, userFound, matchPassword, dropAccount;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = res.locals.jwtPayload.id;
            nowPassword = req.body.nowPassword;
            _context4.next = 4;
            return _User["default"].findById(id);

          case 4:
            userFound = _context4.sent;

            if (userFound) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 7:
            _context4.next = 9;
            return _User["default"].matchPassword(nowPassword, userFound.password);

          case 9:
            matchPassword = _context4.sent;

            if (matchPassword) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              token: null,
              message: 'Contraseña incorrecta'
            }));

          case 12:
            _context4.prev = 12;
            _context4.next = 15;
            return _User["default"].findByIdAndDelete(id);

          case 15:
            dropAccount = _context4.sent;

            if (!dropAccount) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'Cuenta eliminada con éxito'
            }));

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](12);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              message: _context4.t0.message
            }));

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[12, 20]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

authCtrl.cerrarSesion = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, offline;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = res.locals.jwtPayload.id;
            console.log(id);
            _context5.prev = 2;
            _context5.next = 5;
            return _User["default"].findByIdAndUpdate(id, {
              online: 0
            });

          case 5:
            offline = _context5.sent;

            if (offline) {
              res.json({
                message: 'Sesión Cerrada con éxito'
              });
            }

            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](2);
            return _context5.abrupt("return", res.status(500).json({
              message: _context5.t0.message
            }));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = authCtrl;
exports["default"] = _default;
//# sourceMappingURL=auth.controller.js.map