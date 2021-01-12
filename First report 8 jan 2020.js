

/*
*   This template could be used as a basic template for eveyry report. 
*   Parts of the templates could be easily adapted or removed according to the requirements of your task:
*   Enjoy 
*   Ivan Ivanov
*   19.12.2020 
*/
     

var g_DB = ArisData.getActiveDatabase();   
var g_nLoc = Context.getSelectedLanguage();
var a_oModels = ArisData.getSelectedModels(); 
var o_mainModel = ArisData.getSelectedModels()[0]; 



function main(){                                        
                                           
    var p = "Pesho"; 
    
    var arr = ["Pesho", "Tosho", "Gosho"]; 
//    var arr = []; 
    
    if(arr.length > 0){
       
        // iterator 

        var msg = ""; 
        for(var i = arr.length - 1 ; i >= 0; i-- ){
            msg = msg + " " + arr[i]; 
        }
       Dialogs.MsgBox(msg);
        
    }else{
         Dialogs.MsgBox("No items in the array");
    }        
    
}



main();
