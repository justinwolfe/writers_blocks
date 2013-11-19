var WBruntime = {
	spacesTyped: 0,
	wordTargetPercentage: 0,
	textDisplayed: false,
	menuDisplayed: false,
	currentMenu: "",
	outputViewed: false,
	outputString: "",
	ctrlPressed: false,
	shiftPressed: false,
	obliqueArray: []
};

var WBtimer = {
	timerStarted: false,
	mins: 0,
	secs: 0,
	currentSeconds: 0,
	currentMinutes: 0
};

var WBsettings = {
	visibleText: "no",
	typewriterMode: "no",
	blockColor: "#FFFFFF",
	textColor: "#000000",
	backgroundColor: "#000000",
	targetBackgroundColor: "#A1FFFF",
	progressColor: "yes",
	progressPop: "yes",
	emailAddress: "",
	wordTarget: 600,
	fontSize: 24
};

var WBwordnik = {
	randomWords: [],
	randomDefinitions: [],
	randomWordCounter: 0,
	randomDefinitionsCounter: 0
};