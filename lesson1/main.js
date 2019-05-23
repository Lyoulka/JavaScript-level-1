
function UpdateF(n)
{
	var c = window.document.converter.celsius;
	var f = window.document.converter.fahrengeit;
	if ( n == 1 ) {
		f.value = (1.8 * eval(c.value) + 32);
	};
	if ( n == 2 ) {
		c.value = ( (eval(f.value) - 32) / 1.8 );
	};
	};
var admin, name;
  name = 'Василий';
  admin = name;
     