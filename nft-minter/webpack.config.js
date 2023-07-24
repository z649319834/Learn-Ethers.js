module.exports = {
  module: {
    loaders: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loaders: "babel-loader",
        query: {
          presets: [
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
    ],
  },
}
