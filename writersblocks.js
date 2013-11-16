// writer's blocks -- a drafting tool by (and for) justin wolfe
var spacesTyped = 0;
var textDisplayed = false;
var menuDisplayed = false;
var currentMenu = "";
var obliqueString = "Abandon normal instruments,Accept advice,Accretion,A line has two sides,Allow an easement (an easement is the abandonment of a stricture),Always first steps,Are there sections?  Consider transitions,Ask people to work against their better judgement,Ask your body,Assemble some of the elements in a group and treat the group,Balance the consistency principle with the inconsistency principle,Be dirty,Be extravagant,Be less critical more often,Breathe more deeply,Bridges -build -burn,Cascades,Change instrument roles,Change nothing and continue with immaculate consistency,Children -speaking -singing,Cluster analysis,Consider different fading systems,Consult other sources -promising -unpromising,Courage!,Cut a vital connection,Decorate,Define an area as 'safe' and use it as an anchor,Destroy -nothing -the most important thing,Discard an axiom,Disciplined self-indulgence,Disconnect from desire,Discover the recipes you are using and abandon them,Distorting time,Do nothing for as long as possible,Don't be afraid of things because they're easy to do,Don't be frightened of cliches,Don't be frightened to display your talents,Don't break the silence,Don't stress one thing more than another,Do something boring,Do the words need changing?,Do we need holes?,Emphasise differences,Emphasise repetitions,Emphasise the flaws,Fill every beat with something,From nothing to more than nothing,Ghost echoes,Give the game away,Give way to your worst impulse,Go outside. Shut the door.,Go slowly all the way round the outside,Go to an extreme,Move back to a more comfortable place,Honor thy error as a hidden intention,How would you have done it?,Humanise something free of error,Idiot glee (?),Imagine the piece as a set of disconnected events,Infinitesimal gradations,Intentions -nobility of -humility of -credibility of,In total darkness,In a very large room,Very quietly,Into the impossible,Is it finished?,Is the intonation correct?,Is there something missing?,It is quite possible (after all),Just carry on,Listen to the quiet voice,Look at the order in which you do things,Look closely at the most embarrassing details and amplify them,Lost in useless territory,Lowest common denominator,Make a blank valuable by putting it in an exquisite frame,Make an exhaustive list of everything you might do and do the last thing on the list,Make a sudden destructive unpredictable action; incorporate,Mechanicalise something idiosyncratic,Mute and continue,Not building a wall but making a brick,Once the search is in progress something will be found,Only a part not the whole,Only one element of each kind,(Organic) machinery,Overtly resist change,Question the heroic approach,Remember those quiet evenings,Remove ambiguities and convert to specifics,Remove specifics and convert to ambiguities,Repetition is a form of change,Retrace your steps,Revaluation (a warm feeling),Reverse,Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap),Simple subtraction,Simply a matter of work,State the problem in words as clearly as possible,Take a break,Take away the elements in order of apparent non-importance,The inconsistency principle,The most important thing is the thing most easily forgotten,The tape is now the music,Think of the radio,Tidy up,Towards the insignificant,Trust in the you of now,Turn it upside down,Use an old idea,Use an unacceptable colour,Use fewer notes,Use filters,Use 'unqualified' people,Water,What are the sections sections of? Imagine a caterpillar moving,What are you really thinking about just now?,What is the reality of the situation?,What mistakes did you make last time?,What wouldn't you do?,What would your closest friend do?,Work at a different speed,Would anybody want it?,You are an engineer,You can only make one dot at a time,You don't have to be ashamed of using your own ideas"
var obliqueArray = new Array();
var randomWords = new Array();
var randomDefinitions = new Array();
var randomWordCounter = 0;
var randomDefinitionsCounter = 0;
var wordTarget = 600;
var wordTargetPercentage;
var outputViewed = false;
var outputString = "";
var charString;
var timerStarted = false;
var mins;
var secs; 
var currentSeconds; 
var currentMinutes; 
var ctrlPressed = false;
jQuery.fn.reverse = [].reverse;

