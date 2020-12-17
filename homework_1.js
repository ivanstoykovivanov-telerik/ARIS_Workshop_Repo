
/*
Write and execute a function reversing the words of a sentence and outputting a new sentence with the reversed words. 

Hint: A String could be approached as an array.  

Input: “I love you so much!” 

Output: "I evol uoy os !hcum" 
        
*/

var bar = "bar"; 
console.log(reverseString((bar)));
console.log(reverseString2(bar));

var phrase = "I love you so much!"; 
var arr = phrase.split(" "); 

var arrReversed = [];
for (let i = 0; i < arr.length; i++) {
     arrReversed.push(reverseString(arr[i]));    
}
console.log(arrReversed);

var res = arrReversed.join(" "); 
console.log(res);


function reverseString(string){
    var res =""; 
    for (let i = string.length-1; i >= 0; i--) {
        const element = string[i];
        res += string[i]
    }
    return res; 
}


function reverseString2(word){
    var arrSplit = word.split("");
    return arrSplit.reverse().join("");  
}