///************************************ */
// SWITCH STATEMENT
///************************************ */


var day = "Friday"; 
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
    case "Friday" : 
        console.log("ARIS Workshop !!");
        break;
    default: 
        console.log("Another day of work");
}


///************************************ */
// OBJECTS IN JS
///************************************ */

var person = {
    firstName: "Ivan",
    lastName : "Ivanov",
    id       : 5566,
    getFullName : function() {
      return this.firstName + " " + this.lastName;
    }, 
    getID : function() {
        return this.id ;
      }
  };

//Object property 
console.log(person.firstName);

// Object method
console.log(person.getFullName()); 

// Object method
console.log(person.getID()); 



