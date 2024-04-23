const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: "../src/main/resources/static", // 빌드 타겟 디렉토리
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080", // '/api'로 들어오면 포트 8080(스프링 서버)로 보낸다.
        changeOrigin: true, // cross origin 허용
      },
    },
  },
});
