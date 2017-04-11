function createArr(arr){
	var copy_arr = arr.slice(0),
	add_arr = arr.slice(0,1)[0];
	console.log(copy_arr,add_arr);
	if(copy_arr.length%2 != 0){
		copy_arr.push(add_arr);
	}
	return copy_arr;
}

function switcher(arr){
	var newArr = createArr(arr);
	
	var mixer = function(arr){
		arr[0].map(function(a,b){
			$(b).swapWith($(arr[1][a]));
		});
	}
	var cutter = function(arr){
		if(arr.length > 0){
			var part = arr.splice(0,2);
			mixer(part);
			//console.log(part,arr);
			return cutter(arr);
		}else{
			return arr;
		}
	};
	cutter(newArr);
}