const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname,{isCSSEnabled:true});

  return withNativeWind({
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        '@/': './',
      },
    },
  }, {
    input: './global.css',
    inlineRem:16,
  });
})();
