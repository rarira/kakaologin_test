"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withAndroidKakaoLogin_1 = require("./android/withAndroidKakaoLogin");
const withIosKakaoLogin_1 = require("./ios/withIosKakaoLogin");
const withPlugins = (config, props) => {
    config = withIosKakaoLogin_1.withIosKakaoLogin(config, props);
    config = withAndroidKakaoLogin_1.withAndrodKakaoLogin(config, props);
    return config;
};
exports.default = withPlugins;
