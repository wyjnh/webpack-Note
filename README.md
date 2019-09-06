# webpack 学习笔记
借鉴与 https://blog.csdn.net/w123452222/article/details/81394696

## 1.准备工作

mkdir config dist src
touch dist/index.html src/index.js

终端命令 webpack 将当前的内容进行一个简单的打包

两种打包环境  开发环境 development || 生产环境：production
webpack --mode=development 或者 webpack --mode=production 这个是代码压缩过的

touch config/webpack.dev.js

## 2. 基本的配置后

    "build" : "webpack --config=config/webpack.dev.js"

## 多入口配置
(```)
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
(```)

## devServer配置

## CSS文件打包配置

npm install style-loader css-loader --save-dev 

## JS压缩
uglifyjs-webpack-plugin

## 打包HTML文件
npm install html-webpack-plugin --save-dev

## 处理CSS中的图片信息
npm install file-loader url-loader --save-dev

file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

## 将CSS在JS中分离出来

npm install mini-css-extract-plugin --save-dev

改完css分离，记住还要将图片输出路径修改下，否则出现出现路径加载错误

## 加载HTML中写的img标签

npm install html-withimg-loader --save-dev

## .babelrc配置

npm install babel-loader --save-dev  但是babel-loader需要babel-core,所以还要下载

npm install babel-core --save-dev

官方推荐使用的是babel-preset-env  所以去下载 npm install babel-preset-env  --save-dev

