const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  // devServer: {
  //   host: "127.0.0.1",
  //   port: 3000,
  //   client: {
  //     webSocketURL: "ws://127.0.0.1/ws",
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // },
});