var WBsettings = {
	visibleText: "no",
	typewriterMode: "no",
	blockColor: "#FFFFFF",
	textColor: "#000000",
	backgroundColor: "#000000",
	targetBackgroundColor: "#A1FFFF",
	progressColor: "no",
	progressSound: "no",
	progressPop: "no",
	emailAddress: ""
};

 $(document).ready(function() {
	//setup
	prepareOblique();
	getRandomWords();
	loadSettings();
	//textarea keypress listeners for entering text
	$(document).keypress(function(event){
		var charCode = event.which || event.keyCode;
		charStr = String.fromCharCode(charCode);
		if (menuDisplayed == false){
			if (charCode != 32 && charCode != 13 && charCode != 8 && ctrlPressed == false){
				if (textDisplayed == false){
					$("#displaySpace").append("<span class='block' style='color:" + WBsettings.blockColor + ";background-color:" + WBsettings.blockColor + "'>" + charStr + "</span>");
				} else {
					$("#displaySpace").append("<span class='visibleBlock' style='color:" + WBsettings.textColor + ";background-color:" + WBsettings.blockColor + "'>" + charStr + "</span>");
				};
			};
		};	
	});
	//document keydown listeners for text operations / menus
	$(document).keydown(function(event){
		if ($('#splash').is(':visible') == true){
			$('#splash').fadeOut('slow', function() {
				$('#splash').hide();
			});
		};
		var scrollWindow = $("#displaySpace");
		scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
		var keyPressed = event.keyCode;
		if (menuDisplayed == false){
			if (keyPressed == 32){
				spacesTyped+=1;
				$("#displaySpace").append("<span class='space'>&nbsp;</span>");
				wordTargetPercentage = spacesTyped / wordTarget;
				if (WBsettings.progressColor = "yes"){
					$("#gradientDiv").css('opacity', wordTargetPercentage);
				};	
			};
			if (keyPressed == 8){
				if (WBsettings.typewriterMode == "no"){
					event.preventDefault();
					$("#displaySpace :last-child").remove();
				} else {
					event.preventDefault();
				}
			};
			if (keyPressed == 13){
				$("#displaySpace").append("<br class='break'>");
				var scrollWindow = $("#displaySpace");
				scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
			};
		};	
		if (keyPressed == 17){
			ctrlPressed = true;
		};
		if (ctrlPressed == true){
			if (keyPressed == 49){
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("settings");
				} else if (menuDisplayed == true && currentMenu == "settings"){
					clearMenu();		
				} else if (menuDisplayed == true && currentMenu != "settings"){
					appendMenu("settings");
				};
			} else if (keyPressed == 50 || keyPressed == 51){
				event.preventDefault();
				var fontSize = $('#displaySpace').css('font-size');
				fontSize = parseFloat(fontSize);
				if (keyPressed == 50){
					fontSize--;
				} else if (keyPressed == 51){
					fontSize++;
				}
				$('#displaySpace').css('font-size', fontSize);
				$('#processSpace').css('font-size', fontSize);
			} else if (keyPressed == 52){
				event.preventDefault();
				if (WBsettings.visibleText == "yes"){
					if (textDisplayed == false){
						$(".block").addClass("visibleBlock").removeClass("block").css("color", WBsettings.textColor);
						textDisplayed = true;
					} else {
						$(".visibleBlock").addClass("block").removeClass("visibleBlock").css("color", WBsettings.blockColor);
						textDisplayed = false;
					};
				};
			} else if (keyPressed == 53){
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("wordnik");
				} else {
					randomDefinitions.length = 0;
					randomDefinitionsCounter = 0;
					clearMenu();
				};
			} else if (keyPressed == 54){	
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("sonnet");
				} else {
					clearMenu();
				};				
			} else if (keyPressed == 55){
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("oblique");
				} else {
					clearMenu();
				};
			} else if (keyPressed == 57){
				event.preventDefault();
			} else if (keyPressed == 48){
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("email");
				} else {
					clearMenu();
					outputViewed = false;
				};	
			} else if (keyPressed == 56){
				event.preventDefault();
				if (menuDisplayed == false){
					appendMenu("timer");
				} else if (menuDisplayed == true){
					clearMenu();
				};			
			};
		};	
	});
	$(document).keyup(function(event){
		var keyPressed = event.keyCode;
		if (keyPressed == 17){
			ctrlPressed = false;
		};
		//CHECK THIS LISTENER
		if (keyPressed == 16){
			if (textDisplayed == false){
				$(".visibleBlock").addClass("block").removeClass("visibleBlock");
			};
		};
	});
});

