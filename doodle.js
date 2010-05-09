function IsNumeric(sText) {
	var ValidChars = "0123456789.";
	var IsNumber=true;
	var Char;

	for (i = 0; i < sText.length && IsNumber == true; i++) { 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}
	return IsNumber;
}

function validate_form(f) {
	if (IsNumeric(f.height.value) && IsNumeric(f.width.value) ) {
		if ( ( f.height.value > 0 ) && ( f.width.value > 0 ) ) {
			return true;
		}
	}
	return false;
}
