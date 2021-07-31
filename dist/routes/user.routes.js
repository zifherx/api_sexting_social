"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var router = (0, _express.Router)();
router.get('/', _user["default"].getAll);
router.post('/', _user["default"].createUser);
router.get('/:userId', _user["default"].getOne);
router.put('/:userId', _user["default"].updateUser);
router.patch('/update-profile', _multer["default"].single('image'), _user["default"].updateProfile);
router["delete"]('/:userId', _user["default"].deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.routes.js.map