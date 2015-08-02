var fileInput = document.getElementById("#inp")[0];
fileInput.onchange = function(event){
    var fileList = fileInput.files; 
    console.log(fileList);
}
var currentFileOne = $("#inp")[0].files; 

console.log(currentFileOne);

if(currentFileOne.length > 0){
    var fileName = currentFileOne[0].name; 
    console.log(fileName);
}


//animation emailContainerField
function emailContainerField(focus)
{
    if(focus == 'focus')
    {
        $('#input-email').css('border-color','#F58B52');
    }
    else
    {
        $('#input-email').css('border-color','lightgray');
    }
}


function submitQOne(){
}

//click ugly file input when this button is clicked
function uploadQOne(){
    $('#inp').click();
}