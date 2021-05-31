
// ** 
//1
function showName(firstName , lastName){
    return firstName + " " + lastName;
}

//2
var showName2 = function(firstName , lastName){
    return firstName + " " + lastName;
}

//console.log( showName("Niel", "Armstrong"));
//console.log(showName("Ivan", "Stoykov", "Ivanov"));
//console.log(showName("Ivan")); 

//console.log(showName2);
//console.log(showName2("Yuri", "Gagarin"));


// Passing a function
function writeNameAndCountry(fullName, country){
    return fullName + " " + country; 
}



// function in argument list  df 
//console.log(writeNameAndCountry(showName("Borat", "Sagdiev"), "Kazahstan"));

//anonymous  function as arguments
//console.log(writeNameAndCountry(function(){return "Tutar Sagdiev" }), "Kazahstan");


// Immediately invoked function
(function(fullName){
    console.log(fullName);
}("Filip")); 



// Default parameters 
function showName3(firstName, lastName = "Sagdiev" ){
    return firstName +  " " + lastName; 
}


console.log(showName3("Ivan"));
console.log(showName3("Ivan", "Ivanov"));
console.log(showName3("Ivan", "Ivanov", "Petrov"));


//** 
// SCOPE: 
// article : 
//https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd


//** global context 
const name = "Lydia";
const age = 21;


function getPersonInfo() {
    //**  local context :
    const name = "Sarah"; 
    const age = 22
    const city = "San Francisco"; 
    return `${name} is ${age} and lives in ${city}`; 
}

//console.log(getPersonInfo())
//console.log( `${name} is ${age} and lives in ${city}` ); 





// SCOPE: 
// article : 
//https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd


//** global context 
const name1 = "Lydia"
const age1 = 21



function getPersonInfo() {
    //**  local context :
    const name1 = "Sarah"
    const age1 = 22
    const city1 = "San Francisco"
  return `${name1} is ${age1} and lives in ${city1}`
}

//console.log(getPersonInfo())
//console.log( `${name1} is ${age1} and lives in ${city1}` ); 