"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var postSchema = new _mongoose.Schema({
  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  },
  texto: {
    type: String
  },
  image: [{
    ref: 'Photo',
    type: _mongoose.Schema.Types.ObjectId
  }],
  // comments: [{ ref: 'Comment', type: Schema.Types.ObjectId }],
  views: {
    type: Number,
    "default": 0
  },
  likes: {
    type: Number,
    "default": 0
  },
  fechaCreacion: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Post', postSchema);

exports["default"] = _default;
//# sourceMappingURL=Post.js.map