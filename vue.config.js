const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require('webpack');

module.exports = defineConfig({
	publicPath: process.env.NODE_ENV === 'production' ? "HarbergerTaxUI" : "/",
	transpileDependencies: true,
	configureWebpack: {
		plugins: [			
			new NodePolyfillPlugin(),
		],
		module: {
			rules: [{
				test: /\.md$/i,
				use: 'raw-loader',
			},
			],			
		}
	},
})
css: {
	loaderOptions: {
		sass: {
			additionalData: bootstrapSassAbstractsImports.join('\n')
		}
		scss: {
			additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
		}
	}
}