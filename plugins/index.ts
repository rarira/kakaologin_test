import { withIosKakaoLogin } from "./ios/withIosKakaoLogin";
import type { ConfigPlugin } from "@expo/config-plugins";

export interface KakaoLoginPluginProps {
  kakaoAppKey: string;
  overrideKakaoSDKVersion?: string;
}

const withPlugins: ConfigPlugin<KakaoLoginPluginProps> = (config, props) => {
  config = withIosKakaoLogin(config, props);
  return config;
};

export default withPlugins;
