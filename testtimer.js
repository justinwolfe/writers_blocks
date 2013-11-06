  var mins = 1;  //Set the number of minutes you need
    var secs = mins * 60;
    var currentSeconds = 0;
    var currentMinutes = 0; 
 $(document).ready(function() 
    secs = mins * 60;
    currentSeconds = 0;
    currentMinutes = 0; 
	setTimeout('countDown()',1000);
 });
 
function countDown() {
	currentMinutes = Math.floor(secs / 60);
	currentSeconds = secs % 60;
	if (currentSeconds <= 9){
		currentSeconds = "0" + currentSeconds;
	};	
	secs--;
	$("#timerText").text(currentMinutes + ":" + currentSeconds);       
	if (secs !== -1){
		setTimeout('countDown()',1000);
	};
	if (secs == -1){
		alert("finished!");
	};
};