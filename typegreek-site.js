// http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
function typegreek_addEvent(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else if(a.attachEvent){a["e"+b+c]=c;a[b+c]=function(){a["e"+b+c](window.event)};a.attachEvent("on"+b,a[b+c])}}
// http://simonwillison.net/2004/may/26/addloadevent/
function typegreek_addLoadEvent(a){var b=window.onload;if(typeof window.onload!="function"){window.onload=a}else{window.onload=function(){b();a()}}}
// http://www.dustindiaz.com/getelementsbyclass/
function typegreek_getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();

	if ( node == null )

		node = document;

	if ( tag == null )

		tag = '*';

	var els = node.getElementsByTagName(tag);

	var elsLen = els.length;

	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++) {

		if ( pattern.test(els[i].className) ) {

			classElements[j] = els[i];

			j++;

		}

	}

	return classElements;

}

function typegreek_init() {
	
	els = typegreek_getElementsByClass('typegreek');
	for(i=0; i<els.length; i++) {
		typegreek_addEvent(els[i],'keypress',testKeyPress);
		typegreek_addEvent(els[i],'keyup',testKeyUp);
		// add toggler
		//alert(els[i].getAttribute('data-typegreek-toggle'));
	}
	
}

//="return convertCharToggle(this, document.greek.convertGreek.checked , event);" onKeyUp="return convertStr( this, event );"
//el2 = document.getElementById('input');
	
function testKeyPress(e) {

	control = e.target;
	if (e.target==undefined) control = e.srcElement;
	
	typeLetter = convertCharToggle(control,true,e);

	if (!typeLetter) {
		if (window.event) {
			window.event.returnValue = null;
			event.keyCode=0;
		} else {
			e.preventDefault();
		}
	}

}

function testKeyUp(e) {
	control = e.target;
	if (e.target==undefined) control = e.srcElement;
	convertStr( control, e);
	return false;
}

typegreek_addLoadEvent(typegreek_init);