function typegreek_addEvent(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else if(a.attachEvent){a["e"+b+c]=c;a[b+c]=function(){a["e"+b+c](window.event)};a.attachEvent("on"+b,a[b+c])}}                                                                 // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
function typegreek_addLoadEvent(a){var b=window.onload;if(typeof window.onload!="function"){window.onload=a}else{window.onload=function(){b();a()}}}                                                                                                                 // http://simonwillison.net/2004/may/26/addloadevent/
function typegreek_getElementsByClass(a,b,c){var d=new Array;if(b==null)b=document;if(c==null)c="*";var e=b.getElementsByTagName(c);var f=e.length;var g=new RegExp("(^|\\s)"+a+"(\\s|$)");for(i=0,j=0;i<f;i++){if(g.test(e[i].className)){d[j]=e[i];j++}}return d} // http://www.dustindiaz.com/getelementsbyclass/

function typegreek_init() {
	
	els = typegreek_getElementsByClass('typegreek');
	for(i=0; i<els.length; i++) {
		typegreek_addEvent(els[i],'keypress',typegreek_keypress);
		typegreek_addEvent(els[i],'keyup',typegreek_keyup);
		// add toggler
		//alert(els[i].getAttribute('data-typegreek-toggle'));
	}
	
}
	
function typegreek_keypress(e) {

	control = e.target; if (e.target==undefined) control = e.srcElement;
	typeLetter = typegreek_convertCharToggle(control,true,e);
	if (!typeLetter) {
		if (window.event) {
			window.event.returnValue = null;
			event.keyCode=0;
		} else {
			e.preventDefault();
		}
	}
}

function typegreek_keyup(e) {
	control = e.target; if (e.target==undefined) control = e.srcElement;
	typegreek_convertStr(control, e);
	return false;
}

typegreek_addLoadEvent(typegreek_init);