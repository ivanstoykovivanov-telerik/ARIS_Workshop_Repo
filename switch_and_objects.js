///************************************ */
// REVISION 
///************************************ */

// undefined 

//var nameP = "false";    

//var arr = []; 
/*
if([]){    
    console.log("It is defined.");
}
*/
//var b = Boolean("dfjdfdsafjkasd"); 


// truthy  : String ( different from " "), number , true,  {}, [] 
// falsy   String ( different from " "), null,  undefined, false ,  


//ar example = ""; 

//if(example){
/*
if(example){
    console.log("Truthy");
}
*/



/*

console.log(Boolean( nameP = "Filip"));  

console.log(Boolean(nameP));


if(nameP == "Milena"){
    console.log("Name is Milena");
}else{
    console.log("Name is Filip");
}
*/
//console.log(Boolean(1 = "1"));
//console.log(Boolean(1 == "1"));
//console.log(Boolean(1 === "1"));

//console.log(Boolean(1 != "1"));   // false 
// console.log(Boolean(1 !== "1"));  // true






///************************************ */
// SWITCH STATEMENT
///************************************ */
/*

var day = "Tuesday"; 

switch(day){
    case "Monday" :            
    case "Tuesday" : 
        console.log("Bitmarck daily");
        break;        
    case "Wednesday": 
        console.log("Not much here...");       
        break;
    case "Thursday" : 
        console.log("Bitmarck daily");
        break;
    case "Friday" : 
        console.log("ARIS Workshop !!");
        break;
    default: 
        console.log("Another day of work");
}

*/

///************************************ */
// OBJECTS IN JS
///************************************ */

// What are objects  ? 
//  key-value pairs

// 

function getName(){
    return "Kozlio";
}
/*
var person = {
    firstName: getName(),
    lastName : (this.firstName).replace("o", "uuuuu"),
    id       : 132,    
    getFullName : function() {
      return this.firstName + " " + this.lastName;
    }, 
    getID : function() {
        return this.id ;
    },
    
    
  };
*/

var person = {}; 
person.firstName = getName(); 
person.lastName = person.firstName.replace("o", "uuuuu");
console.log(person);


//Object property 
//console.log(person.firstName);

// Object method
//console.log(person.getFullName()); 

// Object method
//console.log(person.getID()); 

// onsole.log(typeof person);


// what is this  ???
/* 
    getFullName : function(){
        return this.firstName + " " + this.lastName;
    }

    // same as this : 
    var gefFullName = function(){
    return this.firstName + " " + this.lastName;
    }

//becasue we use key value pairs







/*
    this keyword
*/

/*
var myFriend = {
    firstName: 'John',
    lastName: 'Smith',
    age: 27,
    nationality: 'British',
    sayHi: function() {
        console.log('Hi!');
    },
    introduce: function() {
        console.log('My name is ' + this.firstName + ' ' + this.lastName + ". I'm " + this.nationality + " and I'm " + this.age + ' years old.');
    }
};

console.log(myFriend.introduce());
console.log(myFriend.sayHi());

//console.log(myFriend.introduce);

*/
