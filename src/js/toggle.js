class Toggle{
	constructor(toggleEl,config){
		if(!toggleEl){
			return;
		}else if(!(toggleEl instanceof HTMLElement)){
			toggleEl = document.querySelector(toggleEl);
		}

		if(!config){
			config = {};

			for(let i = 0;i < toggleEl.attributes.length;i++){
				const attr = toggleEl.attributes[i];//因为每次循环都是不同的作用域，所以不同的作用域可以创建同名的const常量
				if(attr.name.indexOf('data-o-toggle') === 0){
					const key=attr.name.replace('data-o-toggle-','');
					try{
						config[key]=JSON.parse(attr.value.replace(/\'/g,'"'));//把属性名key对应的属性值的单引号'替换为双引号"
					}catch(e){
						config[key]=attr.value;
					}
				}
			}
		}

		this.state = false;

		this.targetEl = config.target;

		if(!(this.targetEl instanceof HTMLElement)){
			this.targetEl = document.querySelector(this.targetEl);
		}
		this.targetEl.setAttribute('aria-hidden',!this.state);

		this.toggleEl = toggleEl;

		this.toggleEl.setAttribute('aria-expanded',this.state);
		this.toggle = this.toggle.bind(this);

		this.toggleEl.addEventListener('click',this.toggle);

		this.toggleEl.setAttribute('data-o-toggle--js','true');
	}

	toggle(e){
		/** 
	    * `toggle` adds the class name and returns true if it not exists; returns false if it exists then removes it.
	    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList}
	    */
		e && e.preventDefault();
		this.state = this.targetEl.classList.toggle('o-toggle--active');//没有这个样式就添加，有这个样式就移除
		this.toggleEl.setAttribute('aria-expanded',this.state);
		this.targetEl.setAttribute('aria-hidden',!this.state);

	}

	destroy(){
		this.toggleEl.removeEventListener('click',this.toggle);//给元素移除click事件处理函数toggle
		this.toggleEl.removeAttribute('aria-expanded');
		this.toggleEl.removeAttribute('aria-hidden');
		this.targetEl = undefined;
		this.toggleEl = undefined;
	}
}