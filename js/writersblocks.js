// writer's blocks -- a drafting tool by (and for) justin wolfe

$(document).ready(function() {
	prepareOblique();
	getRandomWords();
	loadSettings();
	keyPressListeners();
	keyDownListeners();
	keyUpListeners();
});

function prepareOblique(){
	var obliqueString = "Abandon normal instruments,Accept advice,Accretion,A line has two sides,Allow an easement (an easement is the abandonment of a stricture),Always first steps,Are there sections?  Consider transitions,Ask people to work against their better judgement,Ask your body,Assemble some of the elements in a group and treat the group,Balance the consistency principle with the inconsistency principle,Be dirty,Be extravagant,Be less critical more often,Breathe more deeply,Bridges -build -burn,Cascades,Change instrument roles,Change nothing and continue with immaculate consistency,Children -speaking -singing,Cluster analysis,Consider different fading systems,Consult other sources -promising -unpromising,Courage!,Cut a vital connection,Decorate,Define an area as 'safe' and use it as an anchor,Destroy -nothing -the most important thing,Discard an axiom,Disciplined self-indulgence,Disconnect from desire,Discover the recipes you are using and abandon them,Distorting time,Do nothing for as long as possible,Don't be afraid of things because they're easy to do,Don't be frightened of cliches,Don't be frightened to display your talents,Don't break the silence,Don't stress one thing more than another,Do something boring,Do the words need changing?,Do we need holes?,Emphasise differences,Emphasise repetitions,Emphasise the flaws,Fill every beat with something,From nothing to more than nothing,Ghost echoes,Give the game away,Give way to your worst impulse,Go outside. Shut the door.,Go slowly all the way round the outside,Go to an extreme,Move back to a more comfortable place,Honor thy error as a hidden intention,How would you have done it?,Humanise something free of error,Idiot glee (?),Imagine the piece as a set of disconnected events,Infinitesimal gradations,Intentions -nobility of -humility of -credibility of,In total darkness,In a very large room,Very quietly,Into the impossible,Is it finished?,Is the intonation correct?,Is there something missing?,It is quite possible (after all),Just carry on,Listen to the quiet voice,Look at the order in which you do things,Look closely at the most embarrassing details and amplify them,Lost in useless territory,Lowest common denominator,Make a blank valuable by putting it in an exquisite frame,Make an exhaustive list of everything you might do and do the last thing on the list,Make a sudden destructive unpredictable action; incorporate,Mechanicalise something idiosyncratic,Mute and continue,Not building a wall but making a brick,Once the search is in progress something will be found,Only a part not the whole,Only one element of each kind,(Organic) machinery,Overtly resist change,Question the heroic approach,Remember those quiet evenings,Remove ambiguities and convert to specifics,Remove specifics and convert to ambiguities,Repetition is a form of change,Retrace your steps,Revaluation (a warm feeling),Reverse,Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap),Simple subtraction,Simply a matter of work,State the problem in words as clearly as possible,Take a break,Take away the elements in order of apparent non-importance,The inconsistency principle,The most important thing is the thing most easily forgotten,The tape is now the music,Think of the radio,Tidy up,Towards the insignificant,Trust in the you of now,Turn it upside down,Use an old idea,Use an unacceptable colour,Use fewer notes,Use filters,Use 'unqualified' people,Water,What are the sections sections of? Imagine a caterpillar moving,What are you really thinking about just now?,What is the reality of the situation?,What mistakes did you make last time?,What wouldn't you do?,What would your closest friend do?,Work at a different speed,Would anybody want it?,You are an engineer,You can only make one dot at a time,You don't have to be ashamed of using your own ideas";
	wbRuntime.obliqueArray = obliqueString.split(",");
};

function getRandomWords(){
	var randomWordsProcess = new Array();
    $.getJSON("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=100&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
		for (var i=0; i < data.length; i++){
			randomWordsProcess[i] = data[i].word;
		};
		wbWordnik.randomWords = shuffle(randomWordsProcess);
	});
};

