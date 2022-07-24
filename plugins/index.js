"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withIosKakaoLogin_1 = require("./ios/withIosKakaoLogin");
const withPlugins = (config, props) => {
    config = withIosKakaoLogin_1.withIosKakaoLogin(config, props);
    return config;
};
exports.default = withPlugins;
