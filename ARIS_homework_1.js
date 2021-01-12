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
                                           
   
   if(o_mainModel){
       
       var msg = "The type of the modell "; 
       var name = ""; 
       
       switch (o_mainModel.TypeNum()) {
            case Constants.MT_KNWLDG_STRCT_DGM:
                msg += String(o_mainModel.Type()); 
                name += String(o_mainModel.Name(-1)); 
                break;
            case Constants.MT_EEPC:
                msg += " is event driven process chain";          
                name += String(o_mainModel.Name(-1)); 
                break;
            case Constants.MT_FUNC_ALLOC_DGM:
                msg += " is function allocation diagram";          
                name += String(o_mainModel.Name(-1)); 
                break;
            default:
                msg += " is not supported";          
                name += "unknown"
                break;
        }        
        
        Dialogs.MsgBox(msg);        
   }else{
        Dialogs.MsgBox("The type of the model could not be determined.");        
   }               
}



main();
