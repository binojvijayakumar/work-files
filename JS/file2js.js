$.getScript("https://wzrd.in/standalone/mime@latest");
function getFile(filedata, fileName) {    
    var data = new File([filedata], fileName, {
        type: mime.getType(fileName)
    });
    console.log(data);
};