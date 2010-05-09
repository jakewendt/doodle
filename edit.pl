#!/opt/local/bin/perl -w

use lib '/opt/local/lib/perl5';
use strict;
use CGI qw(:standard);
use Image::Magick;

my $width  = param ( "width" );
my $height = param ( "height" );
my $fn     = param ( "fn" );
my $pixelh = param ( "pixel" ) || 15;
my $pixelw = $pixelh - (($pixelh>4)?1:0);

print header;
print start_html(
		-title  => "Edit",
		-style  => { src => [ "doodle.css" ] },
		-script => [ { src => "js/prototype.js" },
						{ src => "js/scriptaculous.js" },
						{ src => "js/jw_color.js" },
						{ src => "js/doodle.js" } ],
		-head  => style({type => 'text/css'}, "#doodle tbody tr td { height: ${pixelh}px; width: ${pixelw}px; }")
	);

print "<div id='content'>\n";

if ( $fn ) {
	my $image = Image::Magick->new;
	my $ret = $image->Read(file=>\*$fn);
	if ( $ret ) {
		print "Apparently that's not an image.<br />\n";
		print $ret;
	} else {
		$width  = $image->Get('width');
		$height = $image->Get('height');
	
		my $depth  = 256;
#		my $depth  = 2**$image->Get('depth');

#	This is actually invalid syntax but still seems to work.
#	The style tag is required to be in the head section.
		print "<style type='text/css'>\n";
		foreach my $y ( 0 .. $height-1 ) {
			foreach my $x ( 0 .. $width-1 ) {
				#	Pixel:49344,49344,49344,0:		#	silver
				#	Pixel:0,0,0,65535:				#	transparent
				my $pxl = $image->Get("pixel[$x,$y]");
				my @rgba = split /,/, $pxl;
				foreach ( @rgba ) { $_ = int( $_ / $depth ); }
				foreach ( @rgba ) { $_ = sprintf ( "%02x", $_ );  }
				print "	#c${x}x${y} { background-color: #$rgba[0]$rgba[1]$rgba[2]; }\n";
			}
		}
		print "</style>\n";
		print "<script type='text/javascript' >\n";
		print "	CreatePallet();\n";
		print "	CreateDoodle( $width, $height );\n";
		print "</script>\n";
	}
} else {
	print << "EOF";
	<script type="text/javascript" >
		Event.observe(window, 'load', function(){ CreatePallet(); return true; } );
		Event.observe(window, 'load', function(){ CreateDoodle( $width, $height ); return true; } );
	</script>
EOF
	print "<!-- Can't pass params to the event handler itself -->\n";
}

print "</div><!-- content -->\n";

print end_html;

exit 0;

