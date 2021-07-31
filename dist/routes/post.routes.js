"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _post = _interopRequireDefault(require("../controllers/post.controller"));

var router = (0, _express.Router)();
router.get('/', _post["default"].getAll);
router.get('/:postId', _post["default"].getOneById);
router.post('/by-user', _post["default"].getAllByUser);
router.post('/', _post["default"].createPost);
router["delete"]('/:postId', _post["default"].deletePost);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=post.routes.js.map