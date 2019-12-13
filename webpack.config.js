const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

let config = {
	entry:{
		index:"./src/index.tsx",
	},
	devtool: "source-map",
	module:{
		rules:[
			{
				test:/\.tsx?$/,
				use:"ts-loader",
				exclude: /node_modules/
			},
		]
	},
	resolve:{
		extensions:[".tsx", ".ts", ".js"],
		alias:{
			assets: path.resolve(__dirname, "src/assets"),
			"@":path.resolve(__dirname, "src")
		}
	},
	output:{
		filename:"[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		port:8081,
		writeToDisk:true
	},	
	plugins:[
		new CopyPlugin([
			{from:path.resolve(__dirname, "public"), to:path.resolve(__dirname, "dist")}
		])
	]
}

module.exports = (env, args)=>{
	return config;
}