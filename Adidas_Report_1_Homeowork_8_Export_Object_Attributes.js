/*
*   
*   Ivan Ivanov
*   16.03.2021 
*/

var g_DB = ArisData.getActiveDatabase();   
var g_nLoc = Context.getSelectedLanguage();
var g_oModel = ArisData.getSelectedModels()[0];         
var g_hasError = false;     
var g_bCanceled = false;          // Cancel Button of Dialog 
   
const FILTER_ADIDAS = "63181a40-4aa6-11e7-2448-005056bd44d2"; 
const g_oAdidasFilter = ArisData.ActiveFilter();
 
const AT_ADIDAS_ATTRIBUTES_GENERAL = att("d005cb11-5263-11e7-2448-005056bd44d2"); 
const s_STOP_REPORT_EXECUTION = "Stopping execution of the report.";

//Logging
var date = java.text.SimpleDateFormat("yyyy-MM-dd_HHmm").format(new Date());
var g_sLogFileName = date + "_"  + g_oModel.Name(g_nLoc) +  "_ObjectandAttributeExport.xlsx";
var g_oLogger = new CustomOutputManager(g_sLogFileName);


function main(){                                                     
                 
    var ao_objDefsInModel = g_oModel.ObjDefList();                                           
    if(ao_objDefsInModel.length == 0){
        Dialogs.MsgBox("No objects in the model."); 
        g_hasError = true;     
    }
                                                                                                                                                                  
    if(g_hasError){       
        Dialogs.MsgBox(s_STOP_REPORT_EXECUTION); 
    }else{                                                   
        

        var o_DialogVariables = showStartScreen();      // Return type : {objects: [], attr: string};                 
        

        if(!g_bCanceled){           
           var n_AttrNum = getAttrNum(o_DialogVariables.attr);            
            
            g_oLogger.initOutputFile();    
            var oHeaderValues = {     
                Col_1: {name:"Object Name",             width: 9000},           
                Col_2: {name:"Object Type",             width: 6000},           
                Col_3: {name:"Object GUID",             width: 10000},                       
                Col_4: {name:"Attribute " + '"' + g_oAdidasFilter.AttrTypeName(n_AttrNum) + '"' + " ( ID: " + g_oAdidasFilter.getAPIName(Constants.CID_ATTRDEF, n_AttrNum) + " ) ", width: 20000}         
            };     
            g_oLogger.changeSheetName("Protocol");
            g_oLogger.writeHeader(oHeaderValues);
            
            for(var i=0; i<o_DialogVariables.objects.length; i++ ){
                var s_ObjectGUID = o_DialogVariables.objects[i].GUID();                 
                g_oLogger.writeRowValue(o_DialogVariables.objects[i].Name(g_nLoc),o_DialogVariables.objects[i].Type(), s_ObjectGUID, g_DB.FindGUID(s_ObjectGUID, Constants.CID_OBJDEF ).Attribute(n_AttrNum, g_nLoc).getValue());
            }
                                   
            g_oLogger.closeOutputFile();        
            var btFile = Context.getFile(g_sLogFileName, Constants.LOCATION_OUTPUT);         
        }else{
            Dialogs.MsgBox(s_STOP_REPORT_EXECUTION); 
        }              
    }         
}


// ***********   DIALOG  ***********  // 

/**
* Display the dialogue and return the information collected.
*/
function showStartScreen(){      
    var dialogVariables = Dialogs.showDialog(new optionsDialog(), Constants.DIALOG_TYPE_WIZARD, "Choose Attribute and Objects");   
    return dialogVariables; 
}

