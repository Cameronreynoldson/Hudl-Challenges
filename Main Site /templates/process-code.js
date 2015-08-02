function submitCode(question_number) {
    console.log(question_number);
    var inputLocation = "#inp-"+question_number; 
    var input_file = $(inputLocation)[0].files[0];
    var file_type = (function(){
        var map = {};
        map["c"] = 1;
        map["cpp"] = 2;
        map["java"] = 3;
        map["cs"] = 9;
        map["py"] = 5;
        var lang = (function(){
            var name = input_file.name; 
            var extension = name.split('.').pop().toLowerCase();
            var result = -1;
            if(map[extension] !== undefined) {
             result = map[extension];
         }    
         return result;
     }());
        return lang; 
    }());

    var fr = new FileReader();
    fr.onload = function() { sendData(fr.result)};
    fr.onerror = function() { console.log('error', arguments); };
    fr.readAsText(input_file);

    var sendData = function(txt){
        $.ajax({
            url: "{{ url_for('api_submit_question') }}",
            type: "POST",
            data: {
              'file': txt,
              'lang': file_type,
              'question_number': question_number,
          },
          success: function (response) {
              updateViewAfterSubmission(JSON.parse(response),question_number,txt);
          }
      });
    };

};



function updateViewAfterSubmission(response,question_number,code){
    if(question_number == 1){
        outputCorrect = ["1","2","3"];
    }
    else if(question_number == 2){
        outputCorrect = ["2","3","4"];
    }
    else{
        outputCorrect = ["3","4","5"];
    }
    console.log(response);
    var correct = (function(){
        for(var i = 0; i < response.length; ++i){
            if(response[i] !== outputCorrect[i]){
                return false;
            }
        }
        return true; 
    }());

    var res = (correct) ? "Passed" : "Failed";
    var email_string = "#input-email-"+question_number; 
    var email = $(email_string).val();
    addDataToParse(email,question_number,code,correct);

    var check_string = "#checkmark-"+question_number; 
    var x_string = "#x-"+question_number; 
    if(!correct){
        $(check_string).hide();
        $(x_string).show();
    }
    else{
        $(x_string).hide();
        $(check_string).show();
    }
}

function addDataToParse(thisEmail,problem,sourceCode,passed){
if(thisEmail.length !== 0) {
 var User = Parse.Object.extend("People");
 var query = new Parse.Query(User);
 query.equalTo("email", thisEmail);
 query.find({
   success: function(results) {
     if(results.length !== 0) {
       //This means the person already submitted with this email so just update
       var thisPerson = results[0];
       if(problem === 1) {
         if(thisPerson.get("problem1") !== null) {
           thisPerson.set("problem1", sourceCode);
           thisPerson.set("problem1Passed", passed);
           thisPerson.save();
         }
         else {
           thisPerson.save({
             problem1: sourceCode,
             problem1Passed: passed
           })
         }
       }
       else if(problem === 2) {
         if(thisPerson.get("problem2") !== null) {
           thisPerson.set("problem2", sourceCode);
           thisPerson.set("problem2Passed", passed);
           thisPerson.save();
         }
         else {
           thisPerson.save({
             problem2: sourceCode,
             problem2Passed: passed
           })
         }
       }
       else if(problem === 3) {
         if(thisPerson.get("problem3") !== null) {
           thisPerson.set("problem3", sourceCode);
           thisPerson.set("problem3Passed", passed);
           thisPerson.save();
         }
         else {
           thisPerson.save({
             problem3: sourceCode,
             problem3Passed: passed
           })
         }
       }
     }
     else {
       //User isn't here yet
       var user = new User();
       if(problem === 1) {
         user.save({
           email: thisEmail,
           problem1: sourceCode,
           problem1Passed: passed
         });
       }
       else if(problem === 2) {
         user.save({
           email: thisEmail,
           problem2: sourceCode,
           problem2Passed: passed
         });
       }
       else if(problem === 3) {
         user.save({
           email: thisEmail,
           problem3: sourceCode,
           problem3Passed: passed
         });
       }
     }
     
 },
 error: function(object, error) {
   alert("Error");
 }
});
}
}

///UI stuff

//animation emailContainerField
function emailContainerField(focus,question_number)
{
    var input = "#input-email-"+question_number;
    if(focus == 'focus')
    {
        $(input).css('border-color','#F58B52');
    }
    else
    {
        $(input).css('border-color','lightgray');
    }
}


function submitQOne(){
}

//click ugly file input when this button is clicked
function uploadQOne(question_number){
    var inpn = "#inp-"+question_number;
    console.log(inpn);
    $(inpn).click();
}