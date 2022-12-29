"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1["default"].Schema({
    publicAddress: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
}, { timestamps: true });
var User = mongoose_1["default"].model("User", UserSchema);
exports["default"] = User;
