module.exports = {
	configureWebpack: {
		resolve: {
			alias: { // 别名
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}
	},
  devServer: {
      // host: '127.0.0.1', // 本地地址
      port: 8080, // 端口号
      open: true, // 配置项目在启动时自动在浏览器打开
      proxy: {
          '/silver-web-shop' : { // '/api'是代理标识，一般是每个接口前的相同部分
              target: "https://ym.191ec.com", // 请求地址，一般是服务器地址
              changeOrigin: true, // 是否进行跨域
              // pathRewrite: { // pathRewrite的作用是把请求接口中的 '/api'替换掉，一般是替换为空""
              //     '^/api':""
              // }
          }
      }
  }
}
