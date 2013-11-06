// writer's blocks -- by (and for) justin wolfe
var spacesTyped = 0;
var textDisplayed = false;
var menuDisplayed = false;
var obliqueString = "Abandon normal instruments,Accept advice,Accretion,A line has two sides,Allow an easement (an easement is the abandonment of a stricture),Always first steps,Are there sections?  Consider transitions,Ask people to work against their better judgement,Ask your body,Assemble some of the elements in a group and treat the group,Balance the consistency principle with the inconsistency principle,Be dirty,Be extravagant,Be less critical more often,Breathe more deeply,Bridges -build -burn,Cascades,Change instrument roles,Change nothing and continue with immaculate consistency,Children -speaking -singing,Cluster analysis,Consider different fading systems,Consult other sources -promising -unpromising,Courage!,Cut a vital connection,Decorate,Define an area as 'safe' and use it as an anchor,Destroy -nothing -the most important thing,Discard an axiom,Disciplined self-indulgence,Disconnect from desire,Discover the recipes you are using and abandon them,Distorting time,Do nothing for as long as possible,Don't be afraid of things because they're easy to do,Don't be frightened of cliches,Don't be frightened to display your talents,Don't break the silence,Don't stress one thing more than another,Do something boring,Do the words need changing?,Do we need holes?,Emphasise differences,Emphasise repetitions,Emphasise the flaws,Fill every beat with something,From nothing to more than nothing,Ghost echoes,Give the game away,Give way to your worst impulse,Go outside. Shut the door.,Go slowly all the way round the outside,Go to an extreme,Move back to a more comfortable place,Honor thy error as a hidden intention,How would you have done it?,Humanise something free of error,Idiot glee (?),Imagine the piece as a set of disconnected events,Infinitesimal gradations,Intentions -nobility of -humility of -credibility of,In total darkness,In a very large room,Very quietly,Into the impossible,Is it finished?,Is the intonation correct?,Is there something missing?,It is quite possible (after all),Just carry on,Listen to the quiet voice,Look at the order in which you do things,Look closely at the most embarrassing details and amplify them,Lost in useless territory,Lowest common denominator,Make a blank valuable by putting it in an exquisite frame,Make an exhaustive list of everything you might do and do the last thing on the list,Make a sudden destructive unpredictable action; incorporate,Mechanicalise something idiosyncratic,Mute and continue,Not building a wall but making a brick,Once the search is in progress something will be found,Only a part not the whole,Only one element of each kind,(Organic) machinery,Overtly resist change,Question the heroic approach,Remember those quiet evenings,Remove ambiguities and convert to specifics,Remove specifics and convert to ambiguities,Repetition is a form of change,Retrace your steps,Revaluation (a warm feeling),Reverse,Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap),Simple subtraction,Simply a matter of work,State the problem in words as clearly as possible,Take a break,Take away the elements in order of apparent non-importance,The inconsistency principle,The most important thing is the thing most easily forgotten,The tape is now the music,Think of the radio,Tidy up,Towards the insignificant,Trust in the you of now,Turn it upside down,Use an old idea,Use an unacceptable colour,Use fewer notes,Use filters,Use 'unqualified' people,Water,What are the sections sections of? Imagine a caterpillar moving,What are you really thinking about just now?,What is the reality of the situation?,What mistakes did you make last time?,What wouldn't you do?,What would your closest friend do?,Work at a different speed,Would anybody want it?,You are an engineer,You can only make one dot at a time,You don't have to be ashamed of using your own ideas"
var obliqueArray = new Array();
var gradientMode = true;
var flickrTag = "art";
var wordTarget = 750;
var wordTargetPercentage;

 $(document).ready(function() {
	prepareOblique();
	$("#processSpace").click(function(){
		var html = $("#processSpace").val();
		$("#processSpace").val("").val(html);	
	});
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
		} else if (keyPressed == 112){
			event.preventDefault();
			if (menuDisplayed == false){
				$("menuDiv").append("\
					<div id='menu'>\
						<div id='wordTargetContainer'>Session word count target</div>\
						<div id='wordTargetContainer'>Session word count target</div>\
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
				$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
				{
					tags: flickrTag,
					tagmode: "any",
					format: "json"
				},
				function(data) {
					console.log(data);
					var randomImage = Math.floor((Math.random()*data.items.length)+0);
					$("#menuDiv").append("<div id='imageDisplay'></div>");
					$("<img/>").attr("src", data.items[randomImage].media.m).appendTo("#imageDisplay")
				});
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;				
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
					$.getJSON("http://api.wordnik.com/v4/word.json/" + randomWord + "/definitions?limit=50&includeRelated=true&useCanonical=false&includeTags=false&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
						console.log(data);
						$("#menuDiv").append("<div id='dictionaryDisplay'></div>");
						$("#dictionaryDisplay").text(randomWord);
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
				$("#menuDiv").append("<div id='obliqueStrategy'></div>");
				$("#obliqueStrategy").text(obliqueArray[randomOblique]); 				
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;
			} else {
				clearMenu();
			};			
		} else if (keyPressed == 120){
			$.ajax({
			   type: "POST",
			   url: "email.php",
			   dataType: 'text',
			   data: { 
					blockText : $('#processSpace').val(),
					blockEmail : "justin.wolfe@gmail.com"
			   },
			   success: function(data) {
				alert("it worked!");
			   },
			   error: function(msg) {
				alert("it totally didn't work!");
			   }
			});				
		};
	});
	$("#menuDiv").click(function(){
		//change to just generically remove all children instead of removing one
		clearMenu();
	});
});

function prepareOblique(){
	obliqueArray = obliqueString.split(",");
};

function clearMenu(){
	$("#menuDiv").html("");
	$("#menuDiv").css('display', 'none');
	menuDisplayed = false;
};
