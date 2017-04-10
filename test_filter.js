function test(page,arr){
  var concat = [];

  for(var i=0; i <arr.length;i++){
		var el = $(page+' td,th').filterData('row',arr[i]);
	    concat.push(el);
	}

	return concat
}