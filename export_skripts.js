
const gExportAsZip = false; //set to true if all ".arx" files should export als ".zip" files extension
const gExportAsExtractedFiles = true; //set to true if all script files should be extract as files
const COMMON_FILES = "commonFiles";
const FILENAME_EXPORT = "script-export-%1.zip";
const g_idsOutput=Context.createOutputObject();
const g_sTempDir=g_idsOutput.getCurrentPath() + java.io.File.separator + "tmp";

const g_simpleDateFormat = new java.text.SimpleDateFormat("yyyyMMddHHmmss");

var scriptAdminComponent = Context.getComponent("ScriptAdmin");

var relevantCategory = [COMMON_FILES,   "_FFIL", 
                                        "_Ivan_Ivanov",                                        
                                        "_administration", 
                                        "_TNU"
                                        ];
var exportScriptItemList = [];

Array.prototype.contains = function(element){
    for (var j12=0; j12<this.length; j12++){
        if (null != this[j12]){
            if (this[j12].toString().equals(element.toString())) return true;
        }
    }
    return false;
}



function main() {
   
   var scriptComponentsList = scriptAdminComponent.getScriptComponents();  
    
   scriptComponentsList.forEach( function( scriptComponent ) {
       
            var categoriesList = scriptAdminComponent.getCategories(scriptComponent.getComponentID(), Context.getSelectedLanguage() );
            
            //export for common files
            if( scriptComponent.getComponentID() == 0 && categoriesList.length == 0) 
            {
                processScriptInformation(scriptComponent, null);
            }  
            if( scriptComponent.getComponentID() == 1 ) //only report scripts
            {                            
                categoriesList.forEach( function( category ) {
                    processScriptInformation(scriptComponent, category);                  
                });
            }
            
   });
    
   var zipUtils = new myZipUtils(); 
   
   if( gExportAsExtractedFiles ) {
        extractAllScriptsToFile( zipUtils ); 
   } else {
        zipUtils.writeScriptItemsToZipFile( exportScriptItemList );
   }
   
   //return file to client
   Context.addOutputFileName( zipUtils.getOutputFilePath() );
   Context.setSelectedFile( zipUtils.getOutputFilePath() );
}

function extractAllScriptsToFile( zipUtils ) {
    //extract all scripts and zip the result to a file
    var fileList = [];
    
    //extract all scripts
    zipUtils.extractScriptItems( exportScriptItemList );
    
    var directoryToZip = new java.io.File(g_idsOutput.getCurrentPath());
    zipUtils.getAllFiles(directoryToZip, fileList);
    //creating zip file
    zipUtils.writeZipFile(directoryToZip, fileList);
}


function processScriptInformation(scriptComponent, category) {
    var categoryId = (category == null ? null : category.getCategoryID());
    var categoryName = (category == null ? COMMON_FILES : category.getName());
    
    if( relevantCategory.contains( categoryName ) ) { 
        var scriptInformationList = scriptAdminComponent.getScriptInfos(scriptComponent.getComponentID(), categoryId, Context.getSelectedLanguage());
        scriptInformationList.forEach( function( scriptInformtionItem ) {
    
            exportScript( scriptInformtionItem, categoryId, categoryName, scriptComponent );     
            
        });  
    }
    
}

function exportScript( scriptInformtionItem, categoryId, categoryName, scriptComponent ) {
   
    var exportData = null;
        try{
            if ( scriptInformtionItem.isSimpleFile() ){
                var exportFile = scriptAdminComponent.exportFile(scriptComponent.getComponentID(), categoryId, scriptInformtionItem.getID() )
                if( exportFile != null ) {
                    exportData = exportFile.getData();
                } else {
                    // exportFile not valid    
                }
            } else {           
                exportData = scriptAdminComponent.exportScript(scriptComponent.getComponentID(), scriptInformtionItem.getID(), []);
            }
            if( exportData != null ) {
                
                var fileName = correctFileSystemString(scriptInformtionItem.getName()) + getCorrectExtension(scriptInformtionItem, scriptComponent);
                var filePath = "categories" + "\\" + correctFileSystemString( categoryName );
                if( categoryName == COMMON_FILES ) {
                    filePath = COMMON_FILES;    
                }
                
                exportScriptItemList.push( new ScriptItem( filePath + "\\" + fileName, exportData) );
            }
        } catch(e) {
            // error  
        }    
}




function ScriptItem( fileName, data) {
    this.fileName = fileName;
    this.data = data;
}


function getCorrectExtension( scriptInformtionItem, scriptComponent ){
    var sExt = "";
    var scriptComponentId = scriptComponent.getComponentID();
    if (!scriptInformtionItem.isSimpleFile() ){
        
        if( gExportAsZip ) {
            scriptComponentId = -1;    
        }
        
        switch( scriptComponentId ){
            // case 0: sExt
            case 1: sExt = ".arx"; break;
            case 3: sExt = ".asx"; break;
            case 7: sExt = ".amx"; break;
            case -1: sExt = ".zip"; break; // 
            default: sExt = "";
        }
    }
    return sExt;
}