/**
* Constructor for the dialogue
*/
function optionsDialog(){                 
             
   this.getPages = function(){
      var iDialogTemplate1 = Dialogs.createNewDialogTemplate(600, 280, "Select objects and attributes")                  
      
      iDialogTemplate1.CheckBox(20, 30, 300, 15, "Include objects in assigned models", "CHECKBOX_1");  
               
      iDialogTemplate1.Text(110, 85, 100, 16, "Attributes");
      iDialogTemplate1.ListBox(20, 100, 230, 80, [], "attributes");  
      
      iDialogTemplate1.Text(410, 85, 100, 16, "Selected Attribute"); 
      iDialogTemplate1.ListBox(350, 100, 230, 80, [], "selected_attributes");   
      
      iDialogTemplate1.PushButton(260, 135, 80, 15, "Add -->", "ADD_BUTTON_ATTR");  
      iDialogTemplate1.PushButton(260, 160, 80, 15, "X Remove", "REMOVE_BUTTON_ATTR");                
        
      iDialogTemplate1.Text(110, 185, 100, 16, "Objects");
      iDialogTemplate1.ListBox(20, 200, 230, 80, [], "objects");  
                                        
      iDialogTemplate1.Text(410, 185, 100, 16, "Selected Objects"); 
      iDialogTemplate1.ListBox(350, 200, 230, 80, [], "selected_objects");   
                                
      iDialogTemplate1.PushButton(260, 235, 80, 15, "Add -->", "ADD_BUTTON");  
      iDialogTemplate1.PushButton(260, 260, 80, 15, "X Remove", "REMOVE_BUTTON");  
                                                                  
      return [iDialogTemplate1];
  }      
        
    this.init = function(aPages){                
        
        //** Attributes
        this.as_Attributes = [];    // all attributes from the adidas filter
        this.as_SelectedAttr = [];  
        this.an_AttributesToExport = []; 
               
        var an_allAtrsOfGroup = g_oAdidasFilter.AttrTypesOfAttrGroup(AT_ADIDAS_ATTRIBUTES_GENERAL, true); 
        
        for(var i=0; i<an_allAtrsOfGroup.length; i++){
            var s_AttrNameAndTypeNum = g_oAdidasFilter.AttrTypeName(an_allAtrsOfGroup[i]) + " ( " + an_allAtrsOfGroup[i] + " ) "; 
            this.as_Attributes.push(s_AttrNameAndTypeNum);      
        }
             
        //** Objects
        this.ao_SelectedObjects = [];
        this.ao_ObjectsToExport = [];           
        
        // Get objects 
        this.updateOjects();          
               
        this.dialog.getPage(0).getDialogElement("attributes").setItems(this.as_Attributes.sort());           
     }
     
     // returns true if the page is in a valid state. In this case "Ok", "Finish", or "Next" is enabled.
     // called each time a dialog value is changed by the user (button pressed, list selection, text field value, table entry, radio button,...)
     // pageNumber: the current page number, 0-based         
     this.isInValidState = function(pageNumber){
        this.updateValidity();  
        return this.b_Valid; 
     }
     
     
     this.b_Valid = false;    // OK button grayed out at first    
     
     
     this.updateValidity = function() 
     {                
        if(this.an_AttributesToExport.length > 0 && this.ao_ObjectsToExport.length > 0 ){
            this.b_Valid = true;     
        }else{
            this.b_Valid = false;     
        }                           
     }
    
     // called when the page is displayed
     // pageNumber: the current page number, 0-based
     // optional     
     this.onActivatePage = function(pageNumber)
     {
     }
            
     // returns true if the "Finish" or "Ok" button should be visible on this page.
     // pageNumber: the current page number, 0-based
     // optional. if not present: always true
     this.canFinish = function(pageNumber)
     {       
        // OK button is grayed out at first 
        // if objects and attributes have been chosen it is aktiv again              
        this.updateValidity();  
        return this.b_Valid;            
      }
    
     // returns true if the user can switch to another page.
     // pageNumber: the current page number, 0-based
     // optional. if not present: always true
     this.canChangePage = function(pageNumber)
     {
        return true;
     }
    
     // returns true if the user can switch to next page.
     // called when the "Next" button is pressed and thus not suitable for activation/deactivation of this button
     // can prevent the display of the next page
     // pageNumber: the current page number, 0-based
     // optional. if not present: always true
     this.canGotoNextPage = function(pageNumber)
     {
        return true;
     }
    
     // returns true if the user can switch to previous page.
     // called when the "Back" button is pressed and thus not suitable for activation/deactivation of this button
     // can prevent the display of the previous page
     // pageNumber: the current page number, 0-based
     // optional. if not present: always true
     this.canGotoPreviousPage = function(pageNumber)
     {
        return true;
     }
    
     // called after "Ok"/"Finish" has been pressed and the current state data has been applied
     // can be used to update your data
     // pageNumber: the current page number
     // bOK: true=Ok/finish, false=cancel pressed
     // optional
     this.onClose = function(pageNumber, bOk)
     {         
        if(!bOk){
             g_bCanceled =  true;         
         }                  
     }
    
    
     // the result of this function is returned as result of Dialogs.showDialog(). Can be any object.
     // optional
     this.getResult = function()
     {                               
        var s_attrGUID = ""; 
        var s_attrAPIName = "";         
        var n_attrNum = Number(getAttrNum(this.as_SelectedAttr)); 
        
        try{
            s_attrGUID = g_oAdidasFilter.UserDefinedAttributeTypeGUID(n_attrNum); 
            s_attrAPIName = g_oAdidasFilter.getOriginalAttrTypeName(n_attrNum); 
        }catch(e){}        
        
        return {objects: this.ao_ObjectsToExport, attr: this.as_SelectedAttr, attrGUID: s_attrGUID, attrAPIName: s_attrAPIName };       
     }
     
        
     this.CHECKBOX_1_selChanged = function (newSelection)
     {
        this.updateOjects();
     }
     
     
     this.updateOjects = function() {     
        var b_includeAssignments = this.dialog.getPage(0).getDialogElement("CHECKBOX_1").isChecked();         
        if(b_includeAssignments){
          this.ao_Objects = getObjsInAssignedModels(g_oModel);           
        }else{
           this.ao_Objects = g_oModel.ObjDefList(); 
        } 
        this.dialog.getPage(0).getDialogElement("objects").setItems(showObjNameAndType(this.ao_Objects));                           
     }
     
     
     this.ADD_BUTTON_ATTR_pressed = function()
     {        
        var a_nValueIndex = this.dialog.getPage(0).getDialogElement("attributes").getSelection();
        
        if(a_nValueIndex != null && a_nValueIndex.length > 0){        
            var attribute = this.as_Attributes[a_nValueIndex];
            if (!itemExists(this.as_SelectedAttr, attribute) && this.as_SelectedAttr.length == 0 ){                
                this.as_SelectedAttr.push(attribute);
                this.an_AttributesToExport.push(attribute);                  
                this.dialog.getPage(0).getDialogElement("selected_attributes").setItems(this.as_SelectedAttr);                
            }
        }
        this.updateValidity();        
     }
     
   
     this.REMOVE_BUTTON_ATTR_pressed = function()
     {                      
        var a_nValueIndex = this.dialog.getPage(0).getDialogElement("selected_attributes").getSelection(); 
        if(a_nValueIndex != null && a_nValueIndex.length > 0){         
            this.as_SelectedAttr.splice(a_nValueIndex[0], 1);     
            this.an_AttributesToExport.splice(a_nValueIndex[0], 1);                                            
            this.dialog.getPage(0).getDialogElement("selected_attributes").setItems(this.as_SelectedAttr);                                                   
        }
        this.updateValidity();        
     } 
     
     
     this.ADD_BUTTON_pressed = function()
     {        
        var a_nValueIndex = this.dialog.getPage(0).getDialogElement("objects").getSelection();
        
        if(a_nValueIndex != null && a_nValueIndex.length > 0){        
            var objectObjDef = this.ao_Objects[a_nValueIndex];
            if (!itemExists(this.ao_SelectedObjects, objectObjDef)){                
                this.ao_SelectedObjects.push(objectObjDef);
                this.ao_ObjectsToExport.push(objectObjDef);
                this.dialog.getPage(0).getDialogElement("selected_objects").setItems(showObjNameAndType(this.ao_SelectedObjects));
            }
        }
        this.updateValidity();        
     }


     this.REMOVE_BUTTON_pressed = function()
     {                      
        var a_nValueIndex = this.dialog.getPage(0).getDialogElement("selected_objects").getSelection(); 
        if(a_nValueIndex != null && a_nValueIndex.length > 0){         
            this.ao_SelectedObjects.splice(a_nValueIndex[0], 1);     
            this.ao_ObjectsToExport.splice(a_nValueIndex[0], 1);     
         
            this.dialog.getPage(0).getDialogElement("selected_objects").setItems(showObjNameAndType(this.ao_ObjectsToExport));                                                           
        }
        this.updateValidity();        
     }      
     
     // other methods (all optional):
     // - [ControlID]_pressed(),
     // - [ControlID]_focusChanged(boolean lost=false, gained=true)
     // - [ControlID]_changed() for TextBox and DropListBox
     // - [ControlID]_selChanged(int newSelection)
     // - [ControlID]_cellEdited(row, column) for editable tables, row and column are 0-based
     // SEARCH_BUTTON
}


