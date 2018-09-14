
//////这里等待所有dom构建完成再调用
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
