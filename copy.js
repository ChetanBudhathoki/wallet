





var budgetController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var alltransactions=function(type, description , value){
        this.type=type;
        this.description=description;
        this.value=value;
    };
    

    var data = {
        alltransaction:[],
        inc: [],
        exp: [],
        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem: function (type, description, value) {
            var check=anothercopy();
            console.log(check);
            var alltrans=new alltransactions(type, description, value);
            // if(localStorage.getitems('newitems')){
                if (check[type].length > 0) {
                    var id = check[type][check[type].length - 1].id + 1;
                }
                else {
                    id = 0;
                }
            
           

            if (type === "inc") {
                var newItem = new Income(id, description, value);
                // data.totals.inc+=1;
            }
            else if (type === "exp") {
                var newItem = new expense(id, description, value);
            }
            
            data[type].push(newItem);
            console.log(data.totals);
            data.alltransaction.push(alltrans); 
            var getitems=[]; 
            if(localStorage.getItem('newitems')){
                getitems=JSON.parse(localStorage.getItem('newitems'));
                getitems.alltransaction.push(alltrans); 
                getitems[type].push(newItem);
                localStorage.setItem('newitems', JSON.stringify(getitems));
            } 
            
           else{
            localStorage.setItem('newitems', JSON.stringify(data)); 
           }
           
           
           function anothercopy(){
            if(localStorage.getItem('newitems')){
               var loadeddata=JSON.parse(localStorage.getItem('newitems'));
               return loadeddata;
           }
           else{
               return data;
           }
          
           
        }
        
            // console.log(test); 
            return newItem;

        }

    };


})();



// this is for the user interface ui model

var uiController = (function () {

    var domstrings = {
        inputtype: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputbtn: '.add__btn',
        container: '.transaction_list_container'
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(domstrings.inputtype).value,
                description: document.querySelector(domstrings.inputdescription).value,
                value: document.querySelector(domstrings.inputvalue).value
            };

        },

        clearfields:function(){
            var fields, fieldsarr;
        fields=document.querySelectorAll(domstrings.inputdescription + ","+ domstrings.inputvalue);
        fieldsarr=Array.prototype.slice.call(fields);
        fieldsarr.forEach(function(current){
          current.value="";  
        });
        fieldsarr[0].focus();
        },
        
        getdomstrings: function () {
            return domstrings;
        },

    };


})();


var appController = (function (budgetCtrl, uiCtrl) {
    var addItem, inputs, dom;
    dom = uiCtrl.getdomstrings();
    // console.log(dom);

    addItem = function () {
        console.log('application has starte');
        inputs = uiCtrl.getinput();
        uiCtrl.clearfields();

        console.log(inputs);
        if(!isNaN(inputs.value) && inputs.description!=="" && inputs.value>0){
            var newItem = budgetCtrl.addItem(inputs.type, inputs.description, parseInt(inputs.value));
        }
        

        //read the data from the input
        //push them into data structure
        
        //add item to the ui
        //calculation of the values
        //show the budget in ui
    };


    var eventListeners = function () {
        document.querySelector(dom.inputbtn).addEventListener('click', addItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();    
            }

        });
    };



    return {
        init: function () {
            console.log('application started');
            eventListeners();
        },
        chintit: function () {
            return inputs;
        }
    }




})(budgetController, uiController);

appController.init();






