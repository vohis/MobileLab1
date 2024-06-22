// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-sass-transformer'),
    },
    resolver: {
      sourceExts: ['js', 'jsx', 'ts', 'tsx', 'scss', 'sass'],
    },
  };

module.exports = getDefaultConfig(__dirname);