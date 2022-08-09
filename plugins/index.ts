import { withAndrodKakaoLogin } from "./android/withAndroidKakaoLogin";
import { withIosKakaoLogin } from "./ios/withIosKakaoLogin";
import type { ConfigPlugin } from "@expo/config-plugins";

export interface KakaoLoginPluginProps {
  kakaoAppKey: string;
  overrideKakaoSDKVersion?: string;
  kotlinVersion?: string;
}

const withPlugins: ConfigPlugin<KakaoLoginPluginProps> = (config, props) => {
  config = withIosKakaoLogin(config, props);
  config = withAndrodKakaoLogin(config, props);
  return config;
};

export default withPlugins;
