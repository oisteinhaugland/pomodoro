
/*start values in seconds*/
var started = false;
var paused = false;
var onBreak = false;
var sessionTime = 1500;
var breakTime = 300;
var temp = 0;
var haveBeenStartedOnce= false;
var tickerOn = false;

var sessionStartValue;
var breakStartValue;

var audio = new Audio('nautical008.mp3');
var tickerAudio = new Audio('clock-ticking-3.mp3');
tickerAudio.loop = true;

var session = $("#sessionTimer");
var b = $("#breakTimer");
var clock = $("#bigAssClock");
var status = $("#status");


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

function start() {
	
	if (!haveBeenStartedOnce){
		sessionStartValue = sessionTime;
		breakStartValue = breakTime;	
		haveBeenStartedOnce = true;
	}
	
	started = true;
	paused = false;
	intervals = setInterval(update,1000);
}

function update() {
	
	if (sessionTime > 0 && !onBreak) {
	sessionTime -= 1;
	clock.html(time(sessionTime));
	} else if (breakTime > 0 && onBreak) {
	breakTime -= 1;
	clock.html(time(breakTime));
	}

	if (sessionTime == 0){
		onBreak = true
		audio.play();
	} else if (breakTime == 0){
		onBreak = false;
		audio.play();
	}

	if (!onBreak){
		breakTime = breakStartValue; 
		$("#status").html("Study Time");
	} else if (onBreak) {
		sessionTime = sessionStartValue;
		$("#status").html("Break Time")
	}
}


function pause(){
	clearInterval(intervals);
	paused = true;
}

function reset() {
	sessionTime = 1500;
	breakTime = 300;
	session.html(time(sessionTime));
	b.html(time(breakTime));
	clock.html(time(sessionTime))
	started = false;
	paused = false;
	pause();
}

function stop(){
	started = false;
	paused = false;
	if (haveBeenStartedOnce){
	sessionTime = sessionStartValue;	
	}
	
	clock.html(time(sessionTime));
	haveBeenStartedOnce = false;
	clearInterval(intervals);
	
}



$(document).ready(function(){
	/*Initalize values*/
	

	session.html(time(sessionTime));
	b.html(time(breakTime));
	clock.html(time(sessionTime));

	/*Session timer Clicks*/
	$("#sessionUp").on('click', function(){
		if (!started){
			sessionTime += 60
			session.html(time(sessionTime))
			clock.html(time(sessionTime))
		}
	});

	$("#sessionDown").on('click', function(){
		if (!started && sessionTime > 60){
			sessionTime -= 60
			session.html(time(sessionTime))
			clock.html(time(sessionTime))
		}
	});

	/*Break timer clicks*/
	$("#breakUp").on('click', function(){
		if (!started ){
			breakTime += 60
			b.html(time(breakTime))
		}
		
	});

	$("#breakDown").on('click', function(){
		if (!started &&  breakTime > 60){
			breakTime -= 60
			b.html(time(breakTime))
		}
	});


	/*start functionality*/
	

	$("#start").on('click', function(){
		if (!started  || paused){
		start();
		}
	});
	$("#pause").on('click', function(){
		pause();
	});

	$("#stop").on('click', function(){
		stop();
	});

	$("#reset").on('click', function(){
		reset();
	});

	$("#tick").on('click', function(){
		if (!tickerOn){
			tickerOn = true;
			$(this).html("Turn Ticker Off ")
			tickerAudio.play();
		} else {
			tickerOn = false;
			$(this).html("Turn Ticker On ")
			tickerAudio.pause();
		}
	});
	

});


