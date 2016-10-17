# WebPack+React.Js+BootStrap 实现进制转换工具 

## 一.WebPack入门

### 1.WebPack简介

>WebPack是模块打包机：分析项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。


![](file:///C:/Users/Administrator/Desktop/webpack_1.PNG)

### 2.如何使用WebPack

1. 安装:
	
	(1)全局安装:
		
		npm install -g webpack

	(2)安装到项目中:
		
		npm install --save-dev webpack

2. 配置使用:
	
	(1)项目的目录结构:

	![](file:///C:/Users/Administrator/Desktop/file_directory.PNG)

	(2)目录解析:
	
>在项目目录中创建两个文件夹，一个是app,另一个是public.接着再创建一个文件index.html放置在public中。public用于放置页面的入口文件，app用来放置js文件。

	(3)WebPack的配置文件:
	
	webpack.config.js:

		module.exports = {
			entry:  __dirname + "/app/main.js",//唯一入口文件
			output: {
				path: __dirname + "/public",//打包后文件bundle.js存放的地方
				filename: "bundle.js"//打包后输出文件的文件名
			}
		}

3. 生成Source Maps（使调试更容易）

	(1)Source Maps是Webpack在打包时可以为我们生成的source maps，为我们提供了一种对应编译		文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。在webpack的配置文件中配置		source maps，需要配置devtool

	(2)devetool配置选项优缺点
	![](file:///C:/Users/Administrator/Desktop/devetool.PNG)

	*上述选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的构建速度的后果		就是对打包后的文件的的执行有一定影响。*

	(3)WebPack的配置文件:

	webpack.config.js:

		module.exports = {
			devetool:'eval-source-map',//配置Source Maps选项,选择合适的选项
			entry:  __dirname + "/app/main.js",//唯一入口文件
			output: {
				path: __dirname + "/public",//打包后文件bundle.js存放的地方
				filename: "bundle.js"//打包后输出文件的文件名
			}
		}

### 3.使用webpack-server实时监测代码并刷新

1. 安装:
		
		npm install --save-dev webpack-dev-server

2. WebPack的配置文件

	webpack.config.js:

		module.exports = {
			devetool:'eval-source-map',//配置Source Maps选项,选择合适的选项
			entry:  __dirname + "/app/main.js",//唯一入口文件
			output: {
				path: __dirname + "/public",//打包后文件bundle.js存放的地方
				filename: "bundle.js"//打包后输出文件的文件名
			}

			devServer: {
				port: 8080,//设置服务器监听的端口，默认是8080
    		contentBase: "./public",//本地服务器所加载的页面所在的目录
    		colors: true,//终端中输出结果是否为彩色
    		historyApiFallback: true,//是否使用不跳转，一般是在开发单页面应用比较有优势
    		inline: true//是否开启实时刷新
  		}
		}

### 4.使用Loaders处理加载文件

1. 安装:

		npm install --save-dev json-loader

2. 配置文件(webpack.config.js):

		module.exports = {
			devtool: 'eval-source-map',
			entry:  __dirname + "/app/main.js",
				path: __dirname + "/public",
    		filename: "bundle.js"
			},

			module: {//在配置文件里添加JSON loader
    		loaders: [
					{
        		test: /\.json$/,//匹配.json类型的文件
        		loader: "json"
					}
    		]
			},
  		
			devServer: {
    		contentBase: "./public",
    		colors: true,
    		historyApiFallback: true,
    		inline: true
			}
		}

	*这样一来，就可以通过在js文件代码中引入json格式的文件。*

		import config from './config.json'
		console.log(config.text);

### 5.使用Babel转换JavaScript语言标准

1. 安装:

		//一次性安装多个模块
		npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
		npm install --save react react-dom 

2. 简介Babel:

	*个人用途是用来解析Es6的语法格式还有JSX的语法，转换后使得浏览器能够使用*

3. 配置文件(webpack.config.js):

>test: 一个匹配loaders所处理的文件的拓展名的正则表达式(required)

>loader: loader的名称(required)

>include/exclude: 手动添加必须处理的文件(文件夹)或屏蔽不需要处理的文件(文件夹)(optional)

>query: 为loaders提供额外的设置选项(optional)

		module.exports = {
			devtool: 'eval-source-map',
			entry:  __dirname + "/app/main.js",
				path: __dirname + "/public",
    		filename: "bundle.js"
			},

			module: {//在配置文件里添加JSON loader
    		loaders: [
					{
        		test: /\.json$/,//匹配.json类型的文件
        		loader: "json"
					},
					{
        		test: /\.js$/,//匹配.js文件
        		exclude: /node_modules/,//排除哪个文件不加载
        		loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        		query: {
          		presets: ['es2015','react']
        		}
					}
    		]
			},
  		
			devServer: {
    		contentBase: "./public",
    		colors: true,
    		historyApiFallback: true,
    		inline: true
			}
		}

## 二.React.Js实现进制转换工具

### 1.HTML主界面实现
	
*搭建好React的工具平台之后我们就可以实现工具的制作了^_^*

>HTML节目十分简单，里面就只有一个div容器，还有一个使用bootstrap用来装饰的导航栏，如此而已。让我们看一下代码吧！

index.html:


	<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
			<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
			<title>在线进制转换工具</title>
		</head>

		<body>
			<nav class="container-fluid navbar-inverse" role="navigation">
				<div class="container">
					<h3 class="navbar-text">进制转换工具</h3>
				</div>
			</nav>
			<div id='root'></div>
			<script src="bundle.js"></script>
		</body>
	</html>

### 2.React组件实现

1.定义两个React子组件(InputNumber.js,OutputNumber.js)，用来后面的视图调用

*先给出代码吧！*

(1) InputNumber.js:

	import React, { Component } from 'react'
	import {
	  Grid,
	  Row,
	  Col,
	  FormControl,
	  ControlLabel,
	  FormGroup,
	  Radio,
	  InputGroup,
	} from 'react-bootstrap'
	
	class InputNumber extends React.Component {
	  constructor(props) {
	    super(props);
	    var checkedList = [false, false, false];
	    checkedList[this.props.checked] = true;
	    this.state = {
	      checkedList: checkedList,
	      number: this.props.number
	    }
	  }
	  selectHandleChange(event) {
	    var checkedList = [false, false, false];
	    checkedList[event.target.value] = true;
	    this.setState({
	      checkedList: checkedList
	    });
	    this.props.callbackCheckedChange(event.target.value);
	  }
	  textHandleChange(event) {
	    this.setState({
	      number: event.target.value
	    });
	    this.props.callbackNumberChange(event.target.value);
	  }
	  render() {
	    return (
	      <Grid>
	        <FormGroup>
	          <Radio inline name="binary" value="0" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[0]} >二进制</Radio>
	          <Radio inline name="decimal" value="1" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[1]} >十进制</Radio>
	          <Radio inline name="hexadecimal" value="2" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[2]} >十六进制</Radio>
	        </FormGroup>
	        <FormGroup>
	          <InputGroup>
	            <InputGroup.Addon>请输入：</InputGroup.Addon>
	            <FormControl type="text" name="text" value={this.state.number} onChange={this.textHandleChange.bind(this)} />
	          </InputGroup>
	        </FormGroup>
	      </Grid>
	    );
	  }
	}
	
	export default InputNumber;

