/*
	Some original code from http://www.nofunc.com/Color_Conversion_Library/
	Color names and hex codes from http://www.w3schools.com/html/html_colornames.asp
*/
var Color = {
	shade: function(colorFrom, colorTo, portion) {
		if ( portion <= 0.0 ) return colorFrom;
		else if ( portion >= 1.0 ) return colorTo;
		else {
			rgbFrom = Color.hex2rgb ( colorFrom );
			rgbTo   = Color.hex2rgb ( colorTo   );
			rgbFrom[0] += Math.round(portion*(rgbTo[0]-rgbFrom[0]));
			rgbFrom[1] += Math.round(portion*(rgbTo[1]-rgbFrom[1]));
			rgbFrom[2] += Math.round(portion*(rgbTo[2]-rgbFrom[2]));
			return Color.rgb2hex(rgbFrom);
		}
	},
	dec2hex: function (v) { 
		/* Does not return leading zeroes which causes a problem in HTML */
		return( ((v-v%16)?Color.dec2hex((v-v%16)/16):"") +"0123456789ABCDEF".charAt(v%16)); 
	},
	dec2hex2: function (v) { 
		v=Math.round(Math.min(Math.max(0,v),255)); 
		return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16)); 
	},
	hex2dec: function(v) {
		return parseInt(v,16);
	},
	hex2rgb: function (r) { 
		r = r.replace("#","");
		return([parseInt(r.substr(0,2),16),parseInt(r.substr(2,2),16),parseInt(r.substr(4,2),16)]); 
	},
	rgb2hex: function (r) { 
		return("#"+Color.dec2hex2(r[0])+Color.dec2hex2(r[1])+Color.dec2hex2(r[2])); 
	},
	rgb2hsv: function (r) { 
		var max=Math.max(r[0],r[1],r[2]), delta=max-Math.min(r[0],r[1],r[2]), H, S, V;
		if(max!=0) { 
			S=Math.round(delta/max*100);
			if(r[0]==max) H=(r[1]-r[2])/delta; 
			else if(r[1]==max) H=2+(r[2]-r[0])/delta; 
			else if(r[2]==max) H=4+(r[0]-r[1])/delta;
			var H=Math.min(Math.round(H*60),360); 
			if(H<0) H+=360;
		}
		return([H?H:0,S?S:0,Math.round((max/255)*100)]);
	},
	hsv2rgb: function (r) { 
		var F, R, B, G, H=r[0]/360, S=r[1]/100, V=r[2]/100;
		if(S>0) { 
			if(H>=1) H=0;
			H=6*H; 
			F=H-Math.floor(H);
			A=Math.round(255*V*(1-S));
			B=Math.round(255*V*(1-(S*F)));
			C=Math.round(255*V*(1-(S*(1-F))));
			V=Math.round(255*V);
			switch(Math.floor(H)) {
				case 0: R=V; G=C; B=A; break;
				case 1: R=B; G=V; B=A; break;
				case 2: R=A; G=V; B=C; break;
				case 3: R=A; G=B; B=V; break;
				case 4: R=C; G=A; B=V; break;
				case 5: R=V; G=A; B=B; break;
			}
			return([R?R:0,G?G:0,B?B:0]);
		}
		else 
			return([(V=Math.round(V*255)),V,V]);
	},
	basic16hex: function(v) {
		switch(v) {
			case  0:	hex=Color.string2hex('black'); break;
			case  1:	hex=Color.string2hex('silver'); break;
			case  2:	hex=Color.string2hex('gray'); break;
			case  3:	hex=Color.string2hex('white'); break;
			case  4:	hex=Color.string2hex('maroon'); break;
			case  5:	hex=Color.string2hex('red'); break;
			case  6:	hex=Color.string2hex('purple'); break;
			case  7:	hex=Color.string2hex('fuchsia'); break;
			case  8:	hex=Color.string2hex('green'); break;
			case  9:	hex=Color.string2hex('lime'); break;
			case 10:	hex=Color.string2hex('olive'); break;
			case 11:	hex=Color.string2hex('yellow'); break;
			case 12:	hex=Color.string2hex('navy'); break;
			case 13:	hex=Color.string2hex('blue'); break;
			case 14:	hex=Color.string2hex('teal'); break;
			case 15:	hex=Color.string2hex('aqua'); break;
			default: hex=v;
		}
		return hex;
/*
	(I'm guessing at the order)
http://www.w3.org/TR/html4/sgml/loosedtd.html#Color
    Black  = #000000    Green  = #008000
    Silver = #C0C0C0    Lime   = #00FF00
    Gray   = #808080    Olive  = #808000
    White  = #FFFFFF    Yellow = #FFFF00
    Maroon = #800000    Navy   = #000080
    Red    = #FF0000    Blue   = #0000FF
    Purple = #800080    Teal   = #008080
    Fuchsia= #FF00FF    Aqua   = #00FFFF
*/
	},
	string2hex: function(v) {
		switch(v.toLowerCase()) {

		/* from http://www.w3schools.com/html/html_colornames.asp */
			case 'aliceblue':					hex='#F0F8FF'; break;
			case 'antiquewhite':				hex='#FAEBD7'; break;
			case 'aqua':						hex='#00FFFF'; break;
			case 'aquamarine':				hex='#7FFFD4'; break;
			case 'azure':						hex='#F0FFFF'; break;
			case 'beige':						hex='#F5F5DC'; break;
			case 'bisque':						hex='#FFE4C4'; break;
			case 'black':						hex='#000000'; break;
			case 'blanchedalmond':			hex='#FFEBCD'; break;
			case 'blue':						hex='#0000FF'; break;
			case 'blueviolet':				hex='#8A2BE2'; break;
			case 'brown':						hex='#A52A2A'; break;
			case 'burlywood':					hex='#DEB887'; break;
			case 'cadetblue':					hex='#5F9EA0'; break;
			case 'chartreuse':				hex='#7FFF00'; break;
			case 'chocolate':					hex='#D2691E'; break;
			case 'coral':						hex='#FF7F50'; break;
			case 'cornflowerblue':			hex='#6495ED'; break;
			case 'cornsilk':					hex='#FFF8DC'; break;
			case 'crimson':					hex='#DC143C'; break;
			case 'cyan':						hex='#00FFFF'; break;
			case 'darkblue':					hex='#00008B'; break;
			case 'darkcyan':					hex='#008B8B'; break;
			case 'darkgoldenrod':			hex='#B8860B'; break;
			case 'darkgray':					hex='#A9A9A9'; break;
			case 'darkgrey':					hex='#A9A9A9'; break;
			case 'darkgreen':					hex='#006400'; break;
			case 'darkkhaki':					hex='#BDB76B'; break;
			case 'darkmagenta':				hex='#8B008B'; break;
			case 'darkolivegreen':			hex='#556B2F'; break;
			case 'darkorange':				hex='#FF8C00'; break;
			case 'darkorchid':				hex='#9932CC'; break;
			case 'darkred':					hex='#8B0000'; break;
			case 'darksalmon':				hex='#E9967A'; break;
			case 'darkseagreen':				hex='#8FBC8F'; break;
			case 'darkslateblue':			hex='#483D8B'; break;
			case 'darkslategray':			hex='#2F4F4F'; break;
			case 'darkslategrey':			hex='#2F4F4F'; break;
			case 'darkturquoise':			hex='#00CED1'; break;
			case 'darkviolet':				hex='#9400D3'; break;
			case 'deeppink':					hex='#FF1493'; break;
			case 'deepskyblue':				hex='#00BFFF'; break;
			case 'dimgray':					hex='#696969'; break;
			case 'dimgrey':					hex='#696969'; break;
			case 'dodgerblue':				hex='#1E90FF'; break;
			case 'firebrick':					hex='#B22222'; break;
			case 'floralwhite':				hex='#FFFAF0'; break;
			case 'forestgreen':				hex='#228B22'; break;
			case 'fuchsia':					hex='#FF00FF'; break;
			case 'gainsboro':					hex='#DCDCDC'; break;
			case 'ghostwhite':				hex='#F8F8FF'; break;
			case 'gold':						hex='#FFD700'; break;
			case 'goldenrod':					hex='#DAA520'; break;
			case 'gray':						hex='#808080'; break;
			case 'grey':						hex='#808080'; break;
			case 'green':						hex='#008000'; break;
			case 'greenyellow':				hex='#ADFF2F'; break;
			case 'honeydew':					hex='#F0FFF0'; break;
			case 'hotpink':					hex='#FF69B4'; break;
			case 'indianred ':				hex='#CD5C5C'; break;
			case 'indigo ':					hex='#4B0082'; break;
			case 'ivory':						hex='#FFFFF0'; break;
			case 'khaki':						hex='#F0E68C'; break;
			case 'lavender':					hex='#E6E6FA'; break;
			case 'lavenderblush':			hex='#FFF0F5'; break;
			case 'lawngreen':					hex='#7CFC00'; break;
			case 'lemonchiffon':				hex='#FFFACD'; break;
			case 'lightblue':					hex='#ADD8E6'; break;
			case 'lightcoral':				hex='#F08080'; break;
			case 'lightcyan':					hex='#E0FFFF'; break;
			case 'lightgoldenrodyellow':	hex='#FAFAD2'; break;
			case 'lightgray':					hex='#D3D3D3'; break;
			case 'lightgrey':					hex='#D3D3D3'; break;
			case 'lightgreen':				hex='#90EE90'; break;
			case 'lightpink':					hex='#FFB6C1'; break;
			case 'lightsalmon':				hex='#FFA07A'; break;
			case 'lightseagreen':			hex='#20B2AA'; break;
			case 'lightskyblue':				hex='#87CEFA'; break;
			case 'lightslategray':			hex='#778899'; break;
			case 'lightslategrey':			hex='#778899'; break;
			case 'lightsteelblue':			hex='#B0C4DE'; break;
			case 'lightyellow':				hex='#FFFFE0'; break;
			case 'lime':						hex='#00FF00'; break;
			case 'limegreen':					hex='#32CD32'; break;
			case 'linen':						hex='#FAF0E6'; break;
			case 'magenta':					hex='#FF00FF'; break;
			case 'maroon':						hex='#800000'; break;
			case 'mediumaquamarine':		hex='#66CDAA'; break;
			case 'mediumblue':				hex='#0000CD'; break;
			case 'mediumorchid':				hex='#BA55D3'; break;
			case 'mediumpurple':				hex='#9370D8'; break;
			case 'mediumseagreen':			hex='#3CB371'; break;
			case 'mediumslateblue':			hex='#7B68EE'; break;
			case 'mediumspringgreen':		hex='#00FA9A'; break;
			case 'mediumturquoise':			hex='#48D1CC'; break;
			case 'mediumvioletred':			hex='#C71585'; break;
			case 'midnightblue':				hex='#191970'; break;
			case 'mintcream':					hex='#F5FFFA'; break;
			case 'mistyrose':					hex='#FFE4E1'; break;
			case 'moccasin':					hex='#FFE4B5'; break;
			case 'navajowhite':				hex='#FFDEAD'; break;
			case 'navy':						hex='#000080'; break;
			case 'oldlace':					hex='#FDF5E6'; break;
			case 'olive':						hex='#808000'; break;
			case 'olivedrab':					hex='#6B8E23'; break;
			case 'orange':						hex='#FFA500'; break;
			case 'orangered':					hex='#FF4500'; break;
			case 'orchid':						hex='#DA70D6'; break;
			case 'palegoldenrod':			hex='#EEE8AA'; break;
			case 'palegreen':					hex='#98FB98'; break;
			case 'paleturquoise':			hex='#AFEEEE'; break;
			case 'palevioletred':			hex='#D87093'; break;
			case 'papayawhip':				hex='#FFEFD5'; break;
			case 'peachpuff':					hex='#FFDAB9'; break;
			case 'peru':						hex='#CD853F'; break;
			case 'pink':						hex='#FFC0CB'; break;
			case 'plum':						hex='#DDA0DD'; break;
			case 'powderblue':				hex='#B0E0E6'; break;
			case 'purple':						hex='#800080'; break;
			case 'red':							hex='#FF0000'; break;
			case 'rosybrown':					hex='#BC8F8F'; break;
			case 'royalblue':					hex='#4169E1'; break;
			case 'saddlebrown':				hex='#8B4513'; break;
			case 'salmon':						hex='#FA8072'; break;
			case 'sandybrown':				hex='#F4A460'; break;
			case 'seagreen':					hex='#2E8B57'; break;
			case 'seashell':					hex='#FFF5EE'; break;
			case 'sienna':						hex='#A0522D'; break;
			case 'silver':						hex='#C0C0C0'; break;
			case 'skyblue':					hex='#87CEEB'; break;
			case 'slateblue':					hex='#6A5ACD'; break;
			case 'slategray':					hex='#708090'; break;
			case 'slategrey':					hex='#708090'; break;
			case 'snow':						hex='#FFFAFA'; break;
			case 'springgreen':				hex='#00FF7F'; break;
			case 'steelblue':					hex='#4682B4'; break;
			case 'tan':							hex='#D2B48C'; break;
			case 'teal':						hex='#008080'; break;
			case 'thistle':					hex='#D8BFD8'; break;
			case 'tomato':						hex='#FF6347'; break;
			case 'turquoise':					hex='#40E0D0'; break;
			case 'violet':						hex='#EE82EE'; break;
			case 'wheat':						hex='#F5DEB3'; break;
			case 'white':						hex='#FFFFFF'; break;
			case 'whitesmoke':				hex='#F5F5F5'; break;
			case 'yellow':						hex='#FFFF00'; break;
			case 'yellowgreen':				hex='#9ACD32'; break;
			default: hex=v;
		}
		return hex;
	}
}