//functions
function prepareOblique(){
	obliqueArray = obliqueString.split(",");
};

// could probably refactor this using a loop and "this" later if i feel like it
function addMenuListeners(){
	$("#visibleTextSelect").change(function() {
		WBsettings.visibleText = $("#visibleTextSelect").val();
		if (WBsettings.visibleText == "yes"){
			$(".visibleBlock").css('color', WBsettings.textColor);
		} else {
		};
	});
	$("#typewriterSelect").change(function() {
		WBsettings.typewriterMode = $("#typewriterSelect").val();
	});
	$("#wordTargetInput").change(function() {
		wordTarget = $("#wordTargetInput").val();
	});
	$("#blockColorPicker").change(function() {
		WBsettings.blockColor = $("#blockColorPicker").val();
		$(".block").css('background-color', WBsettings.blockColor);
		$(".block").css('color', WBsettings.blockColor);
	});
	$("#textColorPicker").change(function() {
		WBsettings.textColor = $("#textColorPicker").val();
		$(".visibleBlock").css('color', WBsettings.textColor);
	});
	$("#backgroundColorPicker").change(function() {
		WBsettings.backgroundColor = $("#backgroundColorPicker").val();
		$("#bg").css('background-color', WBsettings.backgroundColor);
	});
	$("#targetBackgroundColorPicker").change(function() {
		WBsettings.targetBackgroundColor = $("#targetBackgroundColorPicker").val();
		$("#gradientDiv").css('background-color', WBsettings.targetBackgroundColor);
	});
	$("#progressColorSelect").change(function() {
		WBsettings.progressColor = $("#progressColorSelect").val();
	});
	$("#progressSoundSelect").change(function() {
		WBsettings.progressSound = $("#progressSoundSelect").val();
	});
	$("#progressPopSelect").change(function() {
		WBsettings.progressPop = $("#progressPopSelect").val();
	});
};

function updateMenu(type){
	switch(type)
	{
		case "settings":
			$("#visibleTextSelect").val(WBsettings.visibleText);
			$("#typewriterSelect").val(WBsettings.typewriterMode);
			$("#wordTargetInput").val(wordTarget);
			$("#blockColorPicker").val(WBsettings.blockColor);
			$("#textColorPicker").val(WBsettings.textColor);
			$("#backgroundColorPicker").val(WBsettings.backgroundColor);
			$("#targetBackgroundColorPicker").val(WBsettings.targetBackgroundColor);
			$("#progressColorSelect").val(WBsettings.progressColor);
			$("#progressSoundSelect").val(WBsettings.progressSound);
			$("#progressPopSelect").val(WBsettings.progressPop);
		break;
		case "email":
		break;
	};	
};

