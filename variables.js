
/*
    
    VARIABLES 

    А variable - a container for a value. 

    There are 2 important steps when creating a variable : 
        1. Declaration 
        2. Assignment of a value     

    Declare variables : 
        
        var    - you can change the value 
        const  - no change , after being set once (e.g. server name )
        let    - not used in ARIS 

    read more : 
    Varaibles: 
    https://www.w3schools.com/js/js_variables.asp#:~:text=Creating%20a%20variable%20in%20JavaScript,has%20the%20value%20of%20undefined%20).


    Data types: 
    https://www.w3schools.com/js/js_datatypes.asp


*/



/*
** NUMBER
*/
//typeof  
var b = "Boris"; 
console.log(typeof b); 



var a = 1; 
var b = 2; 
var result = 1 + 2 ; 
console.log(result);
var x = 3; 
x++;
console.log(x);
x--;
console.log(x--);


var b = 5; 
b += 10;   
console.log(b);


/*
** STRING
*/

var name = "Ivan"; 
name = 1; 
console.log(name);

var name = "Petar"; 
console.log(name);

//redeclaration : 
console.log("Redeclaration: ");
var name ; 
console.log(name);

const nameConst = "Petar"; 
console.log(nameConst);

//** const example
//const nameConst = "Bojidar"; 

//** concationation : 
var firstName = "Ivan"; 
var familyName = "Ivanov"
console.log(firstName + " " + familyName); 


//* concatination 
var x = 16 + "Volvo";
console.log(x);
console.log(typeof x);

var xa = 16 + 4 +  "Volvo";
console.log(xa);

var xab = "16" + "4" + "Volvo";
console.log(xab);

var xabc = "Volvo" + 16 + 4;
console.log(xabc);
console.log(typeof xabc);


/*
//**  undefined 
*/

var varibleWithoutInitialization ; 
//console.log(varibleWithoutInitialization);

varibleWithoutInitialization = ""; 
console.log(varibleWithoutInitialization);


//** typeof 
var car = "Volvo";
console.log(typeof car);


/*
** BOOLEAN 
*/
/*
var booleanValueFalse = false; 
var booleanValueTrue = true;
console.log(typeof booleanValueFalse );
console.log(typeof booleanValueTrue );

console.log(4 > 5); 
console.log(5 > 1); 

var res1 = 10 > 5;   // ?? 
console.log(res1);

var res2 = 10 == 5;   // ?? 
console.log(res2);

var res3 = 10 === 5;   // ?? 
console.log(res3);

var res4 = "Abu" > 5;   // ?? 
console.log(res4);
*/


/*
* Null 
*/ 

//console.log(typeof null);


// Truthy and falsy values 

/*
//NaN
*/
/*
var n_Abu = Number("Abu");   //Nan
var n_Abu = Number("1");
console.log(n_Abu);
console.log(typeof NaN); 
*/


/*
*   Type Conversion
*/

// Number()
var ab = "10";
var cd = 20; 
console.log(ab + cd); 
console.log(Number(ab) + cd );

//String()
var ef = 30; 
console.log(String(cd) + String(ef));

//Boolean()
console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Ivan"));
console.log(Boolean(''));
console.log(Boolean([]));
console.log(Boolean({}));
/*
*  Decisions:   
    if/else statements 
    switch  statement 
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

// Logical operators OR (||) and AND  ( && )  

var weather = "cold";
var timeOfTheDay = "day"; 
if(weather == "sunny" && timeOfTheDay == "day"){
    console.log("Take your sun glasses");
}

if(weather == "cold" || timeOfTheDay == "night"){
    console.log("Take your jacket");
}
 


// Difference between == and  ===
var minAge = 18; 
var yourAge = 18;  // Could be a String type , Let's say it is coming from a Dialog in ARIS.  
//1  =
//2  ==
//3  ===
//4  !=
//5  !==


if(minAge == yourAge){
    console.log("You can enter the club");
}else{
    console.log("You cannot enter the club");
}


// switch statement
var day = "Wednesday"; 
switch(day){
    case "Monday" : 
        console.log("Ideas worth spreading");
        break;    
    case "Tuesday" : 
        console.log("Bitmarck daily");
        break;
    case "Wednesday": 
        console.log("Not much here...");
        break;
    case "Thursday" : 
        console.log("Bitmarck daily");
        break;
    default: 
        console.log("Another day of work");
}