*在上面的代码中需要关注的地方有:*

>该组件是用于用户输入数值后传递数值的类型和大小到父级组件中，所以其内部需要有两个属性，checkedList和number。checkedList用来标识当前哪个radio选项框被选中，并当点击事件发生时，把value的值进行动态设置，主要是用到了React的组件状态机，通过setState函数对checkedList进行修改。number的作用是获取用户输入的数据，当输入框的值发生改变时，对应的事件响应会被调用也就是textHandleChange函数，其对number进行了设置，并内部有回调函数:this.props.callbackCheckedChange(event.target.value)告诉父级组件有属性发生变化。这样就使得当前组件的状态改变时，父级的组件也会对应调用方法进行事件处理。


(2) OutputNumber.js:

	import React, { Component } from 'react'
	import {
	  Grid,
	  Row,
	  Col,
	  FormControl,
	  ControlLabel,
	  FormGroup,
	  InputGroup,
	} from 'react-bootstrap'
	
	class OutputNumber extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      binaryRes: "",
	      decimal: "",
	      hexadecimal: "",
	      mapBase:[2,10,16]
	    }
	  }
	  changeToDec(numbers, base) {
	    var sum = 0;
	    var length = numbers.length
	    for (let i = 0; i < length; i++) {
	      let number = parseInt(numbers[i]);
	      sum += Math.pow(base, length - i - 1) * number;
	    }
	    return sum.toString();
	  }
	  //十进制转换其他进制
	  decChange(numbers, base) {
	    var num = parseInt(numbers);
	    var str = '';
	    var k = parseInt(num);
	    var m = num % base;
	    while (k >= base) {
	      if(m > 9)
	        str = String.fromCharCode(0x40 + (m - 9)) + str;
	      else
	        str = m.toString() + str;
	      k = parseInt(k / base);
	      m = k % base;
	    }
	    if(m > 9)
	      str = String.fromCharCode(0x40 + (m - 9)) + str;
	    else
	      str = m.toString() + str;
	    return str;
	  }
	  componentWillReceiveProps(nextProps) {
	    var base = this.state.mapBase[nextProps.checked];
	    var numberDec = this.changeToDec(nextProps.number,base);
	    this.setState({
	      binaryRes:this.decChange(numberDec,2),
	      decimal:this.decChange(numberDec,10),
	      hexadecimal:this.decChange(numberDec,16)
	    });
	  }
	  render() {
	    return (
	      <Grid>
	        <FormGroup>
	          <InputGroup>
	            <InputGroup.Addon>二进制：</InputGroup.Addon>
	            <FormControl type="text" name="binary" value={this.state.binaryRes} />
	          </InputGroup>
	          <InputGroup>
	            <InputGroup.Addon>十进制：</InputGroup.Addon>
	            <FormControl type="text" name="decimal" value={this.state.decimal} />
	          </InputGroup>
	          <InputGroup>
	            <InputGroup.Addon>十六制：</InputGroup.Addon>
	            <FormControl type="text" name="hexadecimal" value={this.state.hexadecimal} />
	          </InputGroup>
	        </FormGroup>
	      </Grid>
	    )
	  }
	}
	
	
	export default OutputNumber;

