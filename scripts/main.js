var sessionTime = 1500;
var breakTime = 300;

function time(seconds){
var hours =  Math.floor(seconds / 3600)
var minutes = Math.floor(( seconds / 60 ) % 60)
var rest = seconds % 60


if (hours   < 10) {hours   = "0"+hours;}  
if (minutes < 10) {minutes = "0"+minutes;}  
if (rest < 10) {rest = "0"+rest;}

return  minutes + ':' + rest
}


$(document).ready(function(){
	/*Initalize values*/
	var session = $("#sessionTimer");
	var b = $("#breakTimer");

	$("#sessionTimer").html(time(sessionTime));
	$("#breakTimer").html(time(breakTime));

	/*Session timer Clicks*/
	$("#sessionUp").on('click', function(){
		sessionTime += 60
		session.html(time(sessionTime))
	});

	$("#sessionDown").on('click', function(){
		sessionTime -= 60
		session.html(time(sessionTime))
	});

	/*Break timer clicks*/
	$("#breakUp").on('click', function(){
		breakTime += 60
		b.html(time(breakTime))
	});

	$("#breakDown").on('click', function(){
		breakTime -= 60
		b.html(time(breakTime))
	});


});