function loadSettings(){
	if (localStorage.runWB != "yes"){
	} else {
		wbSettingsLoaded = JSON.parse(localStorage.wbSettings);
		for (var i in wbSettingsLoaded) {
			if (wbSettingsLoaded.hasOwnProperty(i)) {
				wbSettings[i] = wbSettingsLoaded[i];
			};
		};
		$("#bg").css('background-color', wbSettings.backgroundColor);	
		$("#gradientDiv").css('background-color', wbSettings.targetBackgroundColor);	
		$('#displaySpace').css('font-size', wbSettings.fontSize);
    };
};

function keyPressListeners(){
	$(document).keypress(function(event){
		var charCode = event.which || event.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (wbRuntime.menuDisplayed == false){
			if (charCode != 32 && charCode != 13 && charCode != 8 && charCode != 47 && charCode != 39 && charCode != 63 && charCode != 34 && wbRuntime.ctrlPressed == false){
				if (wbRuntime.textDisplayed == false){
					$("#displaySpace").append("<span class='block' style='color:" + wbSettings.blockColor + ";background-color:" + wbSettings.blockColor + "'>" + charStr + "</span>");
				} else {
					$("#displaySpace").append("<span class='visibleBlock' style='color:" + wbSettings.textColor + ";background-color:" + wbSettings.blockColor + "'>" + charStr + "</span>");
				};
			};
		};	
	});
};

function keyDownListeners(){
	$(document).keydown(function(event){
		var keyPressed = event.keyCode;
		if ($('#splash').is(':visible') == true){
			$('#splash').fadeOut(1000, function() {
				$('#splash').hide();
			});
		};
		var scrollWindow = $("#displaySpace");
		scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
		if (wbRuntime.menuDisplayed == false){
			if (keyPressed == 32){
				$("#displaySpace").append("<span class='space'>&nbsp;</span>");
				wordCount();
			};
			if (keyPressed == 8){
				if (wbSettings.typewriterMode == "no"){
					event.preventDefault();
					$("#displaySpace :last-child").remove();
					wordCount();
				} else {
					event.preventDefault();
				}
			};
			if (keyPressed == 13){
				$("#displaySpace").append("<br class='break'>");
				var scrollWindow = $("#displaySpace");
				scrollWindow.scrollTop(scrollWindow[0].scrollHeight);
			};
			// added listeners for ' and / keys in order to override stupid firefox keyboard shortcuts
			if (keyPressed == 191){
				event.preventDefault();
				var fuckFirefox;
				if (wbRuntime.shiftPressed == false){
					fuckFirefox = "/";
				} else {
					fuckFirefox = "?";
				};
				if (wbRuntime.textDisplayed == false){
					$("#displaySpace").append("<span class='block' style='color:" + wbSettings.blockColor + ";background-color:" + wbSettings.blockColor + "'>" + fuckFirefox + "</span>");
				} else {
					$("#displaySpace").append("<span class='visibleBlock' style='color:" + wbSettings.textColor + ";background-color:" + wbSettings.blockColor + "'>" + fuckFirefox + "</span>");
				};
			};
			if (keyPressed == 222){
				event.preventDefault();
				var fuckFirefox;
				if (wbRuntime.shiftPressed == false){
					fuckFirefox = "'";
				} else {
					fuckFirefox = '"';
				};
				if (wbRuntime.textDisplayed == false){
					$("#displaySpace").append("<span class='block' style='color:" + wbSettings.blockColor + ";background-color:" + wbSettings.blockColor + "'>" + fuckFirefox + "</span>");
				} else {
					$("#displaySpace").append("<span class='visibleBlock' style='color:" + wbSettings.textColor + ";background-color:" + wbSettings.blockColor + "'>" + fuckFirefox + "</span>");
				};
			};			
		} else if (wbRuntime.menuDisplayed == true){
			if (keyPressed == 27){
				clearMenu();
			};
		};	
		if (keyPressed == 17){
			wbRuntime.ctrlPressed = true;
		};
		if (keyPressed == 16){
			wbRuntime.shiftPressed = true;
		};
		if (wbRuntime.ctrlPressed == true){
			if (keyPressed == 49){
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("settings");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "settings"){
					clearMenu();	
					saveSettings();
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "settings"){
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
				wbSettings.fontSize = fontSize;
				saveSettings();
				$('#displaySpace').css('font-size', fontSize);
			} else if (keyPressed == 52){
				event.preventDefault();
				if (wbSettings.visibleText == "yes"){
					if (wbRuntime.textDisplayed == false){
						$(".block").addClass("visibleBlock").removeClass("block").css("color", wbSettings.textColor);
						wbRuntime.textDisplayed = true;
					} else {
						$(".visibleBlock").addClass("block").removeClass("visibleBlock").css("color", wbSettings.blockColor);
						wbRuntime.textDisplayed = false;
					};
				};
			} else if (keyPressed == 53){
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("wordnik");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "wordnik"){
					wbWordnik.randomDefinitions.length = 0;
					wbWordnik.randomDefinitionsCounter = 0;
					clearMenu();
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "wordnik"){
					appendMenu("wordnik");
				};
			} else if (keyPressed == 54){	
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("sonnet");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "sonnet"){
					clearMenu();
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "sonnet"){
					appendMenu("sonnet");
				};				
			} else if (keyPressed == 55){
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("oblique");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "oblique"){
					clearMenu();
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "oblique"){
					appendMenu("oblique");
				};	
			} else if (keyPressed == 57){
				event.preventDefault();
			} else if (keyPressed == 48){
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("email");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "email"){
					clearMenu();
					wbRuntime.outputViewed = false;
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "email"){
					appendMenu("email");
				};	
			} else if (keyPressed == 56){
				event.preventDefault();
				if (wbRuntime.menuDisplayed == false){
					appendMenu("timer");
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu == "timer"){
					clearMenu();
				} else if (wbRuntime.menuDisplayed == true && wbRuntime.currentMenu != "timer"){
					appendMenu("timer");
				};			
			};
		};	
	});
};

