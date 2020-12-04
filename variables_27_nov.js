
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
var n = 4.5; 
console.log(n);



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
