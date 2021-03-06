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
    // o_model = g_oGroup.CreateModel(Constants.MT_EEPC, "Delivery chain", g_nLoc);       
    
    var o_modelEPC = createModel(Constants.MT_EEPC, "Delivery chain"); 
    var o_modelCOLLAB_1 = createModel(Constants.MT_COLLAB , "Service Diagram 1"); 
    var o_modelCOLLAB_2 = createModel(Constants.MT_COLLAB , "Service Diagram 2"); 

    var o_modelBPMN1 = createModel(Constants.MT_BPMN , "BPMN1"); 

    // Array to store the object ocss. created in the model
    var ao_objOccs =[];          
    
    
    createObjOccsInModel(o_model, n_objCount, n_objType , n_SymbolType); 
    
    /*
    for(i=0; i < 10; i++){        
        
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
    */
        
    if(ao_objOccs.length > 0 ){
        Dialogs.MsgBox('The following items were created in the model "' + o_model.Name(g_nLoc) + '": ' + showList(ao_objOccs, g_nLoc));         
    }else{
         // error:
        Dialogs.MsgBox("No items were created in the model " + o_model.Name(g_nLoc) + "." );         
    }
    
    // delete ObjOcc: 
    var s_objName = "Function 7"
    var b_OK = deleteObjecOcc(o_model, s_objName); 
    if(b_OK){
        Dialogs.MsgBox('Object with the name "' + s_objName +  '"was deleted.' );             
    }        
}


/**
*  shows a list of the items contained in the arry 
*/
function showList(ao_items, g_nLoc){    
    var s_List = "";     
    for (var i=0; i< ao_items.length; i++){
        s_List = s_List + "\n" + ao_items[i].Name(g_nLoc); 
    }    
    return  s_List; 
}


function createObjOccsInModel(o_model, n_objCount, n_objType , n_SymbolType){

    for(i=0; i < n_objCount; i++){        
        
        // crete obj definitions for the objects (they are created in the group)    
        var o_funcObjDef = g_oGroup.CreateObjDef( n_objType, "Function " + i , g_nLoc );
        
        if(o_funcObjDef){            
            // create obj occ. of the obj def in the modell  
            var o_funcObjOcc = o_model.createObjOcc( n_SymbolType, o_funcObjDef, 20, i * n_interval * 400, true );                           
            
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
}

function createModel(n_modelType, s_modelName){
    o_model = g_oGroup.CreateModel(n_modelType, s_modelName, g_nLoc);       
    return o_model ;   
}

/**
* Deletes an obj occ by name
*@param o_model -> obj Model 
*@param s_name -> String name of the obj occ to be deleted
*@returns boolean (true if successfully deleted , false if not)
*/
function deleteObjecOcc(o_model, s_name){    
    var ao_objOccs = o_model.ObjOccListBySymbol([Constants.ST_FUNC]);  
    for(i=0; i < ao_objOccs.length; i++){
        if(ao_objOccs[i].getObjDefName(g_nLoc) == s_name ){
            var b_OK = ao_objOccs[i].Remove();                        
            if(b_OK){
                return true; 
            }
        }        
    }         
    return false; 
}


main();
