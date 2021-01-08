

// HOMEWORK 1 SOLUTIONS :


/*

TASK 1 A 


Write a function which finds the biggest number of an array.  

Input: [3, 5, 2, 3, 0]  

Output: “The biggest number of an array is : 5” 

*/

console.log("The biggest number of an array is: " + findBiggestMemberOfArray([1, 2, 3, 4, 5 ]));

function findBiggestMemberOfArray(arr){    

    var biggest =  Number.NEGATIVE_INFINITY; 

    for (let i = 0; i < arr.length; i++) {
        if(arr[i] > biggest ){
            biggest = arr[i];
        } 
    }
    return biggest; 
}


/*

TASK 1 B


Write and execute a function adding all the numbers of an array.  

Input:   [1, 2, 3, 4, 5 ]  

Output: “The result is : 15” 

*/

console.log("The result is : " + sumMembersOfArray([1, 2, 3, 4, 5 ]));

function sumMembersOfArray(arr){    
    var sum = 0; 
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];        
    }
    return sum; 
}



/*

Write and execute a function reversing the words of a sentence and outputting a new sentence with the reversed words. 

Hint: A String could be approached as an array.  


Input: “I love you so much!” 

Output: "I evol uoy os !hcum" 
*/



var phrase = "I love you so much!"; 
console.log(reverseSentence(phrase));

function reverseSentence(sentence){    
    var arr = phrase.split(" ");     
    
    var arrReversed = [];    
    for (let i = 0; i < arr.length; i++) {
        arrReversed.push(reverseString(arr[i]));    
    }
    
    var res = arrReversed.join(" "); 
    return res; 
}

function reverseString(string){
    var res =""; 
    for (let i = string.length-1; i >= 0; i--) {
        const element = string[i];
        res += string[i]
    }
    return res; 
}

/*
*   Shorter version of reverseString
*/
function reverseString2(word){
    var arrSplit = word.split("");
    return arrSplit.reverse().join("");  
}