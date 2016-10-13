import Toggle from './toggle';


class ToggleMenu extends Toggle{
	/**
	  * Create a toggle menu
	  * @param {String|HTMLElement} rootEl - The menu container
	  * @param {Object} confit
	  ** @param {String|HTMLElement} config.target - Toggle target
	  ** @param {Boolean} config.autoCollapse - Close menu when clicked on any part outside the `rootEl`
	  ** @param {String} config.autoCollapseAnchor - Anchor's classname inside `targetEl`.
	*/
	 constructor(rootEl,config){
	 	
	 	///处理参数rootEl,使得其为一个HTMLElement
	 	if(!rootEl){//继承的只是类这个对象本身，所以constructor里面的指令并没有继承，所以得再写一遍
	 		return;
	 	} else if (!(rootEl instanceof HTMLElement)){
	 		rootEl = document.querySelector(rootEl);
	 	}


	 	
	 	///创建、处理config.target,以作为其super的构造函数的参数
	 	const toggleEl = rootEl.querySelector('[data-o-component="o-toggle"]');
	 	var targetEl = null;
	 	config = config ? config :{};
	 	if(!config.target){//如果config.target不存在，则将toggleEl的属性'data-o-toggle-target'的值赋给targetEl
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

	 	//`this` is not allowed before super()
	 	this.rootEl=rootEl;
	 	this.anchorClassName=config.autoCollapseAnchor;

	 	this.anchorClick = this.anchorClick.bind(this);
	 	this.bodyClick = this.bodyClick.bind(this);
	 	this.handleEsc = this.handleEsc.bind(this);

	 	if(config.autoCollapseAnchor){
	 		targetEl.addEventListener('click',this.anthorClick);
	 	}

	 	if(config.autoCollapse){
	 		document.body.addEventListener('click',this.bodyClick);
	 	}

	 	document.body.addEventListener('keydown',this.handleEsc);
	 }

	 anchorClick(e){
	 	if(this.state && e.target.classList.contains(this.anchorClassName)){//如果this.anchorClassName是e.target.classList的后代节点
	 		this.toggle();
	 	}
	 }
	 ///说明：node.contains( otherNode ) returns a Boolean value indicating whether a node is a descendant of a given node or not.


	 bodyClick(e){
	 	if (this.state && !this.rootEl.contains(e.target)){//如果e.target不是this.rootEl的后代节点
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