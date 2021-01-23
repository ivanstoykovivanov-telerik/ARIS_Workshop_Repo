/*
*   Homework 2
*   This report determinse the profile of the model based on the model type. 
*   Ivan Ivanov
*   19.12.2020 
*/
     

var g_DB = ArisData.getActiveDatabase();   
var g_nLoc = Context.getSelectedLanguage();
var a_oModels = ArisData.getSelectedModels(); 
var o_mainModel = ArisData.getSelectedModels()[0]; 


function main(){                                        
                                           
   
   if(o_mainModel){
       
       var msg = "Model profile: "; 
       var profile; 
       
        switch (o_mainModel.TypeNum()) {
            case Constants.MT_EEPC:
                profile = 111;                  
                break;
            case Constants.MT_FUNC_ALLOC_DGM:
                profile = 222;                  
                break;
            case Constants.MT_KNWLDG_STRCT_DGM:                
                profile = 333;  
                break;
            case Constants.MT_VAL_ADD_CHN_DGM:                
                profile = 333;  
                break;            
            default:
                profile = 0;                  
                break;
        }        
        
        Dialogs.MsgBox(msg + profile);        
   }else{
        Dialogs.MsgBox("The type of the model could not be determined.");        
   }               
}


main();
