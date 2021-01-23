/*
*   Homework 3
*   Creates objects
*   Ivan Ivanov
*   19.12.2020 
*/    
var g_DB = ArisData.getActiveDatabase();   
var g_nLoc = Context.getSelectedLanguage();
var g_oGroup= ArisData.getSelectedGroups()[0];

function main(){                                                   
    //Create modell : 
    o_model = g_oGroup.CreateModel(Constants.MT_EEPC, "Delivery chain", g_nLoc);       
    
    // Array to store the object ocss. created in the model
    var ao_objOccs =[]; 
       
    for(i=0; i < 3; i++){        
        
        // crete obj definitions for the objects (they are created in the group)    
        var o_funcObjDef = g_oGroup.CreateObjDef( Constants.OT_FUNC, "Function " + i , g_nLoc );
        
        if(o_funcObjDef){            
            // create obj occ. of the obj def in the modell  
            var o_funcObjOcc = o_model.createObjOcc( Constants.ST_FUNC, o_funcObjDef, 20, i * 400, true );                           
            
            if(o_funcObjOcc){
                // Function object was succsessfully created . Add it to the list of obj defs. 
                ao_objOccs.push(o_funcObjDef);          
            }else{
                Dialogs.MsgBox("Object occurence could not be created in the model.");         
            }                       
        }else{
            // error:
            Dialogs.MsgBox("Object definition could not be created.");         
        }                     
    }
    
    if(ao_objOccs.length > 0 ){
        Dialogs.MsgBox('The following items were created in the model "' + o_model.Name(g_nLoc) + '": ' + showList(ao_objOccs, g_nLoc));         
    }else{
         // error:
        Dialogs.MsgBox("No items were created in the model " + o_model.Name(g_nLoc) + "." );         
    }    
}


/**
* showList(a_oItems, g_nLoc) shows a list of the items contained in the arry 
*/
function showList(a_oItems, g_nLoc){    
    var s_List = "";     
    for (var i=0; i< a_oItems.length; i++){
        s_List = s_List + "\n" + a_oItems[i].Name(g_nLoc); 
    }    
    return  s_List; 
}


main();