function appendMenu(type){
	$("#menuDiv").html("");
	//need to build in fade behavior
	switch(type)
	{
		case "settings":
			currentMenu = "settings";
			$("#menuDiv").append("\
			<div id='menuDisplay'>\
				<div id='titleContainer'><b>writer's blocks</b>: a drafting tool</div>\
				<div id='hotKeysContainer'>\
					<div id='hotKeysLabel'>shortcuts</div>\
					<div id='hotKeysLeft'><p class='hotKey'><span class='keyLabel'>ctrl+1</span>: settings (you are here)</p> <p class='hotKey'><span class='keyLabel'>ctrl+2</span>: make blocks smaller</p> <p class='hotKey'><span class='keyLabel'>ctrl+3</span>: make blocks larger</p> <p class='hotKey'><span class='keyLabel'>ctrl+4</span>: reveal text (disabled by default)</p><p class='hotKey'><span class='keyLabel'>ctrl+5</span>: random word/definition (via Wordnik)</p>  </div>\
					<div id='hotKeysRight'><p class='hotKey'><span class='keyLabel'>ctrl+6</span>: random Shakespeare couplet</p><p class='hotKey'><span class='keyLabel'>ctrl+7</span>: random oblique strategy</p> <p class='hotKey'><span class='keyLabel'>ctrl+8</span>: timer</p> <p class='hotKey'><span class='keyLabel'>ctrl+0</span>: get your text</p> <p class='hotKey'><span class='keyLabel'>f11</span>: fullscreen</p></div>\
					<br class='clear' />\
				</div>\
				<div id='settingsContainer'>\
					<div id='settingsLabel'>settings</div>\
					<div id='visibleTextContainer' class='hotKey'>allow use of ctrl+4 to make text visible? <select id='visibleTextSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='typewriterContainer' class='hotKey'>disable backspace key (typewriter mode)? <select id='typewriterSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='wordTargetContainer' class='hotKey'>target word count for session <input type='text' id='wordTargetInput' value='600'></input></div>\
					<div id='colorContainer' class='hotKey'>block color <input id='blockColorPicker' type='color' class='colorPicker' value='#FFFFFF'></input> text color <input id='textColorPicker' type='color' class='colorPicker' value='#000000'></input> background color <input id='backgroundColorPicker' type='color' class='colorPicker' value='#000000'></input> target background color <input id='targetBackgroundColorPicker' type='color' class='colorPicker' value='#A1FFFF'></input></div>\
					<div id='wordTargetColorContainer' class='hotKey'>shift background color towards a new color as you progress towards target word count? <select id='progressColorSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='wordTargetSoundContainer' class='hotKey'>play chime sound on reaching 25%, 50%, 75%, and 100% of target word count? <select id='progressSoundSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='wordTargetPopContainer' class='hotKey'>deliver pop-up notification that you've reached target word count? <select id='progressPopSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
				</div>\
				<div id='aboutContainer'>\
					<div id='aboutLabel'>about</div>\
					<div id='aboutText' class='hotKey'>made by <a href='mailto:justin.wolfe@gmail.com'>justin wolfe</a> using <a href='http://www.jquery.com/'>jQuery</a>, <a href='http://www.steamdev.com/zclip/'>zClip</a>, <a href='http://www.wordnik.com'>Wordnik</a>, <a href='https://samdutton.wordpress.com/2011/03/09/shakespeares-sonnets-in-json-format/'>JSON Sonnets</a>, and <a href='http://somedrafts.com/yournextsentence/'>your next sentence</a></div>\
				</div>\
			</div>");
			updateMenu("settings");
			addMenuListeners();
			$("#menuDiv").fadeIn(250, function(){});
			menuDisplayed = true;	
		break;
		case "wordnik":
			currentMenu = "wordnik";
			$("#menuDiv").append("\
			<div id='dictionaryDisplay'>\
				<div id='wordDisplay'></div>\
				<div id='definitionDisplay'></div>\
				<div id='backButton'><</div>\
				<div id='forwardButton'>></div>\
			</div>");
			var randomWord = randomWords[randomWordCounter];
			randomWordCounter++;
			var randomDefinition;
			$.getJSON("http://api.wordnik.com/v4/word.json/" + randomWord + "/definitions?limit=50&includeRelated=true&useCanonical=true&sourceDictionaries=all&includeTags=false&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
				console.log(data);
				//create array of definitions
				for (var i=0; i < data.length; i++){
					randomDefinitions[i] = data[i].text;
				};
				console.log(randomDefinitions);
				$("#wordDisplay").text(randomWord);
				$("#definitionDisplay").text(randomDefinitions[randomDefinitionsCounter]);
				//set up if it's more than 0, the buttons display and if not they don't
				if (randomDefinitions.length > 1){
				$("#forwardButton").css('display', 'block');
				$("#backButton").css('display', 'block');
					$("#forwardButton").click(function(){
						if (randomDefinitionsCounter <= randomDefinitions.length - 1){
							randomDefinitionsCounter++;
							$("#definitionDisplay").text(randomDefinitions[randomDefinitionsCounter]);
						} else {
							randomDefinitionsCounter = 0;
							$("#definitionDisplay").text(randomDefinitions[randomDefinitionsCounter]);
						};
					});
					$("#backButton").click(function(){
						if (randomDefinitionsCounter == 0){
							randomDefinitionsCounter = randomDefinitions.length;
							$("#definitionDisplay").text(randomDefinitions[randomDefinitionsCounter]);
						} else {
							randomDefinitionsCounter--;
							$("#definitionDisplay").text(randomDefinitions[randomDefinitionsCounter]);
						};
					});	
				} else {
					$("#forwardButton").css('display', 'none');
					$("#backButton").css('display', 'none');
				};	
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;
				if (randomWordCounter == 95){
					getRandomWords();
					randomWordCounter = 0;
				};
			});
		break;	
		case "email":
			parseHTMLtoString();
			currentMenu = "email";
			$("#menuDiv").append("\
			<div id='emailDisplay'>\
				<div id='titleDisplay'><div id='innerTitle'>title: <input type='text' id='processEmailTitle'></input></div></div>\
				<div id='addressDisplay'><div id='innerAddress'>email: <input type='text' id='processEmailAddress'></input></div></div>\
				<div id='sendDisplay'><div id='sendButton'>email text</div></div>\
				<div id='copyDisplay'><div id='copyButton'>copy text (flash)</div></div>\
				<div id='viewDisplay'><div id='viewButton'>view text</div>\
				<div id='saveDisplay'><div id='saveButton'>generate download link</div></div>\
				<div id='messageDisplay'><div id='message'></div></div>\
				<div id='invisibleTextHolder'></div>\
			</div>");
			$("#processEmailAddress").val(WBsettings.emailAddress);
			$("#processEmailAddress").change(function(){
				WBsettings.emailAddress = $("#processEmailAddress").val();
			});
			$("#invisibleTextHolder").text(outputString);
			$("#menuDiv").fadeIn(250, function(){});
			menuDisplayed = true;
			$('#copyButton').zclip({
				path:'libraries/ZeroClipboard.swf',
				copy: $('#invisibleTextHolder').text(),
				afterCopy:function(){
					$('#message').text("text copied. press ctrl+0 to go back to your blocks.");
				}
			});
			$("#sendButton").click(function(){
				emailTitle = $('#processEmailTitle').val();
				emailAddress = $('#processEmailAddress').val();
			//if there is a title and a valid email address in there
				$.ajax({
				   type: "POST",
				   url: "email.php",
				   dataType: 'text',
				   data: { 
						blockText : outputString,
						blockEmail : emailAddress,
						blockTitle : emailTitle
				   },
				   success: function(data) {
					$("#message").text("text sent (always a good idea to backup your backup, though). press ctrl+0 to go back to your blocks.");
					//setTimeout(function(){clearMenu()},1000);
				   },
				   error: function(msg) {
					$("#message").text("text not sent. maybe my server is having problems? press ctrl+0 to go back to your blocks.");
					//setTimeout(function(){clearMenu()},5000);
				   }
				});	
			});
			$("#saveButton").click(function(){
				outputName = rand(50) + ".txt";
				console.log(outputName);
				$.ajax({
				   type: "POST",
				   url: "storage/save2.php",
				   dataType: 'text',
				   data: { 
						blockText : outputString,
						blockName : outputName
				   },
				   success: function(data) {
						console.log(data);
						var d = new Date();
						var hours = d.getHours();
						if (hours > 12){
							hours-=12;
						};									
						dlName = "WB-" + hours + "-" + d.getMinutes() + "__" + (d.getMonth()+1) + "-" + (d.getDate()) + "-" + (d.getFullYear()); 
						dlMessage = "click <a href='storage/download2.php?name=" + outputName + "&dlName=" + dlName + "'>here</a> to download your file. file will be deleted from the server after your download. press ctrl+0 to go back to your blocks."
						console.log(dlMessage);
						$("#message").html(dlMessage);
					//setTimeout(function(){clearMenu()},1000);
				   },
				   error: function(msg) {
					$("#message").text("link not created. maybe my server is having problems? press ctrl+0 to go back to your blocks.");
					//setTimeout(function(){clearMenu()},5000);
				   }
				});	
			});
			$("#viewButton").click(function(){
				if (outputViewed == false){
					$("#menuDiv").append("<div id='viewText'></div>");
					var HTMLOutputString = outputString.replace(/\n/g,'<br/>');
					$("#viewText").html(HTMLOutputString);
					$("#message").text("click 'view text' again to close text.  press ctrl+0 to go back to your blocks.");
					outputViewed = true;
				} else {
					$("#viewText").remove();
					$("#message").text("");
					outputViewed = false;
				};
			});
		break;	
		case "sonnet":
		currentMenu = "sonnet";
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
		break;
		case "oblique":
		currentMenu = "oblique";
			var randomOblique = Math.floor((Math.random()*obliqueArray.length)+0);
			$("#menuDiv").append("<div id='obliqueStrategyDisplay'></div>");
			$("#obliqueStrategyDisplay").text(obliqueArray[randomOblique]); 				
			$("#menuDiv").fadeIn(250, function(){});
			menuDisplayed = true;
		break;
		case "timer":
		currentMenu = "timer";
			if (timerStarted == false){
				$("#menuDiv").append("\
				<div id='timerDisplay'>\
					<div id='timerContainer'><input type='text' size='2' maxlength='2' id='timerInput'> minutes</div>\
					<div id='timerStartButtonContainer'><div id='timerStartButton'>start</div></div>\
				</div>");
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;
				$("#timerStartButton").click(function(){
					timerClick();
				});
			} else if (timerStarted == true){
				$("#menuDiv").append("\
				<div id='timerDisplay'>\
					<div id='timerContainer'><div id='timerShow'></div></div>\
					<div id='timerStartButtonContainer'><div id='timerStartButton'>restart</div></div>\
				</div>");
				$("#timerShow").text(currentMinutes + ":" + currentSeconds);  
				$("#menuDiv").fadeIn(250, function(){});
				menuDisplayed = true;	
				$("#timerStartButton").click(function(){
					timerClick();
				});				
			};
		break;	
	};
};

