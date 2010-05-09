
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
			bgcolor = td.getStyle('background-color')||'';
			//bgcolor = td.style.backgroundColor||'';
			//	Firefox returns rgb(RR,GG,BB)
			//	IE returns #RRGGBB
			if ( bgcolor ) {
				if ( bgcolor.match('rgb') ) {
					bgcolor = bgcolor.replace('rgb(','').replace(')','');
					rgb = bgcolor.split(',');
					colors += Color.rgb2hex(rgb);
				} else {
					colors += bgcolor;
				}
			}
			colors += ',';
		} );
	} );
	var width = cells/height;
	var form   = Builder.node('form',  { action: 'topng.pl', method: 'post' });
	var iheight = Builder.node('input', { type: 'hidden', name: 'height', value: height });
	var iwidth  = Builder.node('input', { type: 'hidden', name: 'width',  value: width  });
	var icolors = Builder.node('input', { type: 'hidden', name: 'colors', value: colors });
	form.appendChild(iheight);
	form.appendChild(iwidth);
	form.appendChild(icolors);
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
	$('cur_color').style.backgroundColor=current_color;
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

function CreatePallet() {
	var rows = 8;
	var cols = 2;

	var table = Builder.node('table', { id: 'pallet', border: 1, cellpadding: 1, cellspacing: 1 });
	var tbody = Builder.node('tbody');

	var cctd = Builder.node('td', { id: 'cur_color', colSpan: '2' } );
	cctd.style.backgroundColor = current_color;
	var cctr = Builder.node('tr');
	cctr.style.backgroundImage = 'url(transparent.png)';
	cctr.appendChild( cctd );
	tbody.appendChild( cctr );

	$R(1,rows).each( function(row){
		var tr = Builder.node('tr');
		$R(1,cols).each( function(col){
			var td = Builder.node('td');
			td.style.backgroundColor = Color.basic16hex((row-1)+((rows)*(col-1)));
			Event.observe(td, 'click', ChangeCurrentColor );
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});

	var trtd = Builder.node('td', { id: 'eraser', colSpan: '2' } );
	Event.observe(trtd, 'click', ChangeCurrentColor );
	var trtr = Builder.node('tr');
	trtr.style.backgroundImage = 'url(transparent.png)';
	trtr.appendChild( trtd );
	tbody.appendChild( trtr );

	var tdsa = Builder.node('td', { colSpan: '2' },"Save");
	Event.observe(tdsa, 'click', SaveImage );
	var trsa = Builder.node('tr');
	trsa.appendChild( tdsa );
	tbody.appendChild( trsa );
	table.appendChild(tbody);
	$('content').appendChild(table);
}

function CreateDoodle(cols,rows) {

	var table = Builder.node('table', { id: 'doodle', cellpadding: 0, cellspacing: 0 });
	table.style.backgroundImage = 'url(transparent.png)';

	Event.observe(table, 'mouseout', BrushOff );
	Event.observe(table, 'mouseup', BrushOff );
	Event.observe(table, 'mousedown', 
		function(e){  brush_status = 1; 	} 
	);
	var tbody = Builder.node('tbody', { id: 'doodlebody' });
	$R(0,rows-1).each( function(row){
		var tr = Builder.node('tr');
		$R(0,cols-1).each( function(col){
/*
	the <style> tag in HTML doesn't work if the id begins with a number so added 'c' prefix
*/
			var td = Builder.node('td' , { id: 'c'+col+'x'+row }, "" );
			Event.observe(td,'mouseover',ChangePixelColor);
			Event.observe(td,'click',
				function(e){  
					brush_status = 1;    
					ChangePixelColor(e);
					brush_status = 0;
				}
			);
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);
	$('content').appendChild(table);
}


