
/*
* 
*  Functions
* 
* https://www.w3schools.com/js/js_functions.asp
*/


//**  Code reuse:  */


console.log("My name is Ivan");
console.log("My name is Ivan");



 
function printName(){
    console.log("My name is Ivan");
}


//**  Function with argument:  */

function printThisName(name){
    console.log("My name is" + " " + name + " .");
}


/** funciton call  */

printName(); 

printThisName("Asen"); 


//** return  */

function addTwoNumbers(a , b ){        
    return a + b; 
}

var result = addTwoNumbers(1, 2); 
console.log(result);

console.log(addTwoNumbers(4,5));

//** Calculate age and print Name */ 
// calculate_age_and_print 
//calculate-age-and-print

function calculateAgeAndPrintName(name, birthYear){
    printName(name);
    
    var date = new Date(); // ready from JS 
    var yearNow = date.getFullYear();
    var age = yearNow - birthYear;
    
    return "I am "  + age + " old."
}

console.log(calculateAgeAndPrintName("Ivan", 1983));



//** Mind blown !!  */

var nameG = "Gosho"; 

function writeGosho(){
    console.log(nameG);
}

writeGosho(); 


function writePesho(){
    var nameP = "Pesho"; 
    console.log(nameP);
}

writePesho(); 
//console.log(nameP);

//** Why it happens ? Scope (next time)  */ 



/*
*
* ARRAYS 
*
* https://www.w3schools.com/js/js_arrays.asp
*/

/*
var newArrayEmp = []; 
var newArrayEmp2 = new Array(); 
console.log(newArrayEmp);
console.log(newArrayEmp2);

//assign elements 
*/


var family = ["Ivan", "Rumyana", "Stoyko", "Georgi"]; 

console.log(family);

console.log(family[0]); 
console.log(family[1]); 
console.log(family[2]); 
console.log(family[3]); 
console.log(family[4]); 

var father = "Stoyko";
var mother = "Rumyana";
var son1 = "Ivan" ;
var son2 = "Georgi" ;

var familyVariables = [father, mother, son1, son2]; 
console.log(familyVariables[0]);
console.log(familyVariables[1]);
console.log(familyVariables[2]);


//** nested array  */

var children = ["Ivan", "Georgi"]; 
var family2 = ["Stoyko", "Rumi", children]; 
console.log(family2[2][1]);



//** Loops (supported in ARIS only ) */

// For loop : 
console.log("My family: ");

for (let i = 0; i < family.length; i++){
    var familyMember = family[i];
    console.log(familyMember);
    console.log(family[i]); 
}



// last element of an array
var youngestChild = family[family.length-1] ; 
console.log(youngestChild);


//**   Methods */
// length 

var numberOfFamilyMembers = family.length; 
console.log(numberOfFamilyMembers);



var fruits = ["Banana", "Orange", "Apple", "Mango"];

//push  -> adds an element to the end of the array 
console.log(fruits);
var pushed = fruits.push("Lemon");  // the new number of elements in the array  
console.log(fruits);
console.log(pushed);

//pop -> takes the last element out
console.log(fruits);
fruits.pop();  
var popped = fruits.pop();  
console.log(fruits);
console.log(popped);



/*
*  forEach
*
*   https://dmitripavlutin.com/foreach-iterate-array-javascript/
*/

/*
var arr = [1,2,3]; 
console.log(arr);
arr.forEach(addOne); 
console.log(arr);


function addOne(a, index,  array){  
  a = a + 1; 
  //a++;
  array.push(a);
}


*/



