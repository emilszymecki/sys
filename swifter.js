arr = [["a","b","c"],["d","e","f"],["g","h","i"],["j","k","l"]];

function test(arr){
	var part = arr.slice(0,2);
	var z = function(el){
		el[0].map(function(a,b){
			 var temp = a;
			 a = el[1][b];
			 el[1][b] = temp;
			 console.log(a); 
		});
	};
	if(arr.length > 1){
		z(part);
		arr.shift();
		test(arr);
	}
		console.log(arr);
		return;
}

test(arr)
