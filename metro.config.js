const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

// Bloque les composants natifs de démo de React Native (⚠️ pas web-friendly)
config.resolver.blockList = exclusionList([
  /react-native\/Libraries\/NewAppScreen\/.*/,
]);

module.exports = config;