function keyUpListeners(){
	$(document).keyup(function(event){
		var keyPressed = event.keyCode;
		if (keyPressed == 17){
			wbRuntime.ctrlPressed = false;
		};
		if (keyPressed == 16){
			wbRuntime.shiftPressed = false;
		};
	});
};

// could probably refactor this using a loop and "this" later if i feel like it
function addMenuListeners(){
	$("#visibleTextSelect").change(function() {
		wbSettings.visibleText = $("#visibleTextSelect").val();
		if (wbSettings.visibleText == "yes"){
			$(".visibleBlock").css('color', wbSettings.textColor);
		} else {
		};
		saveSettings();
	});
	$("#typewriterSelect").change(function() {
		wbSettings.typewriterMode = $("#typewriterSelect").val();
		saveSettings();
	});
	$("#wordTargetInput").change(function() {
		wbSettings.wordTarget = $("#wordTargetInput").val();
		saveSettings();
	});
	$("#blockColorPicker").css('background-color', wbSettings.blockColor);
	$("#blockColorPicker").colpick({
		layout:'hex',
		submit:true,
		color: wbSettings.blockColor.substring(1),
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,fromSetColor) {
			$('#blockColorPicker').css('background-color', '#'+hex);
			wbSettings.blockColor = '#' + hex;
			$(".block").css('background-color', wbSettings.blockColor);
			$(".block").css('color', wbSettings.blockColor);
			saveSettings();
		},
		onSubmit:function(hsb,hex,rgb,fromSetColor) {
			$('#blockColorPicker').colpickHide();
			wbSettings.blockColor = '#' + hex;
			$(".block").css('background-color', wbSettings.blockColor);
			$(".block").css('color', wbSettings.blockColor);
			saveSettings();
		}
	});		
	$("#textColorPicker").css('background-color', wbSettings.textColor);
	$("#textColorPicker").colpick({
		layout:'hex',
		submit:true,
		color: wbSettings.textColor.substring(1),
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,fromSetColor) {
			$('#textColorPicker').css('background-color', '#'+hex);
			wbSettings.textColor = '#' + hex;
			$(".visibleBlock").css('color', wbSettings.textColor);
			saveSettings();
		},
		onSubmit:function(hsb,hex,rgb,fromSetColor) {
			$('#textColorPicker').colpickHide();
			wbSettings.textColor = '#' + hex;
			$(".visibleBlock").css('color', wbSettings.textColor);
			saveSettings();
		}
	});
	$("#backgroundColorPicker").css('background-color', wbSettings.backgroundColor);
	$("#backgroundColorPicker").colpick({
		layout:'hex',
		submit:true,
		color: wbSettings.backgroundColor.substring(1),
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,fromSetColor) {
			$('#backgroundColorPicker').css('background-color', '#'+hex);
			wbSettings.backgroundColor = '#' + hex;
			$("#bg").css('background-color', wbSettings.backgroundColor);	
			saveSettings();			
		},
		onSubmit:function(hsb,hex,rgb,fromSetColor) {
			$('#backgroundColorPicker').colpickHide();
			wbSettings.backgroundColor = '#' + hex;
			$("#bg").css('background-color', wbSettings.backgroundColor);	
			saveSettings();
		}
	});	
	$("#targetBackgroundColorPicker").css('background-color', wbSettings.targetBackgroundColor);
	$("#targetBackgroundColorPicker").colpick({
		layout:'hex',
		submit:true,
		color: wbSettings.targetBackgroundColor.substring(1),
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,fromSetColor) {
			$('#targetBackgroundColorPicker').css('background-color', '#'+hex);
			wbSettings.targetBackgroundColor = '#' + hex;
			$("#gradientDiv").css('background-color', wbSettings.targetBackgroundColor);
			saveSettings();
		},
		onSubmit:function(hsb,hex,rgb,fromSetColor) {
			$('#targetBackgroundColorPicker').colpickHide();
			wbSettings.targetBackgroundColor = '#' + hex;
			$("#gradientDiv").css('background-color', wbSettings.targetBackgroundColor);
			saveSettings();
		}
	});		
	$("#progressColorSelect").change(function() {
		wbSettings.progressColor = $("#progressColorSelect").val();
		saveSettings();
	});
	$("#progressSoundSelect").change(function() {
		wbSettings.progressSound = $("#progressSoundSelect").val();
		saveSettings();
	});
	$("#progressPopSelect").change(function() {
		wbSettings.progressPop = $("#progressPopSelect").val();
		saveSettings();
	});
};