function showObjNameAndType(ao_Items){   
    if( ao_Items.length > 0 ){    
        return ao_Items.map(function(element){
            return element.Name(g_nLoc) + " (" + element.Type() + ")"; 
        })
    }
    return ao_Items; 
}


function itemExists(a_itemList, item) {
    for (var i=0; i< a_itemList.length; i++){       
        if( a_itemList[i].equals(item)) return true;
    }
    return false;
}


function getAttrNum(s_attr){
    if(s_attr != ""){
        return String(s_attr).substring(String(s_attr).indexOf("( ") + 2, String(s_attr).indexOf(" )"));  
    }
    return null;     
}

// returns objects from assigned model one level deep
function getObjsInAssignedModels(g_oModel){
    var ao_AllObjs = [];  
    
    var ao_ObjDefsInModel = g_oModel.ObjDefList(); 
    for(var i=0; i<ao_ObjDefsInModel.length; i++ ){
        
        var assignModels = ao_ObjDefsInModel[i].AssignedModels(); 
        if(assignModels.length > 0){
            for (var z=0; z<assignModels.length; z++){                
                ao_AllObjs.push(ao_ObjDefsInModel[i]); 
                ao_ObjDefsInAssgnModel = assignModels[z].ObjDefList(); 
                
                for (var j=0; j<ao_ObjDefsInAssgnModel.length; j++){
                    var test = ao_ObjDefsInModel[i].Name(g_nLoc); 
                    if(ao_ObjDefsInAssgnModel[j].GUID() != ao_ObjDefsInModel[i].GUID()){
                        ao_AllObjs.push(ao_ObjDefsInAssgnModel[j]);                     
                    }                    
                }                        
            }            
        }else{
             ao_AllObjs.push(ao_ObjDefsInModel[i])
        }        
    }
    return ao_AllObjs;
}


