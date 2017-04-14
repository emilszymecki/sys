$.fn.filterData = function(key, value) {
    return this.filter(function() {
        return $(this).data(key) == value;
    });
};


  var self = (function(){
                  var table,
                  Arr,
				  All,
                  Po
    var self = {
      	  set_po: function(po){
                    Po = $(po)
            	return this;
          },
          table : function(){
                    table = $(Po).find('table')
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
      		selectAll:function(el){	
              return All[el];
			},
      		crateFullArr : function(){
                  var agg = []
                  var all = {}
                  $(table).find('tr,td,th').each(function(a,b){
                      var dataTemp = $(this).data();
                      agg.push(dataTemp);
                  });

                  agg.map(function(a,b){
                      for(var i in a){
                          if(all[i] ==  undefined){
                              if(Number.isInteger(a[i]) == true && a[i] > 0 && a[i] < 90){
                                  all[i] = [a[i]];
                              }
                          }else{
                              if(all[i].indexOf(a[i]) == -1){
                                  if(Number.isInteger(a[i]) == true && a[i] > 0 && a[i] < 90){
                                      all[i].push(a[i]);
                                  }
                              }
                          }
                      }
                  });
				  
              	All = all;
              return this;
          },
          createFilter: function(arr,selector,flt){
                          
                           var concat = [];

                           arr.map(function(a,b){
                            var el = $(table).find(selector).filterData(flt,a);
                            concat.push(el);
                          });

                          Arr = concat; 
            return this;
          },
	mixer: function(arr1,arr2){
      
                  arr1.map(function(a,b){
                    var tmp = $(b).clone(true);
                    var temp_clone = $(b);
                    var temp2_clone = $(arr2[a]);
                    $(temp_clone).after(temp2_clone);
                    $(temp2_clone).after(temp_clone);
                    //$(temp_clone).replaceWith($(temp2_clone));
                  });
           

                  return this;
         },
    switcher: function(fn,mode){
                  var arr = Arr.slice(0);
                  var memArr = Arr.slice(0)
                  
                  var arrManipuate = function(mode){
					if(mode != 'rev' || undefined){
						fisherYates(memArr);
					}
                    if(mode =='rev'){
						memArr.reverse()
					}
                    
				  }
                  
                  //console.log(arr[0], memArr[0])
                  
           
                  var make = function(arr1,arr2){
                          
                          if(arr1.length > 0){
                            var el_one  = arr.pop(),
                                el_two = memArr.pop() || [];
                            //console.log(el_one,el_two);
                fn(el_one,el_two);
                            make(arr1,arr2);
                          }
                          return this;
                  };
            
      		arrManipuate(mode);
            make(arr,memArr);
            self.init(Po);
            return this;
        },
    limitClick: function(limit){
      var arr = Arr;
 	  arr.map(function(a,b){
        var inputs = $(a).find('input');
        $(inputs).on("change",function(){
			if($(a).find('input:checked').length >= limit){
				$(a).find("input:not(:checked)").prop("disabled",true)
			}else{
				$(a).find("input:not(:checked)").prop("disabled",false)
			}
		})
		
	  })
    },
	delete: function(arr1){
                  arr1.map(function(a,b){
                    var temp_clone = $(b);
           			$(this).hide(); 
                  });
           
                  return this;
         },
     init: function(po){
          	self.set_po(po)
			self.table()
      		self.signTable()
      		self.crateFullArr()
      		return this;
		}

     }
    return self;
  })();

	Survey.bind('PA7','page','before',function(s,pi,po){ 
			var dodaj =  self;

      		//dodaj.table(po).signTable().crateFullArr().createFilter(self.selectAll('N_col'),'td,th','N_col').switcher(self.mixer)
            //dodaj.init(po).createFilter([1,2],'td,th','N_col').switcher(self.delete);
      		 dodaj.init(po).createFilter([1,2],'td,th','N_col').limitClick()
            //dodaj.init(po).createFilter([1,2],'tr','N_row').switcher(self.delete).createFilter(self.selectAll('N_row'),'tr','N_row').switcher(self.mixer).createFilter(self.selectAll('N_col'),'td,th','N_col').switcher(self.mixer)
	});
  
  	Survey.bind('PA8','page','before',function(s,pi,po){ 
			var dodaj =  self;

            //dodaj.init(po).createFilter(self.selectAll('N_row'),'tr','N_row').switcher(self.mixer)
      		 dodaj.init(po).createFilter([1,2],'td,th','N_col').limitClick(1)
             dodaj.init(po).createFilter([2],'tr','N_row').limitClick(2)
            dodaj.init(po).createFilter(self.selectAll('N_col'),'td,th','N_col').switcher(self.mixer)
	});
