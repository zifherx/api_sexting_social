"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _uuid = require("uuid");

var _path = _interopRequireDefault(require("path"));

var storage = _multer["default"].diskStorage({
  destination: 'uploads',
  filename: function filename(req, file, cb) {
    cb(null, (0, _uuid.v4)() + _path["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
var _default = upload;
exports["default"] = _default;
//# sourceMappingURL=multer.js.map