/** function att()
*  Transfer the specified attribute type GUID to a current attribute type number. 
 *  returns: attribute type number
*  Supported formats:
*  - "f2e211c0-4cf2-11ea-1524-005056849f3d"
*   - Constant.AT_FUNC
*  - 8
*  - "AT_DESC"
*  - "AT_CUSTOM_DESC" (taken from CustomConstants)
*/    
function att(typeNumOrGUID) {
    var returnTypeNum = null;
    try {
        returnTypeNum = ArisData.getActiveDatabase().ActiveFilter().UserDefinedAttributeTypeNum(typeNumOrGUID);  
        if (returnTypeNum==-1) returnTypeNum = null;         
    } catch (e) {};

    if ((returnTypeNum == null) && !isNaN(typeNumOrGUID)) {
        try {
            returnTypeNum = parseInt(typeNumOrGUID);
        } catch (e) {}
    }
    if (returnTypeNum == null && Constants[typeNumOrGUID]!=null) {
        returnTypeNum = Constants[typeNumOrGUID];    
    }   
    if (returnTypeNum == null && typeof CustomConstants !== 'undefined' && CustomConstants[typeNumOrGUID]!=null ) {
        returnTypeNum = CustomConstants[typeNumOrGUID];    
    }      
    if (null == returnTypeNum) throw typeNumOrGUID + "\nis not valid!";
    return returnTypeNum;
}


main();
