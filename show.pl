#!/bin/sh
eval 'exec perl -x $0 ${1+"$@"}'
#!perl -w

use strict;
use CGI qw(:standard);

my $pic  = param ( "pic" ) || 'missing';

print header;
print start_html(
		-title => "Your new pic",
		-head  => Link({-rel=>'icon', -href=>"tmp/$pic.png", -type=>'image/icon' })
	);
print "<center>";
print img { src => "tmp/$pic.png" };
print "</center>";
print end_html;

exit 0;
