import {
  ConfigPlugin,
  WarningAggregator,
  withAppDelegate,
  withInfoPlist,
} from "@expo/config-plugins";
import { KakaoLoginPluginProps } from "..";

const KAKAO_SCHEMES = ["kakaokompassauth", "storykompassauth", "kakaolink"];

const KAKAO_HEADER_IMPORT_STRING = "#import <RNKakaoLogins.h>";

const KAKAO_LINKING_STRING = `if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
  return [RNKakaoLogins handleOpenUrl: url];
}`;
const modifyInfoPlist: ConfigPlugin<KakaoLoginPluginProps> = (
  config,
  props
) => {
  return withInfoPlist(config, async (config) => {
    if (!config.modResults.KAKAO_APP_KEY) {
      config.modResults.KAKAO_APP_KEY = props.kakaoAppKey;
    }

    const NEW_URL_TYPES = `kakao${props.kakaoAppKey}`;

    if (!Array.isArray(config.modResults.CFBundleURLTypes)) {
      config.modResults.CFBundleURLTypes = [];
    }

    const urlType = config.modResults.CFBundleURLTypes.find((item) =>
      item.CFBundleURLSchemes.includes(NEW_URL_TYPES)
    );

    if (!urlType) {
      config.modResults.CFBundleURLTypes.push({
        CFBundleURLSchemes: [NEW_URL_TYPES],
      });
    }

    if (!Array.isArray(config.modResults.LSApplicationQueriesSchemes)) {
      config.modResults.LSApplicationQueriesSchemes = KAKAO_SCHEMES;
    } else {
      KAKAO_SCHEMES.forEach(
        (scheme) =>
          !config.modResults.LSApplicationQueriesSchemes?.includes(scheme) &&
          config.modResults.LSApplicationQueriesSchemes?.push(scheme)
      );
    }

    return config;
  });
};

const modifyAppDelegate: ConfigPlugin = (config) => {
  const modifyContents = (contents: string) => {
    if (!contents.includes(KAKAO_HEADER_IMPORT_STRING)) {
      contents = contents.replace(
        "#if",
        `
      ${KAKAO_HEADER_IMPORT_STRING}
      #if`
      );
      // contents = contents.replace(
      //   /^(?:[\s\S]*\n)?\#import.*(?:\r?\n|\r)/gm,
      //   `$&${KAKAO_HEADER_IMPORT_STRING}\n`
      // );
    }

    if (!contents.includes(KAKAO_LINKING_STRING))
      contents = contents.replace(
        "options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {",
        `options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
      ${KAKAO_LINKING_STRING}`
      );
    return contents;
  };

  return withAppDelegate(config, (config) => {
    if (["objc", "objcpp"].includes(config.modResults.language)) {
      config.modResults.contents = modifyContents(config.modResults.contents);
    } else {
      WarningAggregator.addWarningIOS(
        "withFacebook",
        "Swift AppDelegate files are not supported yet."
      );
    }
    return config;
  });
};

export const withIosKakaoLogin: ConfigPlugin<KakaoLoginPluginProps> = (
  config,
  props
) => {
  config = modifyInfoPlist(config, props);
  config = modifyAppDelegate(config);

  return config;
};
