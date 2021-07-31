"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _default = {
  SECRET: 'SOCIAL_NETWORK',
  // mongoURL: process.env.MONGO_URI_LOCAL
  mongoURL: process.env.MONGO_URI_ONLINE
};
exports["default"] = _default;
//# sourceMappingURL=config.js.map