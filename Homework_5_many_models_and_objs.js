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
    //**
    var o_model = createModel(Constants.MT_EEPC, "Delivery chain"); 
    var o_modelBPMN = createModel(Constants.MT_BPMN_COLLABORATION_DIAGRAM, "BPMN"); 
    var o_modelDiagram = createModel(Constants.MT_IS_ACTIVATION_MODEL, "Diagram"); 
    
    //**                          
    var ao_objOccsFuncs = createObjOccs(o_model, 10, Constants.OT_FUNC,  Constants.ST_FUNC, "Function", 20, 400 ); 
    var ao_objOccsEvents = createObjOccs(o_model, 15, Constants.OT_EVT,  Constants.ST_EV, "Event", 820, 400 ); 

    
    showLogCreate(o_model, ao_objOccsFuncs ); 
    showLogCreate(o_model, ao_objOccsEvents ); 
        
    var ao_objsToDeleteFuncs = ["Function 2", "Function 5", "Function 7", "Function 9"]; 
    var ao_objsToDeleteEvents = ["Event 0", "Event 1", "Event 3", "Event 4", "Event 6", "Event 8"]; 

    // delete Functions
    for(var i = 0; i< ao_objsToDeleteFuncs.length;i++){        
        var b_OK = deleteObjecOcc(o_model, [Constants.ST_FUNC], ao_objsToDeleteFuncs[i]);     
        showLogDelete(o_model, ao_objsToDeleteFuncs[i], b_OK ); 
    }    

    // delete Events
    for(var i = 0; i< ao_objsToDeleteEvents.length;i++){        
        var b_OK = deleteObjecOcc(o_model, [Constants.ST_EV], ao_objsToDeleteEvents[i]);     
        showLogDelete(o_model, ao_objsToDeleteEvents[i], b_OK ); 
    }

}


function showLogDelete(o_model, s_objOccName, b_OK ){
    if(b_OK){
        Dialogs.MsgBox('Object with name "' + s_objOccName +  '" was deleted in model "' + o_model.Name(g_nLoc) + '" of type ' + o_model.Type());             
    }else{
        Dialogs.MsgBox('Object with name "' + s_objOccName +  '" was NOT deleted in model "' + o_model.Name(g_nLoc) + '" of type "' + o_model.Type()) + '".';             
    }
}


function showLogCreate(o_model, ao_objOccs ){
    if(ao_objOccs.length > 0 ){
        Dialogs.MsgBox('The following items were created in the model "' + o_model.Name(g_nLoc) + '" of type "'  + o_model.Type() + '": ' + "\n" + showList(ao_objOccs, g_nLoc));         
    }else{
         // error:
        Dialogs.MsgBox('No items were created in the model "' + o_model.Name(g_nLoc) + '".' );         
    }
}


function createModel(n_type, s_name){    
    o_model = g_oGroup.CreateModel(n_type, s_name, g_nLoc);
    if(o_model){
        Dialogs.MsgBox('Model of type "' + o_model.Type() + '" and name "' + s_name + '" was successfully created.'); 
        return o_model; 
    }   
    Dialogs.MsgBox('Model of type "' + o_model.Type() + '" and name "' + s_name + '" could not be created.'); 
    return null; 
}

                                                                         
function createObjOccs(o_model, n_count, n_objDefType,  n_objOccsSymbolType, s_objOccName, n_X, n_factorY ){
    if(o_model){
        var ao_objOccs = []; 

        for(i=0; i < n_count; i++){        
            
            // crete obj definitions for the ARIS object (they are created in the group)    
            var o_objDef = g_oGroup.CreateObjDef( n_objDefType, s_objOccName + " " + i , g_nLoc );
            
            if(o_objDef){            
                // create obj occ. of the obj def in the modell  
                var o_objOcc = o_model.createObjOcc( n_objOccsSymbolType, o_objDef, n_X, i * n_factorY, true );                           
                
                if(o_objOcc){
                    // Function object was succsessfully created . Add it to the list of obj defs. 
                    ao_objOccs.push(o_objDef);          
                }else{
                    Dialogs.MsgBox("Object occurence could not be created in the model.");         
                }                       
            }else{
                // error:
                Dialogs.MsgBox("Object definition could not be created.");         
            }                     
        }
        return ao_objOccs; 
    }else{
        Dialogs.MsgBox("Not valid model.");         
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


/**
* Deletes an obj occ by name
*@param o_model -> obj Model 
*@param s_name -> String name of the obj occ to be deleted
*@returns boolean (true if successfully deleted , false if not)
*/
function deleteObjecOcc(o_model, an_symbolTypes,  s_name){    
    var ao_objOccs = o_model.ObjOccListBySymbol(an_symbolTypes);  
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
