/**
 * @author WC 2019/07/17
 * @version V1.0.1
 * @description es6静态模板加载
 * 
 */
(function(factory){
	var temple = factory().build();
	temple.load('temple-load');	
	
}(function(){
	class MyTemple extends HTMLElement{
		get url(){
			return this.getAttribute('url');
		}
		set url(val){
			this.setAttribute('url', val);
		}
		get type(){
			return this.getAttribute('type');
		}
		set type(val){
			this.setAttribute('type', val);
		}
	}
	return {
		build : function (){
			window.customElements.define('temple-load', MyTemple);
			
			function reder(tagName){
				Array
					.from(document.getElementsByTagName(tagName))
					.forEach(templeLoadHandler);
			}
			
			function templeLoadHandler(element){
				element.style.display = 'block';
				var zurl = element.url;
				var type = element.type;
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', zurl + '.ht', false);
				xhr.onreadystatechange = function(data){
					if(xhr.readyState === 4 && xhr.status === 200){
						var text = xhr.responseText;
						if('1' === type){
							text = '<xmp>'+text+'</xmp>';
						}
						if('2' === type){
							text = '<xmp>'+text+'</xmp>';
						}
				    	element.innerHTML = text;
					}
				}
				xhr.send();		
			}
			
			return {
				load: reder
			}
		}
	}
}))



