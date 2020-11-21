// document.addEventListener('DOMContentLoaded', tester);

document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.getItem("newitems")) {
     getcurrentbudget();
  }
});
function getcurrentbudget() {
  console.log("hellow world");

  var totalbudget = 0;
  var expper = 0;
  var income = 0;
  var expense = 0;
  var percentage = 0;
   
  var delocalstorage = JSON.parse(localStorage.getItem("newitems"));
  var totaltrans = delocalstorage.alltransaction;
  totaltrans.forEach((element) => {
    if (element.type === "inc") {
      totalbudget += element.value;
      income += element.value;
    } else {
      totalbudget -= element.value;
      expense += element.value;
    }
  });

  totalbudget > 0 ? (percentage = Math.round((expense / income) * 100)) : 0;

  document.querySelector(".bibhu").innerText = totalbudget;
  document.querySelector(".ram").innerText = income;
  document.querySelector(".laxman").innerText = `- ${expense}`;
  document.querySelector(".kalyan").innerText = `(${percentage}%)`;
  return {
    income: income,
    totalbudget: totalbudget,
  };
};

if (localStorage.getItem("newitems")) {
  console.log("ghantako ready");
  // uiController.addListItem(e);
  var storedarray = JSON.parse(localStorage.getItem("newitems"));
  var inc_array = storedarray.inc;
  var exp_array = storedarray.exp;
  var alltransaction = storedarray.alltransaction;

  // for(let key in alltransaction.newitem){
  //     console.log(key);
  // }

  function tester(element) {
    var percentage;
    var income = getcurrentbudget();
    income.totalbudget < 0
      ? (percentage = 0)
      : (percentage = Math.round((element.value / income.income) * 100));
    var html;

    // element= '.transaction_list_container';
    if (element.type === "inc") {
      html =
        ' <div class="transaction_list-1 lists" id="lists-0"><span class="one" id="one"><ion-icon name="chevron-up-outline" class="uparrow"></ion-icon></span><span class="two"><p>%description%</p></span><span class="three">%value% </span><span class="four"></span></div>';
    } else if (element.type === "exp") {
      // percentage=Math.round((element.value/income)*100);
      //    percentage=percentage.toPrecision(2);

      html =
        '  <div class="transaction_list-1 lists" id="lists-0"><span class="one" id="one"><ion-icon name="chevron-down-outline" class="downarrow"></ion-icon></span><span class="two"><p>%description%</p></span><span class="three">-%value% </span><span class="four">%hellow%</span></div>';
    }

    var storedarray = JSON.parse(localStorage.getItem("newitems"));

    var newhtmlobject = html.replace("%id%", element.id);
    newhtmlobject = newhtmlobject.replace("%description%", element.description);
    newhtmlobject = newhtmlobject.replace("%value%", element.value);
    newhtmlobject = newhtmlobject.replace("%hellow%", `${percentage} %`);

    document
      .querySelector(".transaction_list_container")
      .insertAdjacentHTML("beforeend", newhtmlobject);

     
  };

  // alltransaction.forEach((element) => {
  //   tester(element);
  //   console.log(element);
  // });

  if(alltransaction.length>0){
  for(var i=alltransaction.length-1;i>alltransaction.length-7;i--){
    tester(alltransaction[i]);

  }};


  // for(var i=0;i<alltransaction.length;i++){
  //   tester(alltransaction[i]);
  //   console.log(alltransaction[i]);

  // }

  // console.log(storedarray.inc[0].value);

  // inc_array.forEach(function () {
  //     var incomediv = document.createElement("div");
  //     incomediv.classList.add('lists');
  //     incomediv.innerText
  //     console.log(incomediv);
  //     var test = document.querySelector('.transaction_list_container');
  //     test.appendChild(incomediv);
  //     var one = document.createElement('span');
  //     one.classList.add('one');
  //     one.innerHTML = ' <ion-icon name="chevron-up-outline" class="uparrow"></ion-icon>';
  //     incomediv.appendChild(one);

  // var arrow_icon=document.createElement('i');
  // arrow_icon.classList.add(uparrow);
  // var oone=document.querySelector('.one');
  // oone.appendChild(arrow_icon);

  // var two = document.createElement('span');
  // two.classList.add('two');
  // two.innerText = storedarray.inc[0].description;
  // incomediv.appendChild(two);

  // var p = document.createElement('p');
  // p.classList.add('try');
  // p.innerText = storedarray.inc[0].description;
  // var pq=document.querySelector('.two');
  // pq.appendChild(p);

  // var three = document.createElement('span');
  // three.classList.add('three');
  // three.innerText = storedarray.inc[0].value;
  // incomediv.appendChild(three);

  // var four = document.createElement('span');
  // four.classList.add('four');
  // four.innerText = 'four';
  // incomediv.appendChild(four);
  // }

  // );
};
// tester();
// console.log(tester(element));

