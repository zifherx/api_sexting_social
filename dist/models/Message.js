"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var messageSchema = new _mongoose.Schema({
  userOrigin: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  },
  message: {
    type: String
  },
  userDestination: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  },
  fechaCreacion: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Message', messageSchema);

exports["default"] = _default;
//# sourceMappingURL=Message.js.map