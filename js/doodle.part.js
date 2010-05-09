
var current_color = Color.string2hex('black');
var brush_status  = 0;

function SaveImage () {
	var colors = '';
	var cells = 0;
	var height = 0;
	$('doodlebody').immediateDescendants().each( function(tr) {
		height++;
		tr.immediateDescendants().each( function(td) {
			cells++;
			bgcolor = td.style.backgroundColor;
			if ( bgcolor ) {
				bgcolor = bgcolor.replace('rgb(','').replace(')','');
				rgb = bgcolor.split(',');
				colors += Color.rgb2hex(rgb);
			}
			colors += ',';
		} );
	} );
	var width = cells/height;
	var form   = Builder.node('form',  { action: 'topng.pl', method: 'post' });
	var height = Builder.node('input', { type: 'hidden', name: 'height', value: height });
	var width  = Builder.node('input', { type: 'hidden', name: 'width',  value: width  });
	var colors = Builder.node('input', { type: 'hidden', name: 'colors', value: colors });
	form.appendChild(height);
	form.appendChild(width);
	form.appendChild(colors);
	document.body.appendChild(form);
	form.submit();
}



function ChangeCurrentColor (e) {
	/* from http://www.quirksmode.org/js/events_properties.html */
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	current_color = targ.style.backgroundColor;
}

function ChangePixelColor (e) {
	/* from http://www.quirksmode.org/js/events_properties.html */
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	if (brush_status==1)
		targ.style.backgroundColor=current_color;
}

function BrushOn(e){
	brush_status = 1;
}

function BrushOff(e){
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;

	if ( ( e.type == 'mouseup' ) || ( targ.tagName == "TABLE" ) ) 
		brush_status = 0;

/*
	if ( ['TR','TD'].include(targ.tagName) ) {
		// ONLY TURN BRUSH OFF WHEN LEAVING THE TABLE
	} else {
		brush_status = 0;
	}
*/
}
