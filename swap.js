$('.page-name-K11 table').children().each(function(a,b){
  var rows = $(this).children()
  $(rows).each(function(z,x){
    var n = $(this).getValueN()
    if($(this).is('tr')){
      $(this).data({'row':z+1,'N_row':parseInt(n)})
    }
    var cell = $(this).children()
    $(cell).each(function(i,j){
            var n_col,
      count_col
      if(z < 1 && i >0 && $(this).is('th')){
        n_col = parseInt($(this).attr('id').split("-")[2])
        
            }
      if(i >0 && $(this).is('td')){
        n_col = parseInt($(this).attr('class').split(" ")[2].split("-")[1])
        count_col = z+1
        
            }
      $(this).data({
        'N_row':(n>0)?parseInt(n):'naglowek',
        'N_col':n_col || 0,
         'col':(i>0)?i:'zero',
        'row':(count_col>0)?count_col:'row_label'
      })
      console.log($(this),$(this).data())
    })
  })
})

jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

$.fn.filterData = function(key, value) {
    return this.filter(function() {
        return $(this).data(key) == value;
    });
};

function flt(page,arr){
  var concat = [];

  for(var i=0; i <arr.length;i++){
		var el = $(page+' td,th').filterData('row',arr[i]);
	    concat.push(el);
	}

	return concat
}

var x = flt('.page-name-K11',[1,2,3])