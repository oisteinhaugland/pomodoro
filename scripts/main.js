
/***********************************************
TODOS
- Get the STOP function working
- swith to break timer when timer reaches 0
	- how to check if interval is running
	- and check if timer hits zero.
- switch to session timer when break timer reaches 0
	- how to check if interval is running
	- and check if timer hits zero.
- make session and break timers go no lower than 1 minute
- add sound on both timer ends
- add sexy styling
- set up github pages
**********************************************/


/*start values in seconds*/
var sessionTime = 1500;
var breakTime = 300;
var temp = 0;

var session = $("#sessionTimer");
var b = $("#breakTimer");
var clock = $("#bigAssClock");


/*function that returns time*/
function time(seconds){
var hours =  Math.floor(seconds / 3600)
var minutes = Math.floor(( seconds / 60 ) % 60)
var rest = seconds % 60


	if (hours   < 10) {hours   = "0"+hours;}  
	if (minutes < 10) {minutes = "0"+minutes;}  
	if (rest < 10) {rest = "0"+rest;}
	if (hours > 0) {
		return  hours + ':' + minutes + ':' + rest	
	} else {
		return  minutes + ':' + rest	
	}
}

var intervals;
function update() {
	sessionTime -= 1 
	clock.html(time(sessionTime))
}

function start() {
	intervals = setInterval(update,1000);

}

function pause(){
	clearInterval(intervals);
}

function reset() {
	sessionTime = 1500;
	breakTime = 300;
	session.html(time(sessionTime));
	b.html(time(breakTime));
	clock.html(time(sessionTime))
	pause();
}

function stop(){
	
}



$(document).ready(function(){
	/*Initalize values*/
	

	session.html(time(sessionTime));
	b.html(time(breakTime));
	clock.html(time(sessionTime));

	/*Session timer Clicks*/
	$("#sessionUp").on('click', function(){
		sessionTime += 60
		session.html(time(sessionTime))
		clock.html(time(sessionTime))
	});

	$("#sessionDown").on('click', function(){
		sessionTime -= 60
		session.html(time(sessionTime))
		clock.html(time(sessionTime))
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


	/*start functionality*/
	

	$("#start").on('click', function(){
		start();
		$(this).prop('disabled', true);
	});
	$("#pause").on('click', function(){
		pause();
		$("#start").prop('disabled', false);
	});

	$("#stop").on('click', function(){
		stop();
		$("#start").prop('disabled', false);
	});

	$("#reset").on('click', function(){
		reset();
		$("#start").prop('disabled', false);

	});

});


