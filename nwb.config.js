module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "y",
      externals: {
        react: "React"
      }
    }
  },
  webpack: {
    rules: {
      svg: {
        loader: "svg-inline-loader",
        options: { classPrefix: true }
      },
      "sass-css": {
        modules: true,
        localIdentName: "[name]__[local]__[hash:base64:5]"
      }
    },
  }
};
