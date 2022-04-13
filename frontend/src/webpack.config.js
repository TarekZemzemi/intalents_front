module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'resolve-url-loader',
            options: { removeCR: true },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- !!IMPORTANT!!
            }
          }
        ]
      },
    ]
  },
};
