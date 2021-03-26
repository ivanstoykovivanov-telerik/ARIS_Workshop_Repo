
// ** 
function showName(firstName , lastName){
    return firstName + " " + lastName;
}

var showName2 = function(firstName , lastName){
    return firstName + " " + lastName;
}

console.log( showName("Niel", "Armstrong"));
console.log(showName("Ivan", "Stoykov", "Ivanov"));
console.log(showName("Ivan")); 

console.log( showName2("Yuri", "Gagarin"));


// Passing a function

function writeNameAndCountry(fullName, country){
    return fullName + " " + country; 
}

// function in argument list
console.log(writeNameAndCountry(showName("Borat", "Sagdiev"), "Kazahstan"));

//anonymous  function as arguments
console.log(writeNameAndCountry(function(){return "Tutar Sagdiev" }), "Kazahstan");


// Immediately invoked function
(function(fullName){
    console.log(fullName);
}("Borat")); 

// Default parameters 
function showName3(firstName, lastName = "Sagdiev"){
    return firstName +  " " + lastName; 
}


console.log(showName3("Ivan"));
console.log(showName3("Ivan", "Ivanov"));
console.log(showName3("Ivan", "Ivanov", "Petrov"));


