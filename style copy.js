var budgetController=(function(){

var Income= function(id , description ,value){
    this.id=id;
    this.description=description;
    this.value=value;
};
var expense=function(id , description , value){
    this.id=id;
    this.description=description;
    this.value=value;
};

var data={
    inc:[],
    exp:[],
    totals:{
        inc:0,
        exp:0
    }
}

return{
    addItem:function(type , description , value){
        if(data[type].length>0){
            var id=data[type][data[type].length-1].id+1;
        }
        else{
            id=0;
        }
        
        if(type==="inc"){
            var newItem=new Income(id , description , value);
            
        }
        else if(type==="exp"){
            var newItem=new expense(id , description ,value);
        }
        data[type].push(newItem);
        return newItem;

    },
    testing:function(type){
        console.log(data);
        // localStorage.setItem('name',"kalyan");
        // localStorage.setItem('tester',JSON.stringify({name:"chetan"}));
        
            localStorage.setItem('newitems',JSON.stringify(data));

            var storedarray=JSON.parse( localStorage.getItem('newitems'));
            console.log(storedarray);
        
    }
};


})();  








// this is for the user interface ui model

var uiController= (function(){
    
    var domstrings={
    inputtype:'.add__type',
    inputdescription:'.add__description',
    inputvalue:'.add__value',
    inputbtn:'.add__btn',
    container:'.transaction_list_container'
    }
    
   return{
       getinput:function(){
           return{
            type: document.querySelector(domstrings.inputtype).value,
            description: document.querySelector(domstrings.inputdescription).value,
            value: document.querySelector(domstrings.inputvalue).value
           };

       },
       addListItem:function(){
        window.location.href = 'http://127.0.0.1:5500/index.html';
           var html, element;
           var storedarray=JSON.parse( localStorage.getItem('newitems'));
           var inc_array=storedarray.inc;
           var exp_array=storedarray.exp;
           console.log(storedarray.inc[0].value);

           element= domstrings.container;
           html='  <div class="transaction_list-1 lists" id="lists-%storedarray.inc[0].id%"><span id="one"><ion-icon name="chevron-up-outline" id="uparrow"></ion-icon></span><span id="two"><p>%storedarray.inc[0].description%</p></span><span id="three">%storedarray.inc[0].value%</span><span id="four">21%</span></div>'
        
        //    if(type==='inc'){
        //        element= domstrings.container;
        //        html='  <div class="transaction_list-1 lists" id="lists-%id%"><span id="one"><ion-icon name="chevron-up-outline" id="uparrow"></ion-icon></span><span id="two"><p>%description%</p></span><span id="three">%value%</span><span id="four">21%</span></div>'
        //    }
           
        //    else if(type==='exp'){
        //        element= domstrings.container;
        //        html='  <div class="transaction_list-1 lists" id="lists-%id%"><span id="one"><ion-icon name="chevron-up-outline" id="uparrow"></ion-icon></span><span id="two"><p>%description%</p></span><span id="three">%value%</span><span id="four">21%</span></div>'
        //    }
        //    console.log(typeof obj);
        //    var newhtml=html.replace('%id%' , obj.id);
        //    newhtml=newhtml.replace('%description%' , obj.description);
        //    newhtml=newhtml.replace('%value%' , obj.value);
        //    console.log(newhtml);
        //    console.log(obj);

           document.querySelector(element).insertAdjacentElement('beforeend', html);

       },
       getdomstrings:function(){
           return domstrings;
       },
       
   };
   

})();


var appController=(function(budgetCtrl , uiCtrl){
    var addItem,inputs,dom;
    dom =uiCtrl.getdomstrings();
 //    console.log(dom);
    var eventListeners=function(){
     document.querySelector(dom.inputbtn).addEventListener('click' , addItem);       
     document.addEventListener('keypress', function(event){
     if (event.keyCode === 13 || event.which === 13){
         addItem();
     }

     });
     };
 
     addItem= function(){
     console.log('application has started');
     inputs=uiCtrl.getinput();

     console.log(inputs);

     var newItem=budgetController.addItem(inputs.type , inputs.description , parseInt( inputs.value));
     
   //read the data from the input
   //push them into data structure
     uiController.addListItem(newItem , inputs.type);
   //add item to the ui
   //calculation of the values
   //show the budget in ui
     };
 
     return{
         init:function(){
             console.log('application started');
             eventListeners();
         },
         chintit:function(){
             return inputs;
         }
     }
 
   
 
 
 })(budgetController , uiController);

 appController.init();






