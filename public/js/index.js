

function list() {
var fsObj = null;
        var foldedToList = 'C:\\Windows\\System32';

        function listFiles() {
            try {
                fsObj = new ActiveXObject('Scripting.FileSystemObject');
            }
            catch (err) { 
            	console.log("error");
           	}

            if (!fsObj) {
                alert('You must allow the ActiveX object to run!');
            } else {
                if (!fsObj.FolderExists(foldedToList)) {
                    alert('The folder:\n\n' + foldedToList + '\n\ndoes not exist!');
                } else {

                    // at this stage, we can list all files
                    var folderObj = fsObj.GetFolder(foldedToList);
                    var filesObj = new Enumerator(folderObj.files);
                    filesStr = '';
                    while (!filesObj.atEnd()) {
                        var tempFile = filesObj.item();
                        filesStr += '<a href="' + tempFile.Path + '">' + tempFile.Name + '</a><br>';
                        filesObj.moveNext();
                    }
                    console.log(filesStr);
                    document.getElementById('fileList').innerHTML = filesStr;
                }
            }
        }
}

window.onload = function() {


    $('.test').click( function() {
        alert("you have clicked me and for some reason it's wokring.");
    });
	
}