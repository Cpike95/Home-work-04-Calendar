var saveButton = $("#saveBtn");
var textArea = $(".input-text");
var osTimes = $(".hour");
//on  load Display the current day to the page  
//add if statment to turn the box red and make the others green past dates 
//grey .past .present .future
//

$(document).ready(function getCurrentDate() {
    var today = moment().format('MMMM Do YYYY, h:mm A');
    $("#currentDay").append(today);
    
    var currHour = moment().hour(); 
    getTextString();
    textAreaColor(textArea);
    toDoStore();
    //formatted fuction tot conver the text in the html body into a moment object.
    $(function(){
        function formatDate(osTimes) {
            osTimes.each(function(){
                //get date/time
                osTimes = $(this).text();
    
                //format it
                var timeBlock= moment(osTimes, "h A");
    
                //replace it
                $(this).html(timeBlock.format("h A"));
             });
        };
     formatDate($('.hour'))
    });

    //set text area colors conditonals
        function textAreaColor(textArea) {
            textArea.each(function() {

                if (parseInt($(this).attr('data-hour')) < currHour) {
                    $(this).addClass('past');
                  
                } else if  (parseInt($(this).attr('data-hour')) == currHour) {
                    $(this).addClass('present');
                    
                }  else if (parseInt($(this).attr('data-hour')) > currHour) {
                    $(this).addClass('future');
                    
                };
            });
        
        };
        
    // get the stored text string and 
    function getTextString() {
        var toDoText = JSON.parse(localStorage.getItem('todos'));
        for (var key in toDoText) {
            $('.input-text').each(function() {
                if ($(this).attr('data-hour') == key) {
                    $(this).text(toDoText[key]);
                }
            })  
        }    
        }
    
function toDoStore() {
    
    if(localStorage.getItem('todos') === null){
       var textDay = {}; 
       localStorage.setItem('todos', JSON.stringify(textDay));
    }
}
    function setToDo(event) {
        var values = $(this).siblings('textarea').val();
        var hour = $(this).siblings('textarea').attr('data-hour');
        var toDoList = JSON.parse(localStorage.getItem('todos'));
        toDoList[hour] = values;
        localStorage.setItem('todos', JSON.stringify(toDoList));
    };

    //save the text input to the local storage

    $(".saveBtn").on("click", setToDo);  
});

  
               
    