$.fn.filterData = function(key, value) {
    return this.filter(function() {
        return $(this).data(key) == value;
    });
};


  var self = (function(){
                  var table,
                  Arr
    var self = {
          table : function(po){
                    table = $(po).find('table')
            return this;
          },
          signTable: function(){
                   $(table).children().each(function(a,b){
                        var rows = $(this).children();
                        $(rows).each(function(z,x){
                          var n = $(this).getValueN();
                          if($(this).is('tr')){
                            $(this).data({'row':z+1,'N_row':parseInt(n)});
                          }
                        var cell = $(this).children();
                        $(cell).each(function(i,j){
                            var n_col,
                            count_col = z;
                            if(z < 1 && i >0 && $(this).is('th')){
                              n_col = parseInt($(this).attr('id').split("-")[2]);
                            }
                            if(i >0 && $(this).is('td')){
                              n_col = parseInt($(this).attr('class').split(" ")[2].split("-")[1]);
                              count_col = z+1;   
                            }
                            $(this).data({
                              'N_row':(n>0)?parseInt(n):'naglowek',
                              'N_col':n_col || 0,
                              'col':(i>0)?i:'zero',
                              'row':(count_col>0)?count_col:'col_label'
                            });
                          });
                        });
                      });          
            return this;
          },
          createFilter: function(po,arr,selector,flt){
                          
                        var concat = [];

                           arr.map(function(a,b){
                            var el = $(po).find(selector).filterData(flt,a);
                            concat.push(el);
                          });
                          //console.log(concat);
                          Arr = concat; 
            return this;
          },
      	 mixer: function(arr1,arr2){
                  arr1.map(function(a,b){
                    var temp_clone = $(b).clone(true);
                    var temp2_clone = $(arr2[a]).clone(true);
					 $(b).replaceWith(temp2_clone);	
                  });
           
           		 console.log(arr1,arr2)

                  return this;
			   },
		switcher: function(){
                  var arr = Arr.slice(0);
                  var memArr = Arr.slice(0)
          		  fisherYates(memArr)
                  
                  //console.log(arr[0], memArr[0])
                  
           
                  var make = function(arr1,arr2){
                          
                          if(arr1.length > 0){
                            var el_one  = arr.pop(),
                                el_two = memArr.pop()
                            //console.log(el_one,el_two);
								self.mixer(el_one,el_two);
                            make(arr1,arr2);
                          }
                          return this;
                  };
          	
            make(arr,memArr);
            return this;
        }

     }
    return self;
  })();