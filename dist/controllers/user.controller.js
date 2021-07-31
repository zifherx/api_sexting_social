"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

require("dotenv/config");

var userCtrl = {};

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // secure: true

});

userCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].find().sort({
              name: 'asc'
            }).populate('roles');

          case 3:
            query = _context.sent;

            if (!(query.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json(query);
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: 'No existen Usuarios'
            }));

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(503).json({
              message: _context.t0.message
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

userCtrl.getOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findById(userId).populate('roles');

          case 4:
            query = _context2.sent;

            if (!query) {
              _context2.next = 9;
              break;
            }

            res.json(query);
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existen el Usuario'
            }));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(503).json({
              message: _context2.t0.message
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

userCtrl.createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, username, password, email, roles, titleImage, imageProfile, newUser, foundRole, rol, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, username = _req$body.username, password = _req$body.password, email = _req$body.email, roles = _req$body.roles, titleImage = _req$body.titleImage, imageProfile = _req$body.imageProfile;
            _context3.prev = 1;
            _context3.t0 = _User["default"];
            _context3.t1 = name;
            _context3.t2 = username;
            _context3.next = 7;
            return _User["default"].encryptPassword(password);

          case 7:
            _context3.t3 = _context3.sent;
            _context3.t4 = email;
            _context3.t5 = titleImage;
            _context3.t6 = imageProfile;
            _context3.t7 = {
              name: _context3.t1,
              username: _context3.t2,
              password: _context3.t3,
              email: _context3.t4,
              titleImage: _context3.t5,
              imageProfile: _context3.t6
            };
            newUser = new _context3.t0(_context3.t7);

            if (!roles) {
              _context3.next = 20;
              break;
            }

            _context3.next = 16;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 16:
            foundRole = _context3.sent;
            newUser.roles = foundRole.map(function (a) {
              return a._id;
            });
            _context3.next = 24;
            break;

          case 20:
            _context3.next = 22;
            return _Role["default"].findOne({
              name: 'Usuario'
            });

          case 22:
            rol = _context3.sent;
            newUser.roles = [rol._id];

          case 24:
            _context3.next = 26;
            return newUser.save();

          case 26:
            query = _context3.sent;

            if (query) {
              res.json({
                message: 'Usuario creado con éxito'
              });
            }

            _context3.next = 34;
            break;

          case 30:
            _context3.prev = 30;
            _context3.t8 = _context3["catch"](1);
            console.log(_context3.t8);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t8.message
            }));

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 30]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

userCtrl.updateProfile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, userId, username, name, email, description, data_image, result, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // const {userId} = req.params;
            _req$body2 = req.body, userId = _req$body2.userId, username = _req$body2.username, name = _req$body2.name, email = _req$body2.email, description = _req$body2.description;
            console.log(req.body);
            data_image = req.file;
            _context4.prev = 3;
            _context4.next = 6;
            return _cloudinary["default"].uploader.upload(data_image.path);

          case 6:
            result = _context4.sent;
            _context4.next = 9;
            return _User["default"].findByIdAndUpdate(userId, {
              name: name,
              username: username,
              email: email,
              description: description,
              titleImage: result.public_id,
              imageProfile: result.url
            });

          case 9:
            query = _context4.sent;
            console.log(query);

            if (!query) {
              _context4.next = 17;
              break;
            }

            _context4.next = 14;
            return _fsExtra["default"].unlink(data_image.path);

          case 14:
            res.json({
              message: 'Perfil actualizado con éxito'
            });
            _context4.next = 18;
            break;

          case 17:
            return _context4.abrupt("return", res.status(404).json({
              message: 'Perfil no encontrado'
            }));

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 20]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

userCtrl.updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userId, _req$body3, name, username, email, status, query;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.params.userId;
            _req$body3 = req.body, name = _req$body3.name, username = _req$body3.username, email = _req$body3.email, status = _req$body3.status;
            _context5.prev = 2;
            _context5.next = 5;
            return _User["default"].findByIdAndUpdate(userId, {
              name: name,
              username: username,
              email: email,
              status: status
            });

          case 5:
            query = _context5.sent;

            if (!query) {
              _context5.next = 10;
              break;
            }

            res.json({
              message: 'Usuario actualizado con éxito'
            });
            _context5.next = 11;
            break;

          case 10:
            return _context5.abrupt("return", res.status(404).json({
              message: 'Usuario no encontrado'
            }));

          case 11:
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 13]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

userCtrl.deleteUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.params.userId;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findByIdAndRemove(userId);

          case 4:
            query = _context6.sent;

            if (!query) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: 'Usuario eliminado con éxito'
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: 'Usuario no encontrado'
            }));

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = userCtrl;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map