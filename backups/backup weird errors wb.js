// writer's blocks -- by (and for) justin wolfe
var spacesTyped = 0;
var textDisplayed = false;
var menuDisplayed = false;
var obliqueString = "Abandon normal instruments,Accept advice,Accretion,A line has two sides,Allow an easement (an easement is the abandonment of a stricture),Always first steps,Are there sections?  Consider transitions,Ask people to work against their better judgement,Ask your body,Assemble some of the elements in a group and treat the group,Balance the consistency principle with the inconsistency principle,Be dirty,Be extravagant,Be less critical more often,Breathe more deeply,Bridges -build -burn,Cascades,Change instrument roles,Change nothing and continue with immaculate consistency,Children -speaking -singing,Cluster analysis,Consider different fading systems,Consult other sources -promising -unpromising,Courage!,Cut a vital connection,Decorate,Define an area as 'safe' and use it as an anchor,Destroy -nothing -the most important thing,Discard an axiom,Disciplined self-indulgence,Disconnect from desire,Discover the recipes you are using and abandon them,Distorting time,Do nothing for as long as possible,Don't be afraid of things because they're easy to do,Don't be frightened of cliches,Don't be frightened to display your talents,Don't break the silence,Don't stress one thing more than another,Do something boring,Do the words need changing?,Do we need holes?,Emphasise differences,Emphasise repetitions,Emphasise the flaws,Fill every beat with something,From nothing to more than nothing,Ghost echoes,Give the game away,Give way to your worst impulse,Go outside. Shut the door.,Go slowly all the way round the outside,Go to an extreme,Move back to a more comfortable place,Honor thy error as a hidden intention,How would you have done it?,Humanise something free of error,Idiot glee (?),Imagine the piece as a set of disconnected events,Infinitesimal gradations,Intentions -nobility of -humility of -credibility of,In total darkness,In a very large room,Very quietly,Into the impossible,Is it finished?,Is the intonation correct?,Is there something missing?,It is quite possible (after all),Just carry on,Listen to the quiet voice,Look at the order in which you do things,Look closely at the most embarrassing details and amplify them,Lost in useless territory,Lowest common denominator,Make a blank valuable by putting it in an exquisite frame,Make an exhaustive list of everything you might do and do the last thing on the list,Make a sudden destructive unpredictable action; incorporate,Mechanicalise something idiosyncratic,Mute and continue,Not building a wall but making a brick,Once the search is in progress something will be found,Only a part not the whole,Only one element of each kind,(Organic) machinery,Overtly resist change,Question the heroic approach,Remember those quiet evenings,Remove ambiguities and convert to specifics,Remove specifics and convert to ambiguities,Repetition is a form of change,Retrace your steps,Revaluation (a warm feeling),Reverse,Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap),Simple subtraction,Simply a matter of work,State the problem in words as clearly as possible,Take a break,Take away the elements in order of apparent non-importance,The inconsistency principle,The most important thing is the thing most easily forgotten,The tape is now the music,Think of the radio,Tidy up,Towards the insignificant,Trust in the you of now,Turn it upside down,Use an old idea,Use an unacceptable colour,Use fewer notes,Use filters,Use 'unqualified' people,Water,What are the sections sections of? Imagine a caterpillar moving,What are you really thinking about just now?,What is the reality of the situation?,What mistakes did you make last time?,What wouldn't you do?,What would your closest friend do?,Work at a different speed,Would anybody want it?,You are an engineer,You can only make one dot at a time,You don't have to be ashamed of using your own ideas"
var obliqueArray = new Array();
var gradientMode = true;
var youTubeSearch = ["modernist painting","time lapse","fluxus", "home video", "vintage commercial"];
var wordTarget = 750;
var wordTargetPercentage;

 $(document).ready(function() {
	//setup
	prepareOblique();
	loadSettings();
	$("#processSpace").focus();
	$("#processSpace").click(function(){
		var html = $("#processSpace").val();
		$("#processSpace").val("").val(html);	
	});
	//keydown listeners for typing
	$("#processSpace").keydown(function(event){
		var scrollWindow = $("#displaySpace");
		scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
		var keyPressed = event.keyCode;
		if ((keyPressed >= 48 && keyPressed <= 90) || (keyPressed >= 186 && keyPressed <= 222)){
			$("#displaySpace").append("<span class='block'>x</span>");
		} else if (keyPressed == 32){ 
			spacesTyped = spacesTyped + 1;
			$("#displaySpace").append("<span class='space'>&nbsp;</span>");
			wordTargetPercentage = spacesTyped / wordTarget;
			if (gradientMode == true){
				$("#gradientDiv").css('opacity', wordTargetPercentage);
			};	
		} else if (keyPressed == 8){
			$("#displaySpace :last-child").remove();
		} else if (keyPressed == 13){
			$("#displaySpace").append("<br>");
			var scrollWindow = $("#displaySpace");
			scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
		}
	});	
	//keydown listeners for function keys
	$(document).keydown(function(event){	
		var keyPressed = event.keyCode;
		if (keyPressed == 112){
			event.preventDefault();
			if (menuDisplayed == false){
				$("#menuDiv").append("\
					<div id='menuDisplay'>\
						<div id='titleContainer'><b>writer's_blocks</b>: a drafting tool by justin wolfe</div>\
						<div id='hotKeysContainer'><b>f1</b>: about/settings (you are here), <b>f2/f3</b>: make blocks larger/smaller, <b>f4</b>: reveal text, <b>f5</b>: random youTube video, <b>f6</b>: random word/definition (via Wordnik), <b>f7</b>: random line from Shakespeare sonnet (sonnets json-ified by Sam Dutton), <b>f8</b>: random oblique strategy, <b>f9</b>: send text to email, <b>f10</b>: copy text to clipboard (uses zClip and requires Flash), <b>f11</b>: fullscreen</div>\
						<div id='wordTargetContainer'>target word count: <input type='text' id='wordTargetInput'></input></div>\
						<div id='wordTargetColorContainer'>change screen background-color towards a new color as you progress towards target word count? INITIAL COLOR / NEW COLOR</div>\
						<div id='wordTargetSoundContainer'>play chime sounds to inform you of reaching 25%, 50%, 75%, and 100% of target word count?</div>\
						<div id='localStorageSaveContainer>save settings in localstorage in this browser in this computer for future use?</div>\
					</div>");
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;	
			} else {
				clearMenu();		
			};
		} else if (keyPressed == 113){
			var fontSize = $('#displaySpace').css('font-size');
			fontSize = parseFloat(fontSize);
			fontSize = fontSize - 1;
			$('#displaySpace').css('font-size', fontSize);	
			$('#processSpace').css('font-size', fontSize);	
		} else if (keyPressed == 114){
			event.preventDefault();
			var fontSize = $('#displaySpace').css('font-size');
			fontSize = parseFloat(fontSize);
			fontSize = fontSize + 1;
			$('#displaySpace').css('font-size', fontSize);
			$('#processSpace').css('font-size', fontSize);
		} else if (keyPressed == 115){
			event.preventDefault();
			if (textDisplayed == false){
				$("#processSpace").css('opacity', 1);
				textDisplayed = true;
			} else {
				$("#processSpace").css('opacity', 0);
				textDisplayed = false;
			}
		} else if (keyPressed == 116){
			event.preventDefault();
			if (menuDisplayed == false){
				var randomYouTubeSearch = Math.floor((Math.random()*youTubeSearch.length)+0);
				$.getJSON('https://gdata.youtube.com/feeds/api/videos?q=' + youTubeSearch[randomYouTubeSearch] + '&v=2&max-results=10&alt=jsonc', function(data) {
					console.log(data);
					var randomVideo = Math.floor((Math.random()*data.data.items.length)+0);
					var randomVideoID = data.data.items[randomVideo].id;
					console.log(randomVideoID);
					$("#menuDiv").fadeIn(250, function(){});
					$("#menuDiv").append('<div id="youtubeDisplay"><object width="560" height="315"><param name="movie" value="http://www.youtube.com/v/' + randomVideoID + '?version=3&amp;hl=en_US&amp;rel=0&autoplay=1&controls=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + randomVideoID + '?version=3&amp;hl=en_US&amp;rel=0&autoplay=1&controls=0" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>');
					menuDisplayed = true;	
				});			
			} else {
				clearMenu();		
			};
		} else if (keyPressed == 117){
			event.preventDefault();
			if (menuDisplayed == false){
				var randomWord;
				var randomDefinition;
				$.getJSON("http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
					console.log(data);
					randomWord = data.word;
					console.log(randomWord);
					$.getJSON("http://api.wordnik.com/v4/word.json/" + randomWord + "/definitions?limit=50&includeRelated=true&useCanonical=true&includeTags=false&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
						console.log(data);
						randomDefinition = data[0].text;
						$("#menuDiv").append("\
							<div id='dictionaryDisplay'>\
								<div id='wordDisplay'></div>\
								<div id='definitionDisplay'></div>\
							</div>");
						$("#wordDisplay").text(randomWord);
						$("#definitionDisplay").text(randomDefinition);
						$("#menuDiv").fadeIn(250, function(){});
						menuDisplayed = true;
					});
				});
			} else {
				clearMenu();
			}
		} else if (keyPressed == 118){	
			event.preventDefault();
			// sonnets encoded in json by Sam Dutton
			if (menuDisplayed == false){
				$.getJSON('sonnets.json', function(data) {
					console.log(data);
					var randomSonnet = Math.floor((Math.random()*data.length)+0);
					var randomLine = Math.floor((Math.random()*13)+0);
					var sonnetLine = data[randomSonnet].lines[randomLine];
					$("#menuDiv").append("<div id='sonnetDisplay'></div>");
					$("#sonnetDisplay").text(sonnetLine);					
				}); 				
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;
			} else {
				clearMenu();
			};				
		} else if (keyPressed == 119){
			if (menuDisplayed == false){
				var randomOblique = Math.floor((Math.random()*obliqueArray.length)+0);
				$("#menuDiv").append("<div id='obliqueStrategyDisplay'></div>");
				$("#obliqueStrategyDisplay").text(obliqueArray[randomOblique]); 				
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;
			} else {
				clearMenu();
			};			
		} else if (keyPressed == 120){
			if (menuDisplayed == false){
				$("#menuDiv").append("\
					<div id='emailDisplay'>\
						<div id='titleDisplay'><div id='innerTitle'>title: <input type='text' id='processEmailTitle'></input></div></div>\
						<div id='addressDisplay'><div id='innerAddress'>email: <input type='text' id='processEmailAddress'></input></div></div>\
						<div id='sendDisplay'><div id='sendButton'>send</div></div>\
					</div>");
				$("#processEmailAddress").val("justin.wolfe@gmail.com");	
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;	
				$("#sendButton").click(function(){
					emailTitle = $('#processEmailTitle').val();
					emailAddress = $('#processEmailAddress').val();
				//if there is a title and a valid email address in there
					$.ajax({
					   type: "POST",
					   url: "email.php",
					   dataType: 'text',
					   data: { 
							blockText : $('#processSpace').val(),
							blockEmail : emailAddress,
							blockTitle : emailTitle
					   },
					   success: function(data) {
						$("#menuDiv").html("");
						$("#menuDiv").text("success!");
						setTimeout(function(){clearMenu()},1000);
					   },
					   error: function(msg) {
						$("#menuDiv").html("");
						$("#menuDiv").text("something's not working. maybe the server is down? get your text out by going to the menu");
					    setTimeout(function(){clearMenu()},5000);
					   }
					});	
				});
			} else {
				clearMenu();
			};	
		};
	});
});

function prepareOblique(){
	obliqueArray = obliqueString.split(",");
};

function clearMenu(){
	$("#menuDiv").html("");
	$("#menuDiv").css('display', 'none');
	menuDisplayed = false;
	$("#processSpace").focus();
};

function loadSettings(){
};
