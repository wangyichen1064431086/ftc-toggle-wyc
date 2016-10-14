import Toggle,{ToggleMenu} from '../../main.js';

Toggle.init();//将符合条件的按钮元素创建为Toggle实例。等于对每个按钮元素执行了
/* new Toggle(buttonEl,{target:".toggle-target"});
 * 其中，buttonEl为[data-o-component="o-toggle"]的元素
*/

new Toggle('.toggle[data-o-component="o-toggle"]');//将第一个符合'.toggle'[data-o-component="o-toggle"]的按钮创建为Toggle实例。待确认：这句话应该可以不要吧？上面那句已经处理了所有按钮了。

const menu = new ToggleMenu('.menu',{
	autoCollapse:true,
	autoCollapseAnchor: 'menu-link'
});
console.log(menu);