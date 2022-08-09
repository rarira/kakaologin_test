import type { ConfigPlugin } from "@expo/config-plugins";
export interface KakaoLoginPluginProps {
    kakaoAppKey: string;
    overrideKakaoSDKVersion?: string;
    kotlinVersion?: string;
}
declare const withPlugins: ConfigPlugin<KakaoLoginPluginProps>;
export default withPlugins;
