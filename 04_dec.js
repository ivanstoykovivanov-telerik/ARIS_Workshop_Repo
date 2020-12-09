
/*
*
*  Revision from last time  
*
*/
var x = 16 + "Volvo";
console.log(x);
console.log(typeof x);

var xa = 16 + "Ivan" +  4 + "Volvo";
console.log(xa);

var xab = "16" + "4" + "Volvo";
console.log(xab);

var xabc = "Volvo" + (16 - 4);
console.log(xabc);
console.log(typeof xabc);


/*
*  
* BOOLEAN 
*
*/
var b = true; 
var c = false; 
console.log(typeof b);
console.log(4 > 5);



/*
*
* Null 
*
*/ 
console.log(typeof null);


/*
* 
* NaN
*
*/
var n_Abu = Number("Abu");   //Nan
var n_Abu = Number("1");
console.log(n_Abu);
console.log(typeof NaN);


/*
*  
* Coercion 
*
*/


/* 
* 
* Conversion   (is manual coercion)
*
*/
var a = "123"; 
var b = 1; 
var a_number = Number(a); 
console.log(typeof a);
console.log(typeof a_number);
var c = a_number + b ; 
console.log(c);

var a_string = String(a_number); 
console.log(typeof a_string);

var x = "Volvo"; 
console.log(Number(x));


/* 
* 
*  Falsy and Truthy 
*
*/
var t = "true";  
console.log(typeof t);
console.log(typeof Boolean(t)); 
console.log(Boolean(1));
console.log(Boolean());
console.log(Boolean(0));

var nameb = "Ivan"
var  p = 0; 
console.log(Boolean(nameb));
console.log(nameb);
console.log(Boolean(''));
console.log(Boolean(p = 3));
console.log(Boolean());
console.log(123 == "123");
console.log(123 === "123");


/*
* 
*  If / else statement  
* 
*/

var itRains = true; 

if(itRains){
    console.log("Take an umbrella");
}


if(itRains){
    console.log("Take an umbrella");
}else{
    console.log("Do not take an umbrella");
}

var weather = "sunny"; 

if(weather === "sunny"){
    console.log("Take your sun glasses");
}else if(weather = "cold"){
    console.log("Take your jacket");
}else if(weather = "rainy"){
    console.log("Take your umbrella");
}


/*
*
*   Difference between == and  ===
*   
*/
var number = 123; 
var string = "123"

console.log(number = string);
console.log(typeof(number = string));
console.log(Boolean(number = string));
console.log(number == string);
console.log(number === string);
