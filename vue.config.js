/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "./dist",
  publicPath: "/",
  assetsDir: "static",
  css: {
    extract: true,
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/styles/globally-loaded/color-palette.scss";
        @import "@/styles/globally-loaded/typography.scss";
        @import "@/styles/globally-loaded/layout.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: "http://localhost:2000/",
    hot: true,
  },
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ya?ml$/,
          loader: "yaml-loader",
        },
        {
          resourceQuery: /raw/,
          type: "asset/source",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(process.env.NODE_ENV === "production"),
        DEVELOPMENT: JSON.stringify(process.env.NODE_ENV === "development"),
      }),
      new webpack.ProvidePlugin({
        dayjs: "dayjs",
      }),
    ],
    resolve: {
      fallback: {
        url: false,
      },
    },
  },
});
