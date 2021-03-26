// 1 
/*
function showMyName(){
    console.log("Ivan Ivanov");
}

showMyName(); 
showMyName(); 
showMyName(); 
showMyName(); 
showMyName(); 
*/

// **  Reusability  *** 


// Paramterized 
//2
/*
function showMyName(name){
    console.log(name);
}
*/
/*
var nameP = "Martin"; 
showMyName("Ivan Ivanov");
showMyName("Filip Filipov");
showMyName(nameP);
*/


//3 Use return 
function showMyName(firstName, lastName){
    return firstName + " " + lastName;    
}

var fullName = showMyName("Ivan", "Ivanov"); 
console.log(fullName);

console.log(showMyName("Filip", "Filipov"));



//4 Assign the returned value to a variable

//5 



