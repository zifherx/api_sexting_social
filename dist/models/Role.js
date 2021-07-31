"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var roleSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Role', roleSchema);

exports["default"] = _default;
//# sourceMappingURL=Role.js.map