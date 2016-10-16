import Toggle from './toggle';//引入Toggle类


class ToggleMenu extends Toggle{
	/**
	  * Create a toggle menu
	  * @param {String|HTMLElement} rootEl - The menu container
	  * @param {Object} confit
	  ** @param {String|HTMLElement} config.target - Toggle target
	  ** @param {Boolean} config.bodyTogglable - Close menu when clicked on any part outside the `rootEl`
	  ** @param {String} config.hashNavClass - Anchor's classname inside `targetEl`.Used mainly for fragement identifier. Say, when a link pointing to a fragement idenfitier is clicked, you want the menu automatically closed rather than staying open. 

	  * eg:
	  	const menu = new ToggleMenu('.menu',{
			bodyTogglable:true,
			hashNavClass: 'menu-link'
		});
	*/
	 constructor(rootEl,config){
	 	
	 	///处理参数rootEl,使得其为一个HTMLElement
	 	//继承的只是类这个对象本身，所以constructor里面的指令并没有继承，所以得再写一遍
	 	if(!rootEl){//如果rootEl不存在，则返回
	 		return;
	 	} else if (!(rootEl instanceof HTMLElement)){//如果rootEl不是是HTMLElement，则就是一个querySelector字符串
	 		rootEl = document.querySelector(rootEl);
	 	}//eg的rootEl就是$('.menu')


	 	
	 	///创建、处理targetEl,以作为其super构造函数的参数
	 	const toggleEl = rootEl.querySelector('[data-o-component="o-toggle"]');//选择rootEl下面第一个属性data-o-component值为"o-toggle"的元素
	 	var targetEl = null;
	 	config = config ? config :{};
	 	if(!config.target){//如果config.target不存在，则将targetEl赋值为toggleEl的属性'data-o-toggle-target'的值
	 		targetEl = toggleEl.hasAttribute('data-o-toggle-target') ? toggleEl.getAttribute('data-o-toggle-target'):null;
	 	} else {
	 		targetEl = config.target;
	 	}

	 	if(!targetEl){
	 		return;
	 	}
	 	// At this point config.target could be either a String or an HTMLElement. Make sure it's an HTMLElement
	 	if(!(targetEl instanceof HTMLElement)){
	 		targetEl = rootEl.querySelector(targetEl);
	 	}

	 	super(toggleEl,{target:targetEl});//调用的是supper的constructor函数


	 	///`this` is not allowed before super()(原文注释)
	 	this.rootEl=rootEl;
	 	this.anchorClassName=config.bodyTogglable;

	   ///将this.方法绑定到这个类的实例本身上
	 	this.clickOnHash = this.clickOnHash.bind(this);
	 	this.clickOnbody = this.clickOnBody.bind(this);
	 	this.handleEsc = this.handleEsc.bind(this);

	 	if(config.hashNavClass){
	 		targetEl.addEventListener('click',this.clickOnHash);
	 	}

	 	if(config.bodyTogglable){
	 		document.body.addEventListener('click',this.clickOnBody);
	 	}

	 	document.body.addEventListener('keydown',this.handleEsc);
	 }

	 clickOnHash(e){
	 	if(this.state && e.target.classList.contains(this.anchorClassName)){//如果this.state为true且e.target.classList包含this.anchorClassName，即如果点击的target元素不具有menu-link的class且菜单是展开状态的
	 		this.toggle();//这个是继承自Toggle类的方法。
	 		// do not pass `e` to `toggle()`. You centainly do not want a link prevented.(参见toggle.js中Toggle.toggle()的写法)
	 	}
	 }
	 ///说明：node.contains( otherNode ) returns a Boolean value indicating whether a node is a descendant of a given node or not.


	 clickOnBody(e){
	 	if (this.state && !this.rootEl.contains(e.target)){//如果this.state为true且e.target不是this.rootEl的后代节点,即如果菜单是展开的且点击的target不是'.menu'元素下的
	 		this.toggle();
	 	}
	 }

	 handleEsc(e){
	 	if(this.state && e.keyCode === 27){//keyCode为27的键是esc
	 		this.toggle();
	 	}
	 }
}

export default ToggleMenu;