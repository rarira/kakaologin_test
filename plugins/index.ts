import type { ConfigPlugin } from "@expo/config-plugins";

module.exports = function withPlugins(
  config: ConfigPlugin,
  props: any
): ConfigPlugin {
  return config;
};
