/*
* 元素操作Element函数
*/

/**
 * @param {String} tagName  - 节点名（如div） Element's name
 * @param {Object} props    - 节点的属性（如class）Element's properties，using object to store key-value pair
 * @param {Array<Element|String>} - 子节点（如ul的li） This element's children elements.
 */
function Element(tagName = 'div', props = {}, children = []) {
    if (!(this instanceof Element)) {
        return new Element(tagName, props, children);
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    this.children.forEach((child) => {
        if (child instanceof Element) {
            count += child.count;
        }
        count++;
    });
    this.count = count;
}

/**
 * Render the hold element tree.
 * 根据DOM名调用源生的createElement创建真实DOM，将DOM的属性全都加到这个DOM元素上，
 * 如果有子元素继续递归调用创建子元素，并appendChild挂到该DOM元素上
 */
Element.prototype.render = function () {
  let el = document.createElement(this.tagName);
  let props = this.props;

  for (let propName in props) {
    let propValue = props[propName];
    _.setAttr(el, propName, propValue);
  }

  _.each(this.children, function (child) {
    let childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
};