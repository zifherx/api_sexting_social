"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _User = _interopRequireDefault(require("../models/User"));

var postCtrl = {};

postCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Post["default"].find().sort({
              fechaCreacion: -1
            }).populate('user');

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
              message: 'No existen Posts'
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

postCtrl.getOneById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var postId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            postId = req.params.postId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Post["default"].findById(postId);

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
              message: 'No existen Post'
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

postCtrl.getAllByUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var usuario, foundUser, foundPosts;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            usuario = req.body.usuario;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].find({
              email: {
                $in: usuario
              }
            });

          case 4:
            foundUser = _context3.sent;

            if (!(foundUser.length == 0)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 7:
            _context3.next = 9;
            return _Post["default"].find({
              user: {
                $in: foundUser._id
              }
            });

          case 9:
            foundPosts = _context3.sent;

            if (!(foundPosts.length > 0)) {
              _context3.next = 14;
              break;
            }

            res.json(foundPosts);
            _context3.next = 15;
            break;

          case 14:
            return _context3.abrupt("return", res.status(404).json({
              message: 'No existen Post de este usuario aún'
            }));

          case 15:
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 17]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

postCtrl.createPost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, user, texto, newPost, foundUser, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, user = _req$body.user, texto = _req$body.texto;
            _context4.prev = 1;
            newPost = new _Post["default"]({
              texto: texto
            });
            _context4.next = 5;
            return _User["default"].find({
              email: {
                $in: user
              }
            });

          case 5:
            foundUser = _context4.sent;
            newPost.user = foundUser.map(function (a) {
              return a._id;
            });
            _context4.next = 9;
            return newPost.save();

          case 9:
            query = _context4.sent;
            console.log(query);

            if (query) {
              res.json({
                message: 'Post creado con éxito'
              });
            }

            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 14]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

postCtrl.deletePost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var postId, query;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            postId = req.params.postId;
            _context5.prev = 1;
            _context5.next = 4;
            return _Post["default"].findByIdAndDelete(postId);

          case 4:
            query = _context5.sent;

            if (!query) {
              _context5.next = 9;
              break;
            }

            res.json({
              message: 'Post eliminado con éxito'
            });
            _context5.next = 10;
            break;

          case 9:
            return _context5.abrupt("return", res.status(404).json({
              message: 'Post no encontrado'
            }));

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = postCtrl;
exports["default"] = _default;
//# sourceMappingURL=post.controller.js.map