function clearMenu(){
	$("#menuDiv").html("");
	$("#menuDiv").css('display', 'none');
	menuDisplayed = false;
	currentMenu = "";
	$("#processSpace").focus();
};

function check_email(email){  
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(reg.test(email)){
        return true; 
    }else{  
        return false;
    }  
} 

function countDown() {
	currentMinutes = Math.floor(secs / 60);
	currentSeconds = secs % 60;
	if (currentSeconds <= 9){
		currentSeconds = "0" + currentSeconds;
	};	
	secs--;
	$("#timerShow").text(currentMinutes + ":" + currentSeconds);       
	if (secs !== -1){
		setTimeout('countDown()',1000);
	};
	if (secs == -1 && timerStarted == true){
		alert("finished!");
		timerReset();
	};
};

function timerReset(){
	timerStarted = false;
	mins = 0
	secs = 0
	currentMinutes = 0;
	currentSeconds = 0;
	$("#timerContainer").html("");
	$("#timerContainer").append("<input type='text' size='2' maxlength='2' id='timerInput'> minutes");
	$("#timerStartButton").text("start");
};

function timerClick(){
	if (timerStarted == false){
		mins = $("#timerInput").val();
		if (mins != 0){
			secs = mins * 60;
			currentSeconds = 0;
			currentMinutes = 0; 
			$("#timerStartButton").text("restart");
			$("#timerContainer").html("");
			$("#timerContainer").append("<div id='timerShow'>" + mins + ":00</div>");
			setTimeout('countDown()',1000);
			timerStarted = true;
			clearMenu();
		};
	} else {
		timerReset();
	};
};

function getRandomWords(){
	var randomWordsProcess = new Array();
	$.getJSON("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=100&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
		for (var i=0; i < data.length; i++){
			randomWordsProcess[i] = data[i].word;
		};
		randomWords = shuffle(randomWordsProcess);
		console.log(randomWords);
	});
};

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function loadSettings(){
};

function parseHTMLtoString(){
	outputString = "";
	$('#displaySpace').children().each(function () {
		var currentClass = $(this).attr("class"); 
		switch(currentClass){
			case 'block':
				outputString = outputString + $(this).text();
				break;
			case 'visibleBlock':
				outputString = outputString + $(this).text();
				break;	
			case 'space':
				outputString = outputString + " ";
				break;
			case 'break':
				outputString = outputString + "\r\n";
				break;  
			default:			
		};
	});
	console.log(outputString);
};

function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}
