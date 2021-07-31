"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _role = _interopRequireDefault(require("../controllers/role.controller"));

var router = (0, _express.Router)();
router.get('/', _role["default"].getAll);
router.post('/', _role["default"].createRole);
router.get('/:roleId', _role["default"].getOne);
router.put('/:roleId', _role["default"].updateRole);
router["delete"]('/:roleId', _role["default"].deleteRole);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=role.routes.js.map