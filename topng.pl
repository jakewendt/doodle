#!/bin/sh
eval 'exec perl -x $0 ${1+"$@"}'
#!perl -w

use lib '/opt/local/lib/perl5';
use strict;
use CGI qw(:standard);	# NEEDED for redirect
use Image::Magick;

my $width  = param ( "width" );
my $height = param ( "height" );
my @colors = split(',', param ( "colors" ));

my $image = Image::Magick->new(size=>$width.'x'.$height);
$image->Set(size=>$width.'x'.$height);
$image->ReadImage('xc:transparent');
foreach my $y ( 0 .. $height-1 ) {
	foreach my $x ( 0 .. $width-1 ) {
		my $c = shift(@colors);
		$image->Set("pixel[$x,$y]"=>$c ) if ( $c );
	}
}

mkdir 'tmp' unless ( -d 'tmp' );

my $file = MyTime();
$image->Comment("This image was created using http://doodle.jakewendt.com");
my $ret = $image->Write("tmp/$file.png");

#print header;
#print start_html;
#print $ret if $ret;
#print "<a href='show.pl?pic=$file'>Your Pic</a>";
#print end_html;

print redirect ( "show.pl?pic=$file" );

exit 0;

sub MyTime {
	my @date = localtime;  #  This is GM time on Ops, local on Office.
	$date[5] = $date[5] + 1900;
	$date[4] = $date[4] + 1;
	#  force two digit format
	foreach (@date){ $_ = "0${_}" if ($_ < 10); }
	# removed "(UTC)" when RIL did same;  SPR 493.
	#  my $date = "$date[5]-$date[4]-$date[3]T$date[2]:$date[1]:$date[0](UTC)";
#
#	my $date = "$date[5]-$date[4]-$date[3]T$date[2]:$date[1]:$date[0]";
#		for some reason the :'s cause ...
#		Exception 420: no encode delegate for this image format `tmp/2010-05-10T21:44:48.png' 
#		@ error/constitute.c/WriteImage/1159
#
	my $date = "$date[5]$date[4]$date[3]T$date[2]$date[1]$date[0]";
	return $date;
}
