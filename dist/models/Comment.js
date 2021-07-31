"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var commentSchema = new _mongoose.Schema({
  post: {
    ref: 'Post',
    type: _mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  },
  comment: {
    type: String
  },
  fechaCreacion: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Comment', commentSchema);

exports["default"] = _default;
//# sourceMappingURL=Comment.js.map