function correctFileSystemString( str ) {
    var javaString = new java.lang.String( str );
    //javaString = javaString.replaceAll("[^a-zA-Z0-9.-]", "_");
    javaString = javaString.replaceAll("[\\/:*?\"<>|]", "_");
    return javaString;
}



function myZipUtils() {
    

    var fileName = "script-export-%1.zip";
    var sOutputFileName = fileName.replace("%1", g_simpleDateFormat.format(new java.util.Date()));
    var sOutputPath = g_idsOutput.getCurrentPath();
    var sOutputFilePath = sOutputPath + java.io.File.separator + sOutputFileName;
    
    this.getOutputFilePath = function() {
        return sOutputFilePath;   
    }
    
    this.getAllFiles = function(dir, fileList) {

        var files = dir.listFiles();
        files.forEach( function( file ) {
        
            fileList.push(file);
            if (file.isDirectory()) {
                
                this.getAllFiles(file, fileList);
                
            } 
        },this);
                               
                }

                this.writeZipFile = function(directoryToZip, fileList) {
                                               var fos = new java.io.FileOutputStream( sOutputFilePath );
                                               var zos = new java.util.zip.ZipOutputStream(fos, java.nio.charset.StandardCharsets.UTF_8);

                                               fileList.forEach( function( file ) {
            
                                                               if (!file.isDirectory()) { // we only zip files, not directories
                                                                               this.addToZip(directoryToZip, file, zos);
                                                               }
                
                                               },this);
                                               zos.close();
                                               fos.close();
                }

                this.addToZip = function(directoryToZip, file, zos) {

                               var fis = new java.io.FileInputStream(file);

                               // we want the zipEntry's path to be a relative path that is relative
                               // to the directory being zipped, so chop off the rest of the path
                               var zipFilePath = file.getCanonicalPath().substring(directoryToZip.getCanonicalPath().length() + 1, file.getCanonicalPath().length());
                               
                               var zipEntry = new java.util.zip.ZipEntry(zipFilePath);
                               zos.putNextEntry(zipEntry);

                               
        var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024)
                               var length = 0;
                               while ((length = fis.read(bytes)) >= 0) {
                                               zos.write(bytes, 0, length);
                               }

                               zos.closeEntry();
                               fis.close();
                }
    
    this.writeScriptItemsToZipFile = function( exportScriptItemList ) {

        var fileOutput=new java.io.File( sOutputFilePath );
        var fileOutputStream = new java.io.FileOutputStream(fileOutput);       
        var zipOutputStream = new java.util.zip.ZipOutputStream(fileOutputStream, java.nio.charset.StandardCharsets.UTF_8);
        
        exportScriptItemList.forEach( function( scriptItem ) {
            var zipEntry = new java.util.zip.ZipEntry( scriptItem.fileName );
            zipOutputStream.putNextEntry(zipEntry);
            zipOutputStream.write( scriptItem.data );
            zipOutputStream.closeEntry();
        });
    
        zipOutputStream.flush();
        fileOutputStream.flush();
        zipOutputStream.close();
        fileOutputStream.close();    
           
    }
    
    this.extractScriptItems = function( exportScriptItemList ) {
        exportScriptItemList.forEach( function( scriptItem ) {
           
            var fn = scriptItem.fileName
            var suffix = fn.substring(fn.indexOf("."), fn.length);
            if(".arx" == suffix || ".zip" == suffix) {
               var zipInputStream = new java.util.zip.ZipInputStream(new java.io.ByteArrayInputStream(scriptItem.data));
        
                var zipEntry = zipInputStream.getNextEntry();
                while(zipEntry != null){
                    var fileName = zipEntry.getName()+"";
                    var sFileExt =  fileName.split(".")[fileName.split(".").length-1];

                    var newFile = new java.io.File(sOutputPath + java.io.File.separator + fn + java.io.File.separator + fileName);
                    new java.io.File(newFile.getParent()).mkdirs()
                    
                    /*var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
                    var fos = new java.io.FileOutputStream(newFile);
                    var len = 0;
                    while ((len = zipInputStream.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }
                    fos.close(); */
                    this.writeOutputStream( newFile, zipInputStream);
                    zipEntry = zipInputStream.getNextEntry();
                    
                } 
            } else {
                var newFile = new java.io.File(sOutputPath + java.io.File.separator + fn);
                new java.io.File(newFile.getParent()).mkdirs()
                var inputStream = new java.io.ByteArrayInputStream(scriptItem.data); 
                this.writeOutputStream( newFile, inputStream);
            }
             
        }, this);            
    }
    
    this.writeOutputStream = function( file, inputStream ) {
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
        var fos = new java.io.FileOutputStream(file);
        var len = 0;
        while ((len = inputStream.read(buffer)) > 0) {
            fos.write(buffer, 0, len);
        }
        fos.close();    
    }
    
}


main();