>这个组件是用来对用户输入的类型数据进行进制转换并呈现结果，所以需要binaryRes,decimal,hexadecimal这三个属性来呈现不同类型进制的结果，通过changeToDec和decChange这两个函数对数值进行转换得到结果。可是，我们要在什么时候调用这两个函数进行进制转换呢?这时就需要使用componentWillReceiveProps(nextProps)函数，当父级组件传递进来的元素发生改变时，这个方法会被调用。于是我们就在这个函数中调用进制转换的函数并把结果呈现出来，这样就实现了数据的传递功能了。


2.定义一个React父级组件用来封装两个子组件(MainView.js)，用来给入口文件调用

*代码实现*

	MainView.js:
	
	import React from 'react';
	import InputNumber from './InputNumber'
	import OutputNumber from './OutputNumber'
	
	
	class MainView extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      checked: 0,
	      number: ""
	    }
	  }
	  onCheckedChange(newChecked) {
	    this.setState({
	      checked: newChecked,
	    });
	  }
	  onNumberChange(newNumber) {
	    this.setState({
	      number: newNumber
	    });
	  }
	  render() {
	    return (
	      <div>
	        <InputNumber checked={this.state.checked}
	          number={this.state.number}
	          callbackCheckedChange={this.onCheckedChange.bind(this)}
	          callbackNumberChange={this.onNumberChange.bind(this)} />
	        <OutputNumber number={this.state.number} 
	          checked={this.state.checked}/>
	      </div>
	    );
	  }
	}
	
	export default MainView;

>这个组件是父级组件，封装了前面的两个组件，并把其内部的属性统一传递给两个子组件，使得数据进行了单向的绑定。



3.定义一个入口文件main.js用来向页面渲染React组件

*代码实现*

main.js:
	
	import React from 'react';
	import {render} from 'react-dom';
	
	import MainView from './MainView'
	
	var checked = 0;
	
	render(<MainView/>,document.getElementById('root'));    

>这代码不同多说，就是渲染主视图到虚拟DOM的树结构中。


## 三.总结

>一开始看来React的基本用法但是没有经过实际的操作会以为React很简单，但是当你动手打出代码的时候，你会发现很多的问题。这时候就需要我们一步一步地去查资料探索，找到解决的方案并实现。所以我写这篇文章的目的是为了让更多React初学者能够参考并把React学得透彻，我对React也是刚开始入门，还不是很熟练，希望做出更多的东西，写出更多的总结不断提升自己的编程能力，哈哈哈，感谢阅读此文。

>最后附上程序github的仓库链接










	




	

			