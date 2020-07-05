module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'auto',
          targets: {
            browsers: ['defaults'],
          },
          useBuiltIns: 'entry',
        },
      ],
      ['@babel/react'],
      ['@babel/preset-typescript'],
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
