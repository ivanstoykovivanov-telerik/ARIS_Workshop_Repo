


/*
* 
*   Ivan Ivanov
*   30.05.2021 
*/

const UMC_COMPONENT = Context.getComponent("UMC") 
const LOCK_COMPONENT = Context.getComponent("Locking");

var g_nLoc = Context.getSelectedLanguage();
var g_DB = ArisData.getActiveDatabase();
var g_oModel = ArisData.getSelectedModels()[0]; 


//Logging
var date = java.text.SimpleDateFormat("yyyy-MM-dd_HHmm").format(new Date());
var g_sLogFileName = date + "_"  + g_oModel.Name(g_nLoc) +  "_ObjectandAttributeExport.xlsx";
var g_oLogger = new CustomOutputManager(g_sLogFileName);


var g_sMessage = "";              
var g_thereAreMoreModelsInScope = false; 
var g_hasError = false;     


function main(){                                        
      
    //** INIT LOGGING  **//
    g_oLogger.initOutputFile();    
    var oHeaderValues = {     
        Col_1: {name:"First Name",                  width: 9000},           
        Col_2: {name:"Last Name",                   width: 6000},           
        Col_3: {name:"id",                          width: 10000},                       
        Col_4: {name:"e-mail",                      width: 10000},    
        Col_5: {name:"Belongs to Usergroup(s)",     width: 10000},                                             
    };     
    g_oLogger.changeSheetName("Protocol");
    g_oLogger.writeHeader(oHeaderValues);    
                                 
            
    // *** INITIAL CHECKS: *** 
    
    var initialCheckFails = false;  
    if(initialCheckFails){
        Dialogs.MsgBox("Initial check XXXXX produced an error."); 
        g_hasError = true;  
    } 
                                                                                                                                                                                    
    if(g_hasError){       
        Dialogs.MsgBox("Stopping execution of the report."); 
    }else{                                                   
            
        // INITIAL CHECKS ARE CORRECT     
        // Main part of the report can start here: 
        var ao_allUsers = UMC_COMPONENT.getAllUsers().toArray(); 
        //var ao_userLogins = getUserLogins(ao_allUsers.toArray());               
        
        for(var i=0; i < ao_allUsers.length; i++){
            var ao_userGroups = UMC_COMPONENT.getAssignedUsergroupNamesForUser(ao_allUsers[i]).toArray(); 
            
            var s_userGroups = ""; 
            if(ao_userGroups){
                for(var j=0; j < ao_userGroups.length; j++){
                           s_userGroups = s_userGroups + "\n" +  ao_userGroups[j] ;                     
                };  
            }
            g_oLogger.writeRowValue(
                ao_allUsers[i].getFirstName(), 
                ao_allUsers[i].getLastName(), 
                ao_allUsers[i], 
                ao_allUsers[i].getEmail(),              
                s_userGroups                                 
            );                
        } 
            var b = "break";            
    } 
    
    g_oLogger.closeOutputFile();        
    var btFile = Context.getFile(g_sLogFileName, Constants.LOCATION_OUTPUT);   
           
}


/**
* takes an array of UMC user objects and returns an array of Strings composed of Last name, First name, (user-ID)
*/
function getUserTitles(a_userList){
    
    return a_userList.map(
        function(oUser)
        {
            var sLastName = getAttributeValue(oUser, Constants.AT_LAST_NAME);
            var sFirstName = getAttributeValue(oUser, Constants.AT_FIRST_NAME);
 
            var sUserName = "";

            if ((sLastName != null) && (sFirstName != null))
            {
                sUserName = sLastName + ", " + sFirstName + " (" + oUser.Name(g_nLoc) + ")";
            }
            else
            {
                sUserName = oUser.Name(g_nLoc);
            }
 
            return sUserName;
        }
    );
}

/**
* takes an array of UMC user objects and returns an array of user IDs
*/
function getUserLogins(ao_userList){
    var ao_users = [];    
    
    for(var i=0; i < ao_userList.length; i++){
        if(ao_userList[i] != "arisservice"){
            ao_users.push(String(getAttributeValue(ao_userList[i], Constants.AT_NAME)));         
        }        
    }       
    return ao_users ;
}


function getAttributeValue(oItem, nAttrNum){
    var o_Item = oItem.Attribute(nAttrNum, g_nLoc).getValue();
    if(!o_Item){
        Dialogs.MsgBox("Das Attribut " +  nAttrNum + " wurde nicht gepflegt"); 
    }
    return o_Item;
}


main();