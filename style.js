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

            // var storedarray=JSON.parse( localStorage.getItem('newitems'));
        
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
       addListItem:function(obj , type){
           var html, element;
          
           if(type==='inc'){
               element= domstrings.container;
               html='  <div class="transaction_list-1 lists" id="lists-%id%"><span id="one"><ion-icon name="chevron-up-outline" id="uparrow"></ion-icon></span><span id="two"><p>%description%</p></span><span id="three">%value%</span><span id="four">21%</span></div>'
           }
           
           else if(type==='exp'){
               element= domstrings.container;
               html='  <div class="transaction_list-1 lists" id="lists-%id%"><span id="one"><ion-icon name="chevron-up-outline" id="uparrow"></ion-icon></span><span id="two"><p>%description%</p></span><span id="three">%value%</span><span id="four">21%</span></div>'
           }
           console.log(typeof obj);
           var newhtml=html.replace('%id%' , obj.id);
           newhtml=newhtml.replace('%description%' , obj.description);
           newhtml=newhtml.replace('%value%' , obj.value);
           console.log(newhtml);
           console.log(obj);

           document.querySelector(element).insertAdjacentElement('beforeend', newhtml);

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

     var newItem=budgetController.addItem(inputs.type , inputs.description , inputs.value);
     
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








 
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    background-color: #e5e5e5;
    font-family: 'Poppins', sans-serif;
}
.income{
 height: 100vh;
 border: 2px solid red;
}

.transaction_list{
/* border: 2px solid red; */
margin-top: 10px;
height: 48vh;
}
.transaction_list_heading{
/* border: 2px solid blue; */
font-size: 1.5rem;
font-family: 'Poppins', sans-serif;
margin-left: 10px;
}
.transaction_list_container{
/* border: 2px solid green; */
}

/* .lists{
border: 2px solid gold;
height: 35px;
vertical-align: middle;
display: flex;
justify-content: center;
align-items: center;
margin: 5px;
padding: 5px;
border-radius: 10px;
background-color: white;
} */
#one{
/* border: 2px solid blue; */
display: inline-block;
vertical-align: middle;
width: 9%;

}
#uparrow{
font-size: 1.7rem;
color: green;
}
#two{
/* border: 2px solid blue; */
width: 44%;
display: inline-block;
vertical-align: middle;
/* text-overflow: ellipsis; */
}
#two p{
margin-left: 10px;
}
#three{
/* border: 2px solid blue; */
width: 34%;
display: inline-block;
vertical-align: middle;
text-align: center;
}
#four{
/* border: 2px solid blue; */
width: 9%;
display: inline-block;
vertical-align: middle;
}


