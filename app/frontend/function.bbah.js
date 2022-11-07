

var A = new $ajax();
//var playerList = A.get(0, "/dataset/players.json");
var playerList = A.get(0, "http://localhost:3000/players");
var coachList = A.get(0, "/dataset/coaches.json");
var stanceList = A.get(0, "/dataset/stances.json");

var objBBAH = new BBAHTeam(playerList, coachList);
init();

function test() {
	var e = jQuery.Event("updateStance");
	e.currentTarget = this;
	$(document).trigger(e);
}

function init() {

	objBBAH.createNewGame("04/07/2022", 21, 10, "Comètes Fuchia (Candiac)", "Grise (Saint-Hubert)", true, "B", "U13", "LBG", [0,1,2,3,4,5,6,7,8,9,10,11,12]);
	objBBAH.createNewGame("07/07/2022", 64, 11, "Comètes Fuchia (Candiac)", "Bleu (Saint-Hubert)", false, "B", "U13", "LBG", [0,1,2,3,4,5,6]);
	objBBAH.createNewGame("12/07/2022", 23, 12, "Comètes Fuchia (Candiac)", "Expos (Sainte-Catherine)", true, "B", "U13", "LBG", [0,1,2,3,4,5,6]);
	
}


function refreshGameList() {
	
	var gameList = objBBAH.gameList;

	$id2("gameSelector").clear();
	
	for (g in gameList) {
		var o = obj("option", "game"+g);
		if (gameList[g].isLocal)
			o.setValue(gameList[g].date + " - " + gameList[g].league + "-" + gameList[g].classe + "-" + gameList[g].division + " " + gameList[g].opponentName + " receive " + gameList[g].teamName);
		else
			o.setValue(gameList[g].date + " - " + gameList[g].league + "-" + gameList[g].classe + "-" + gameList[g].division + " " + gameList[g].teamName + " receive " + gameList[g].opponentName);
		o.addTo("gameSelector");
	}

}

function refreshGrid(game) {

}


function addPlayer(no, lastname, firstname, stance, substitute) {

	//console.log("Add new player: %s %s, %s", firstname, lastname, substitute);
	
	tbody = substitute ? "rtb" : "ltb";
	if (substitute) {
		if (stance.indexOf(1) != -1) {
			stance.splice(stance.indexOf(1),1);
		}
	}

	substitute = substitute ? "(R) " : "";

	addTableRow(tbody, [
		'<i class="fa-solid fa-circle handle"></i>',
		'<span class="handle">' + no + "</span>",
		'<div class="handle" style="width: 200px;">' + substitute + lastname + ", " + firstname + '</div>',
		createStanceList(stance, 0),
		createStanceList(stance, 1),
		createStanceList(stance, 2),
		createStanceList(stance, 3),
		createStanceList(stance, 4),
		createStanceList(stance, 5)
		]).draggable = false;
}

function createPlayerList(gameIndex) {
	
	var playerIndexList = objBBAH.gameList[gameIndex].players;
	var playerObjList = objBBAH.playerList[3];
	


	for (k in playerIndexList) {
		if (playerObjList[k].enable)
			addPlayer(playerObjList[k].number, 
				playerObjList[k].lastname, 
				playerObjList[k].firstname, 
				playerObjList[k].stance,
				playerObjList[k].substitute);
	}
	
}

function createStanceList(include, inningIndex) {

	var g = guid();

	var sel = obj("div", "dd-" + g, "dropdown");
	//sel.setAttr("data-offset", 1000);
	
	var btn = sel.addObject(obj("button", "btn-" + g, "btn dropdown-toggle stance-btn").setValue("Stance"), true);

	btn.setAttrs({
		"type" : "button",
		"data-toggle" : "dropdown",
		"aria-expanded" : "false"
	});
	
	var list = sel.addObject(obj("div", undefined, "dropdown-menu").setAttr("aria-labelledby", "btn-" + g), true);


	$(sel).on('show.bs.dropdown', function(event) {

		var av = objBBAH.gameList[0].innings[inningIndex].getAvailableStances();
		var sl = {};

		for (z in av) {
			sl[av[z]] = stanceList[3][av[z]];
		}

		createDynamicStanceListDOMElement(list, sl, include, inningIndex);
	});

	$(sel).on('hidden.bs.dropdown', function(event) {
		list.clear();
	});

	return sel;

}



function createDynamicStanceListDOMElement(dropDownTarget, stanceListObj, includeStanceArray, inningIndex) {

	dropDownTarget.clear();
	var sBtn = $id(dropDownTarget.getAttribute("aria-labelledby"));
	console.log(sBtn);

	for (k in stanceListObj) {

		var a = dropDownTarget.addObject(obj("a", "a-stance-" + k, stanceListObj[k]['class'] + " dropdown-item").setValue(stanceListObj[k]['label']).setAttr("data-pos", k), true);

		if ($.inArray(parseInt(k), includeStanceArray) != -1) {
			
			a.addEventListener('click', function() { 
				
				sBtn.setValue(this.getValue());

				console.log(objBBAH);
				console.log("Remove " + this.getAttribute("data-pos"));
				objBBAH.gameList[0].innings[inningIndex].setStanceUnAvailable(this.getAttribute("data-pos"));

				$(sBtn).removeClass(function (index, className) {
				    return (className.match (/(^|\s)stance_\S+/g) || []).join(' ');
				}).addClass(this.className);

			});

		} else {
			
			$(a).removeClass(function (index, className) {
			    return (className.match (/(^|\s)stance_\S+/g) || []).join(' ');
			});
			$(a).addClass("disabled");

		}

	}

	console.log(dropDownTarget);

}










