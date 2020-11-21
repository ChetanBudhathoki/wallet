var objarr = [
  { type: "inc", description: "salary", value: 300 },
  { type: "exp", description: "sold car", value: 100 },
  { type: "exp", description: "sold car", value: 200 },
  { type: "inc", description: "salary paid", value: 340 },
  { type: "exp", description: "rent paid", value: 100 },
];

var test=objarr.filter(function(value){
    return (value.value!=100 || value.description!=="sold car");
});
console.log(test);
