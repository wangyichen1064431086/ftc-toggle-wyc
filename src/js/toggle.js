class Toggle{
	/**
	  * Create a toggle instance
	  * @param {String | HTMLElement} toggleEl - The toggle button
	  * @param {Object} config
	  ** @param {String | HTMLElement} config.target - Toggle target. If not present, it will try to use `data-o-toggle-target` attribute on the `toggleEl`
	  */
	constructor(toggleEl,config){
		/**
		  *先处理两个参数：
		  *把参数一toggleEl处理为一个HTMLElement
		  *把参数二config通过toggleEl的属性填充
		  */

		if(!toggleEl){//如果toggleEl不存在，则返回
			return;
		}else if(!(toggleEl instanceof HTMLElement)){//如果toggleEl存在但不是HTMLElement，则将它作为选择器字符串使用querySelector选择
			toggleEl = document.querySelector(toggleEl);
		}


		if(!config){//如果config不存在，则通过元素的'data-o-toggle-xxx'开头的属性进行添加，得到config.xxx
			config = {};

			for(let i = 0;i < toggleEl.attributes.length;i++){//循环遍历该元素toggleEl的属性

				const attr = toggleEl.attributes[i];
				//因为每次循环都是不同的作用域，所以不同的作用域可以创建同名的const常量
				if(attr.name.indexOf('data-o-toggle') === 0){//如果attr属性的属性名是以'data-o-toggle'开始
					const key=attr.name.replace('data-o-toggle-','');//则去掉该属性明的'data-o-toggle-'部分，赋值给key值。eg:该属性名为'data-o-toggle-target'，则key为'target'
					try{
						config[key]=JSON.parse(attr.value.replace(/\'/g,'"'));//设置config的属性key的值为：属性attr的属性值,且将其的单引号'替换为双引号"---这句话好啰嗦，疑问：有必要这样写吗？
					}catch(e){
						config[key]=attr.value;
					}
				}
			}
		}


		/**
		  *为类的添加实例属性
		*/
		this.state = false;//属性state {boolean}

		this.targetEl = config.target;//属性targetEl
		if(!(this.targetEl instanceof HTMLElement)){
			this.targetEl = document.querySelector(this.targetEl);
		}
		this.targetEl.setAttribute('aria-hidden',!this.state);

		this.toggleEl = toggleEl;//属性toggleEl:就是参数toggleEl
		this.toggleEl.setAttribute('aria-expanded',this.state);

		this.toggle = this.toggle.bind(this);//将方法toggle强制绑定在类的实例上


		this.toggleEl.addEventListener('click',this.toggle);//为toggleEl绑定click事件处理程序toggle
		//如果没有上面的bind()那个处理，那么就会影响toggle()内部的this指向；那么可以用=>写的话，就是：this.toggleEl.addEventListener('click',()=>{this.state=...;this.target=...;})  这样就不会屏蔽里面的this，但是不能这样写()=>toggle

		this.toggleEl.setAttribute('data-o-toggle--js','true');//为toggleEl设置属性'data-o-toggle--js'
	}

	toggle(e){//按照toggle规律添加样式，并添加属性
		/** 
	    * 原生`toggle`方法 adds the class name and returns true if it not exists; returns false if it exists then removes it.
	    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList}
	    */
		e && e.preventDefault();
		this.state = this.targetEl.classList.toggle('o-toggle--active');//没有这个样式就添加，有这个样式就移除
		this.toggleEl.setAttribute('aria-expanded',this.state);
		this.targetEl.setAttribute('aria-hidden',!this.state);

	}

	destroy(){
		this.toggleEl.removeEventListener('click',this.toggle);//给元素移除click事件处理函数toggle
		this.toggleEl.removeAttribute('aria-expanded');//移除元素的属性
		this.toggleEl.removeAttribute('aria-hidden');
		this.targetEl = undefined;
		this.toggleEl = undefined;
	}

	static init(el,config){//用于把具有属性data-o-component="o-toggle"的所有元素，快速创建成Toggle实例，而不用手工一个个创建。
		if(!el){
			el=document.body;
		}else if(!(el instanceof HTMLElement)){
			el=document.querySelector(el);
		}

		const toggleEls=el.querySelectorAll('[data-o-component="o-toggle"]');//选择其下所有属性data-o-component为"o-toggle"的元素
		const toggles=[];

		for(let toggleEl of toggleEls){//for-of是ES6的循环。这里是将每一个toggleEl元素都创建为Toggle实例
			if(!toggleEl.hasAttribute('data-o-toggle--js')){//如果toggleEl不含属性'data-o-toggle--js'
				toggles.push(new Toggle(toggleEl,config));//创建toggle实例

			}
		}

		console.log(toggles);
		return toggles;
	}
	///说明：static的函数相当于在Toggle.prototype.init()它的实例不会具有这个方法，它只是类的方法
};

export default Toggle;//默认导出