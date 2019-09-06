const path = require('path')
const glob = require('glob');

const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require("purifycss-webpack");

module.exports = {
    // 模式
    mode : "development",
    // 入口配置
    entry:{
        main : "./src/main.js" , 
        main2 : "./src/main2.js" , 
    },
    // 出口文件
    output:{
        // 打包路径
        path : path.resolve(__dirname,"../dist"),
        // 打包文件名
        filename : "[name].js",
    },
    // 模块
    module:{
        rules:[
            // css
            {
                test : /\.css$/,
                use: [
                    extractTextPlugin.loader,
                    "css-loader"
                ],
                // css分离后这里需要重新配置，下面就注释了
                // use:[
                //     {loader: "style-loader"},   
                //     {loader:"css-loader"}
                // ]
            },
            // html中的img
            {
                test : /\.html$/i,
                use : [ 'html-withimg-loader' ]
            },
            //图片 loader
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        publicPath:"../image/",
                        outputPath:"image/"
                    }
                }]
            },
            //babel 配置
           {
            test:/\.(jsx|js)$/,
            use:['babel-loader'],
            exclude:/node_modules/
        }

        ]
    },
    // 插件
    plugins : [
        new uglify(),
        new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true, //removeAttrubuteQuotes是却掉属性的双引号。
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html', //是要打包的html模版路径和文件名称。
            inject: "body", // 1 body 将脚本放在body底部 head 放在头部
            title : "wang"
        }),
        new extractTextPlugin({
            filename:"./css/[name].css",
            chunkFilename:"[id].css"
        }),
        new PurifyCSSPlugin({ 
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
    ],
    // 配置webpack开发服务功能
    devServer:{
        // 设置基本目录结构
        contentBase : path.resolve(__dirname,'../dist'),
        // 服务器ip地址
        host:"localhost",
        // 服务器端压缩是否开启
        compress:true,
        // 服务端口号
        port:8888
    }
}
