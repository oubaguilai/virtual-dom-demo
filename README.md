# virtual-dom-demo
#### This is virtual dom demo

# 介绍
一直在用Vue进行项目开发，很好奇这框架是怎么做到数据和视图之间的快速响应绑定的，因为如果是单纯的dom操作是很耗费性能的，所以在一番搜索之后才发现是用了一种"虚拟dom"的思路，就是用js去模拟dom,监听变化，最后再讲改变的dom整个的更新到dom树上。
这里推荐两篇写的很好的博客，我的很多代码就是从中copy简化的，然后用原始的js代码重新实现了一遍。这里将所有的关注点放在虚拟dom上，所以就不用打包工具了。
#### [Livoras---simple-virtual-dom](https://github.com/livoras/blog/issues/13)
#### [张歆琳---虚拟DOM介绍](https://www.jianshu.com/p/616999666920)

## 实现思路
```
	1. 数据 => 视图 初始化
		1.1构建虚拟DOM
		var tree = el('div', {'id': 'container'}, [
		    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
		    el('p', ['Hello, virtual-dom']),
		    el('ul', [el('li')])
		]);

		1.2通过虚拟DOM构建真正的DOM
		var root = tree.render();
		document.body.appendChild(root);

	3. 数据更新，生成新的虚拟DOM
	var newTree = el('div', {'id': 'container'}, [
	    el('h1', {style: 'color: red'}, ['simple virtal dom']),
	    el('p', ['Hello, virtual-dom']),
	    el('ul', [el('li'), el('li')])
	]);

	4. 比较两棵虚拟DOM树的不同
	var patches = diff(tree, newTree)

	5. 在真正的DOM元素上应用变更
	patch(root, patches)
```
# 虚拟dom实现方法

## index.html的代码
```<!DOCTYPE html>
	<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
		    <title>virtual dom demo</title>
		    <link rel="stylesheet" type="text/css" href="./css/index.css" >
		</head>
		<body onload="init()">
			<div class="header">
				<h1>虚拟dom实现方法</h1>
			</div>
			<div id="virtualdom">	
			</div>
		    <script src="./lib/util.js"></script>
		    <script src="./lib/diff.js"></script>	    
		    <script src="./lib/element.js"></script>	    
		    <script src="./lib/patch.js"></script>	    
		    <script src="./index.js"></script>
		</body>
	</html>
```

## index.js中的代码
``` //////这里等待所有dom构建完成再调用
	function init(argument) {
		// 1. 构建虚拟DOM
		const tree = Element('div', { id: 'app' }, [
		    Element('ul', {class: 'list' }, [
		        Element('li', { class: 'item' }, ['第一步：用JS对象模拟DOM树']),
		        Element('li', { class: 'item' }, ['第二步：比较两棵虚拟DOM树的差异']),
		        Element('li', { class: 'item' }, ['第三步：把差异应用到真正的DOM树上']),
		    ]),
		]);

		// 2. 通过虚拟DOM构建真正的DOM
		const root = tree.render();
		document.getElementById('virtualdom').appendChild(root);

		// 3. 生成新的虚拟DOM
		const newTree = Element('div', { id: 'app' }, [
		    Element('ul', {class: 'list' }, [
		        Element('li', { class: 'item' }, ['第一步：用JS对象模拟DOM树']),
		        Element('li', { class: 'item' }, ['第二步：比较两棵虚拟DOM树的差异']),
		        Element('li', { class: 'item' }, ['第三步：把差异应用到真正的DOM树上']),
		        Element('li', { class: 'item' }, ['新目录树1：1把差异应用到真正的DOM树上']),
		        Element('p', { class: 'item' }, ['新目录树2：2把差异应用到真正的DOM树上']),
		    ]),
		]);

		// 4. 比较两棵虚拟DOM树的不同
		var patches = diff(tree, newTree);

		// 5. 在真正的DOM元素上应用变更
		patch(root, patches);	
	}
```
## 详细的核心代码请看lib中的 
``` util.js  /////基础操作工具
	diff.js  /////比较dom树不同的算法 ***核心
	element.js  /////虚拟dom创建函数
	patch.js   ////虚拟dom挂载到真正的dom
```