function updateMenu(type){
	switch(type)
	{
		case "settings":
			$("#visibleTextSelect").val(wbSettings.visibleText);
			$("#typewriterSelect").val(wbSettings.typewriterMode);
			$("#wordTargetInput").val(wbSettings.wordTarget);
			$("#blockColorPicker").val(wbSettings.blockColor);
			$("#textColorPicker").val(wbSettings.textColor);
			$("#backgroundColorPicker").val(wbSettings.backgroundColor);
			$("#targetBackgroundColorPicker").val(wbSettings.targetBackgroundColor);
			$("#progressColorSelect").val(wbSettings.progressColor);
			$("#progressSoundSelect").val(wbSettings.progressSound);
			$("#progressPopSelect").val(wbSettings.progressPop);
		break;
		case "email":
		break;
	};	
};

function appendMenu(type){
	$("#menuDiv").html("");
	wbRuntime.outputViewed = false;
	switch(type)
	{
		case "settings":
			wbRuntime.currentMenu = "settings";
			$("#menuDiv").append("\
			<div id='menuDisplay'>\
				<div id='titleContainer'><b>writer's blocks</b>: a drafting tool</div>\
				<div id='hotKeysContainer'>\
					<div id='hotKeysLabel'>shortcuts</div>\
					<div id='hotKeysLeft'><p class='hotKey'><span class='keyLabel'>ctrl+1</span>: settings (you are here)</p> <p class='hotKey'><span class='keyLabel'>ctrl+2</span>: make blocks smaller</p> <p class='hotKey'><span class='keyLabel'>ctrl+3</span>: make blocks larger</p> <p class='hotKey'><span class='keyLabel'>ctrl+4</span>: reveal text (disabled by default)</p><p class='hotKey'><span class='keyLabel'>ctrl+5</span>: random word/definition (Wordnik)</p>  </div>\
					<div id='hotKeysRight'><p class='hotKey'><span class='keyLabel'>ctrl+6</span>: random Shakespeare couplet</p><p class='hotKey'><span class='keyLabel'>ctrl+7</span>: random oblique strategy</p> <p class='hotKey'><span class='keyLabel'>ctrl+8</span>: timer</p> <p class='hotKey'><span class='keyLabel'>ctrl+0</span>: get your text</p> <p class='hotKey'><span class='keyLabel'>f11</span>: fullscreen</p></div>\
					<br class='clear' />\
				</div>\
				<div id='settingsContainer'>\
					<div id='settingsLabel'>settings</div>\
					<div id='visibleTextContainer' class='settings'>allow use of ctrl+4 to make text visible? <select id='visibleTextSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='typewriterContainer' class='settings'>disable backspace key (typewriter mode)? <select id='typewriterSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='wordTargetContainer' class='settings'>your target word count for the session <input type='text' id='wordTargetInput' value='600'></input></div>\
					<div id='colorContainer1' class='settings'>block color <div id='blockColorPicker' class='colorPicker'></div> text color <div id='textColorPicker' class='colorPicker'></div> bg color <div id='backgroundColorPicker' class='colorPicker'></div> target bg color <div id='targetBackgroundColorPicker' class='colorPicker'></div></div>\
					<div id='colorContainer2' class='settings'></div>\
					<div id='wordTargetColorContainer' class='settings'>change bg color as you progress toward your target word count? <select id='progressColorSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
					<div id='wordTargetPopContainer' class='settings'>pop-up notification when you reach your target word count? <select id='progressPopSelect'><option selected='selected'value='no'>no</option><option value='yes'>yes</select></div>\
				</div>\
				<div id='aboutContainer'>\
					<div id='aboutLabel'>about</div>\
					<div id='aboutText' class='hotKey'>made by <a href='mailto:justin.wolfe@gmail.com'>justin wolfe</a> using <a href='http://www.jquery.com/'>jQuery</a>, <a href='http://www.github.com/justinwolfe'>git</a>, <a href='http://www.wordnik.com'>Wordnik</a>, <a href='http://colpick.com/plugin'>colpick</a>, <a href='https://samdutton.wordpress.com/2011/03/09/shakespeares-sonnets-in-json-format/'>JSON Sonnets</a>, and <a href='http://www.rtqe.net/ObliqueStrategies/'>oblique strategies</a></div>\
				</div>\
			</div>");
			updateMenu("settings");
			addMenuListeners();
		break;
		case "wordnik":
			wbRuntime.currentMenu = "wordnik";
			$("#menuDiv").append("\
			<div id='dictionaryDisplay'>\
				<div id='wordDisplay'></div>\
				<div id='definitionDisplay'></div>\
				<div id='backButton'><</div>\
				<div id='forwardButton'>></div>\
			</div>");
			var randomWord = wbWordnik.randomWords[wbWordnik.randomWordCounter];
			wbWordnik.randomWordCounter++;
			var randomDefinition;
			$.getJSON("http://api.wordnik.com/v4/word.json/" + randomWord + "/definitions?limit=50&includeRelated=true&useCanonical=true&sourceDictionaries=all&includeTags=false&api_key=cea8ccbca1550ff63300d059f3607d1f0e1a742c20749a271", function (data){
				//create array of definitions
				for (var i=0; i < data.length; i++){
					wbWordnik.randomDefinitions[i] = data[i].text;
				};
				$("#wordDisplay").text(randomWord);
				$("#definitionDisplay").text(wbWordnik.randomDefinitions[wbWordnik.randomDefinitionsCounter]);
				//set up if it's more than 0, the buttons display and if not they don't
				if (wbWordnik.randomDefinitions.length > 1){
					$("#forwardButton").css('display', 'block');
					$("#backButton").css('display', 'block');
						$("#forwardButton").click(function(){
							if (wbWordnik.randomDefinitionsCounter <= wbWordnik.randomDefinitions.length - 1){
								wbWordnik.randomDefinitionsCounter++;
								$("#definitionDisplay").text(wbWordnik.randomDefinitions[wbWordnik.randomDefinitionsCounter]);
							} else {
								wbWordnik.randomDefinitionsCounter = 0;
								$("#definitionDisplay").text(wbWordnik.randomDefinitions[wbWordnik.randomDefinitionsCounter]);
							};
						});
						$("#backButton").click(function(){
							if (wbWordnik.randomDefinitionsCounter == 0){
								wbWordnik.randomDefinitionsCounter = wbWordnik.randomDefinitions.length;
								$("#definitionDisplay").text(wbWordnik.randomDefinitions[wbWordnik.randomDefinitionsCounter]);
							} else {
								wbWordnik.randomDefinitionsCounter--;
								$("#definitionDisplay").text(wbWordnik.randomDefinitions[wbWordnik.randomDefinitionsCounter]);
							};
						});	
				} else {
					$("#forwardButton").css('display', 'none');
					$("#backButton").css('display', 'none');
				};	
				if (wbWordnik.randomWordCounter == 95){
					getRandomWords();
					wbWordnik.randomWordCounter = 0;
				};
			});
		break;	
		case "email":
			parseHTMLtoString();
			wbRuntime.currentMenu = "email";
			$("#menuDiv").append("\
			<div id='emailDisplay'>\
				<div id='titleDisplay'><div id='innerTitle'>title: <input type='text' id='processEmailTitle'></input></div></div>\
				<div id='addressDisplay'><div id='innerAddress'>email: <input type='text' id='processEmailAddress'></input></div></div>\
				<div id='sendDisplay'><div id='sendButton'>email text</div></div>\
				<div id='viewDisplay'><div id='viewButton'>view text</div>\
				<div id='saveDisplay'><div id='saveButton'>generate download link</div></div>\
				<div id='messageDisplay'><div id='message'></div></div>\
				<div id='invisibleTextHolder'></div>\
			</div>");
			$("#processEmailAddress").val(wbSettings.emailAddress);
			$("#processEmailAddress").change(function(){
				wbSettings.emailAddress = $("#processEmailAddress").val();
				saveSettings();
			});
			$("#invisibleTextHolder").text(wbRuntime.outputString);
			$("#sendButton").click(function(){
				emailTitle = $('#processEmailTitle').val();
				emailAddress = $('#processEmailAddress').val();
				if (check_email(emailAddress) == false){
					$("#message").text("please enter a valid email address.");
				} else {
					$.ajax({
					   type: "POST",
					   url: "storage/email.php",
					   dataType: 'text',
					   data: { 
							blockText : wbRuntime.outputString,
							blockEmail : emailAddress,
							blockTitle : emailTitle
					   },
					   success: function(data) {
						$("#message").text("text sent (always a good idea to backup your backup, though). press ctrl+0 to go back to your blocks.");
						//setTimeout(function(){clearMenu()},1000);
					   },
					   error: function(msg) {
						$("#message").text("text not sent. maybe my host is having problems? press ctrl+0 to go back to your blocks.");
						//setTimeout(function(){clearMenu()},5000);
					   }
					});	
				};
			});
			$("#saveButton").click(function(){
				outputName = rand(50) + ".txt";
				$.ajax({
				   type: "POST",
				   url: "storage/save2.php",
				   dataType: 'text',
				   data: { 
						blockText : wbRuntime.outputString,
						blockName : outputName
				   },
				   success: function(data) {
						var d = new Date();
						var hours = d.getHours();
						if (hours > 12){
							hours-=12;
						};									
						dlName = "WB-" + hours + "-" + d.getMinutes() + "__" + (d.getMonth()+1) + "-" + (d.getDate()) + "-" + (d.getFullYear()); 
						dlMessage = "click <a href='storage/download2.php?name=" + outputName + "&dlName=" + dlName + "'>here</a> to download your file. file will be deleted from the server after your download. press ctrl+0 to go back to your blocks."
						$("#message").html(dlMessage);
					//setTimeout(function(){clearMenu()},1000);
				   },
				   error: function(msg) {
					$("#message").text("link not created. maybe my host is having problems? press ctrl+0 to go back to your blocks.");
					//setTimeout(function(){clearMenu()},5000);
				   }
				});	
			});
			$("#viewButton").click(function(){
				if (wbRuntime.outputViewed == false){
					$("#titleDisplay").css('opacity', 0);
					$("#addressDisplay").css('opacity', 0);
					$("#menuDiv").append("<div id='viewText'></div>");
					var HTMLoutputString = wbRuntime.outputString.replace(/\n/g,'<br/>');
					$("#viewText").html(HTMLoutputString);
					$("#message").text("click 'view text' again to close text.  press ctrl+0 to go back to your blocks.");
					wbRuntime.outputViewed = true;
				} else {
					$("#viewText").remove();
					$("#titleDisplay").css('opacity', 1);
					$("#addressDisplay").css('opacity', 1);
					$("#message").text("");
					wbRuntime.outputViewed = false;
				};
			});
		break;	
		case "sonnet":
		wbRuntime.currentMenu = "sonnet";
			$.getJSON('js/sonnets.json', function(data) {
				var randomSonnet = Math.floor((Math.random()*data.length)+0);
				var randomLine = Math.floor((Math.random()*12)+0);
				var sonnetLine = data[randomSonnet].lines[randomLine];
				var sonnetLine2 = data[randomSonnet].lines[randomLine + 1];
				$("#menuDiv").append("<div id='sonnetDisplay'>\
					<div id='line1'></div>\
					<div id='line2'></div>\
				</div>");
				$("#line1").text(sonnetLine);	
				$("#line2").text(sonnetLine2);
			}); 				
		break;
		case "oblique":
		wbRuntime.currentMenu = "oblique";
			var randomOblique = Math.floor((Math.random()*wbRuntime.obliqueArray.length)+0);
			$("#menuDiv").append("<div id='obliqueStrategyDisplay'></div>");
			$("#obliqueStrategyDisplay").text(wbRuntime.obliqueArray[randomOblique]); 				
		break;
		case "timer":
		wbRuntime.currentMenu = "timer";
			if (wbTimer.timerStarted == false){
				$("#menuDiv").append("\
				<div id='timerDisplay'>\
					<div id='timerContainer'><input type='text' size='2' maxlength='2' id='timerInput'> minutes</div>\
					<div id='timerStartButtonContainer'><div id='timerStartButton'>start</div></div>\
				</div>");
				$("#timerStartButton").click(function(){
					timerClick();
				});
			} else if (wbTimer.timerStarted == true){
				$("#menuDiv").append("\
				<div id='timerDisplay'>\
					<div id='timerContainer'><div id='timerShow'></div></div>\
					<div id='timerStartButtonContainer'><div id='timerStartButton'>restart</div></div>\
				</div>");
				$("#timerShow").text(wbTimer.currentMinutes + ":" + wbTimer.currentSeconds);  
				$("#timerStartButton").click(function(){
					timerClick();
				});				
			};
		break;
	};
	$("#menuDiv").fadeIn(250, function(){});
	wbRuntime.menuDisplayed = true;	
};

function clearMenu(){
	$("#menuDiv").html("");
	$("#menuDiv").css('display', 'none');
	saveSettings();
	wbRuntime.outputViewed = false;
	wbRuntime.menuDisplayed = false;
	wbRuntime.currentMenu = "";
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
	wbTimer.currentMinutes = Math.floor(wbTimer.secs / 60);
	wbTimer.currentSeconds = wbTimer.secs % 60;
	if (wbTimer.currentSeconds <= 9){
		wbTimer.currentSeconds = "0" + wbTimer.currentSeconds;
	};	
	wbTimer.secs--;
	$("#timerShow").text(wbTimer.currentMinutes + ":" + wbTimer.currentSeconds);       
	if (wbTimer.secs !== -1){
		setTimeout('countDown()',1000);
	};
	if (wbTimer.secs == -1 && wbTimer.timerStarted == true){
		$("#popHolder").html("");
		$("#popHolder").append("\
			<div id='progressPop'>\
				<div id='popMessage'>your timer has gone off!</div>\
				<div class='buttonContainer'><div id='continueButton' class='button'>i want to keep writing!</div></div>\
				<div class='buttonContainer'><div id='outputButton' class='button'>okay, let me get my text</div></div>\
		</div>");
		$("#continueButton").click(function(){
			$("#popHolder").html("");
		});
		$("#outputButton").click(function(){
			$("#popHolder").html("");
			appendMenu("email");
		});
		timerReset();
	};
};

function timerReset(){
	wbTimer.timerStarted = false;
	wbTimer.mins = 0
	wbTimer.secs = 0
	wbTimer.currentMinutes = 0;
	wbTimer.currentSeconds = 0;
	$("#timerContainer").html("");
	$("#timerContainer").append("<input type='text' size='2' maxlength='2' id='timerInput'> minutes");
	$("#timerStartButton").text("start");
};

function timerClick(){
	if (wbTimer.timerStarted == false){
		wbTimer.mins = $("#timerInput").val();
		if (wbTimer.mins != 0){
			wbTimer.secs = wbTimer.mins * 60;
			wbTimer.currentSeconds = 0;
			wbTimer.currentMinutes = 0; 
			$("#timerStartButton").text("restart");
			$("#timerContainer").html("");
			$("#timerContainer").append("<div id='timerShow'>" + wbTimer.mins + ":00</div>");
			setTimeout('countDown()',1000);
			wbTimer.timerStarted = true;
			clearMenu();
		};
	} else {
		timerReset();
	};
};

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function saveSettings(){
	if (localStorage.runWB != "yes"){
		localStorage.runWB = "yes";
	};
	localStorage.wbSettings = JSON.stringify(wbSettings);
};

function wordCount(){
	wbRuntime.spacesTyped = $(".space").length;
	wbRuntime.wordTargetPercentage = wbRuntime.spacesTyped / wbSettings.wordTarget;
	if (wbSettings.progressColor = "yes"){
		$("#gradientDiv").css('opacity', wbRuntime.wordTargetPercentage);
	};
	if (wbRuntime.wordTargetPercentage == 1){
		if (wbSettings.progressPop = "yes"){
			$("#popHolder").html("");
			$("#popHolder").append("\
				<div id='progressPop'>\
					<div id='popMessage'>you reached your target word count for this session!</div>\
					<div class='buttonContainer'><div id='continueButton' class='button'>i want to keep writing!</div></div>\
					<div class='buttonContainer'><div id='outputButton' class='button'>okay, let me get my text</div></div>\
			</div>");
			$("#continueButton").click(function(){
				$("#popHolder").html("");
			});
			$("#outputButton").click(function(){
				$("#popHolder").html("");
				appendMenu("email");
			});
		};
	};
};

function parseHTMLtoString(){
	wbRuntime.outputString = "";
	$('#displaySpace').children().each(function () {
		var currentClass = $(this).attr("class"); 
		switch(currentClass){
			case 'block':
				wbRuntime.outputString = wbRuntime.outputString + $(this).text();
				break;
			case 'visibleBlock':
				wbRuntime.outputString = wbRuntime.outputString + $(this).text();
				break;	
			case 'space':
				wbRuntime.outputString = wbRuntime.outputString + " ";
				break;
			case 'break':
				wbRuntime.outputString = wbRuntime.outputString + "\r\n";
				break;  
			default:			
		};
	});
};

function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}

jQuery.fn.reverse = [].reverse;
