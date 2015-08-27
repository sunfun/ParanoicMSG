define([''], function(){

	var сaesar = function (text, key, decode) {
	    var textLetter, keyLetter, result = "", conv = decode ? -1 : 1;
	    key = key ? key : " ";
	    for (textLetter = keyLetter = 0; textLetter < text.length; textLetter++, keyLetter++) {
	        if (keyLetter >= key.length) keyLetter = 0;
	            result += String.fromCharCode( text.charCodeAt(textLetter) + conv * key.charCodeAt(keyLetter) );
	 
	    }
	    return result
	}

	var crypt = {
		on: function(text, key){
			return сaesar(text, key);
		},
		off: function(text, key){
			return сaesar(text, key, true);
		}
	}

	return crypt;

});