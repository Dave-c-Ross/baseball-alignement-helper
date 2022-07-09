

var A = new $ajax();
var playerList = A.get(0, "/dataset/players.json");
var coachList = A.get(0, "/dataset/coaches.json");
var stanceList = A.get(0, "/dataset/stances.json");

var objBBAH = new BBAH(playerList, coachList);
init();


function init() {

	objBBAH.createNewGame("07/07/2022", 21, 10, true, "Belu", "B", "U13", "LBG");

	console.log(objBBAH.getGameList());

}


function addPlayer(no, lastname, firstname, stance) {
	addTableRow("ltb", [
		'<i class="fa-solid fa-circle handle"></i>',
		'<span class="handle">' + no + "</span>",
		'<div class="handle" style="width: 200px;">' + lastname + ", " + firstname + '</div>',
		createStanceList(stance, 0),
		createStanceList(stance, 1),
		createStanceList(stance, 2),
		createStanceList(stance, 3),
		createStanceList(stance, 4),
		createStanceList(stance, 5)
		]).draggable = false;
}

function createPlayerList() {
	//var sel = obj("select", "playerList", "form-select");
	for (k in playerList[3]) {
		if (playerList[3][k].enable)
			addPlayer(playerList[3][k].number, playerList[3][k].lastname, playerList[3][k].firstname, playerList[3][k].stance);
	}
	
}

function createStanceList1(include) {
	var sel = obj("select", "stanceList", "form-select");

	for (k in stance[3]) {
		if ($.inArray(parseInt(Object.keys(stance[3])[k-1]), include) != -1) {
			//console.log("%s : %s", Object.keys(stance[3])[k-1], stance[3][k]);
			sel.addObject(obj("option", Object.keys(stance[3])[k-1]).setValue(stance[3][k]));
		}
	}
	
	return sel;
}
function createStanceList2(include) {

	var g = guid();

	var sel = obj("div", "dd-" + g, "dropdown");
	


	var btn = sel.addObject(obj("button", "btn-" + g, "btn btn-secondary dropdown-toggle stance-btn").setValue("Stance"), true);
	var btn_attr = {
		"type" : "button",
		"data-toggle" : "dropdown",
		"aria-haspopup" : "true",
		"aria-expanded" : "false"
	};
	btn.setAttrs(btn_attr);

	var list = sel.addObject(obj("div", undefined, "dropdown-menu").setAttr("aria-labelledby", "btn-" + g), true);

	for (k in stance[3]) {
		if ($.inArray(parseInt(k), include) != -1) {
			var a = list.addObject(obj("a", "a-" + g, "dropdown-item").setValue(stance[3][k]), true);
			a.addEventListener('click', function() { console.log(btn.setValue(this.getValue()))});
		}
	}

	return sel;
}
function createStanceList3(include) {

	var g = guid();

	var sel = obj("div", "dd-" + g, "dropdown");
	//sel.setAttr("data-offset", 1000);
	
	var btn = sel.addObject(obj("button", "btn-" + g, "btn dropdown-toggle stance-btn").setValue("Stance"), true);

	btn.setAttrs({
		"type" : "button",
		"data-toggle" : "dropdown",
		"aria-haspopup" : "true",
		"aria-expanded" : "false"
	});

	
	var list = sel.addObject(obj("div", undefined, "dropdown-menu").setAttr("aria-labelledby", "btn-" + g), true);
	var stanceObj = stanceList[3];

	for (k in stanceObj) {

		var a = list.addObject(obj("a", "a-" + g, stanceObj[k]['class'] + " dropdown-item").setValue(stanceObj[k]['label']), true);

		if ($.inArray(parseInt(k), include) != -1) {
			a.addEventListener('click', function() { 
				btn.setValue(this.getValue());
				$(btn).removeClass(function (index, className) {
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

	$(sel).on('show.bs.dropdown', function(event) {
		createDynamicStanceListDOMElement(event.relatedTarget.id, stanceObj, [1,2,3]);
		console.log(event);
	});

	return sel;
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










