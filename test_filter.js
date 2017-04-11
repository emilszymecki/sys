function test(page,arr,flt,selector){
  var concat = [];

   arr.map(function(a,b){
		var el = $(page+" "+selector).filterData(flt,a);
		concat.push(el);
	});

	return concat;
}

