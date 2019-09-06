# webpack 学习笔记
借鉴与 https://blog.csdn.net/w123452222/article/details/81394696

## 1.准备工作

mkdir config dist src

touch dist/index.html src/index.js

可以直接在终端中输入命令webpack 将当前的内容进行一个简单的打包
有两种打包环境，一个是开发环境：development另外一个是生产环境：production
打包的时候输入webpack --mode=development或者webpack --mode=production就不会出现警告提示了
webapck --mode=production命令打包，这个是代码压缩过的

touch config/webpack.dev.js

## 2. 基本的配置后

    "build" : "webpack --config=config/webpack.dev.js"

##
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
        filename : "[name].js"
    },
