"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.routes"));

var _role = _interopRequireDefault(require("./role.routes"));

var _user = _interopRequireDefault(require("./user.routes"));

var _post = _interopRequireDefault(require("./post.routes"));

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.send('Bienvenido al API Social');
});
router.use('/users', _user["default"]);
router.use('/roles', _role["default"]);
router.use('/auth', _auth["default"]);
router.use('/posts', _post["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map