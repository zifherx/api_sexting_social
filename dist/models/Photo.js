"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var photoSchema = new _mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  public_id: {
    type: String
  },
  urlImage: {
    type: String
  },
  fechaPublicacion: {
    type: Date,
    "default": Date.now
  },
  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Photo', photoSchema);

exports["default"] = _default;
//# sourceMappingURL=Photo.js.map