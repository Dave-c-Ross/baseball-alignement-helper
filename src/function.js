

var A = new $ajax();
var ply = A.get(0, "/dataset/players.json");
var stance = A.get(0, "/dataset/stances.json");



function addPlayer(no, lastname, firstname, stance) {
	addTableRow("ltb", [
		'<i class="fa-solid fa-circle"></i>',
		'-',
		no,
		'<div style="width: 200px;">' + lastname + ", " + firstname + '</div>',
		createStanceList(stance),
		createStanceList(stance),
		createStanceList(stance),
		createStanceList(stance),
		createStanceList(stance),
		createStanceList(stance)
		]);
}

function createPlayerList() {
	//var sel = obj("select", "playerList", "form-select");
	for (k in ply[3]) {
		addPlayer(ply[3][k].number, ply[3][k].lastname, ply[3][k].firstname, ply[3][k].stance);
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


function createStanceList(include) {

	var g = guid();

	var sel = obj("div", "dd-" + g, "dropdown");
	
	var btn = sel.addObject(obj("button", "btn-" + g, "btn btn-secondary dropdown-toggle stance-btn").setValue("Stance"), true);

	btn.setAttrs({
		"type" : "button",
		"data-toggle" : "dropdown",
		"aria-haspopup" : "true",
		"aria-expanded" : "false"
	});

	
	var list = sel.addObject(obj("div", undefined, "dropdown-menu").setAttr("aria-labelledby", "btn-" + g), true);
	var stanceObj = stance[3];

	for (k in stanceObj) {

		if ($.inArray(parseInt(k), include) != -1) {
			var a = list.addObject(obj("a", "a-" + g, stanceObj[k]['class'] + " dropdown-item").setValue(stanceObj[k]['label']), true);
			a.addEventListener('click', function() { 
				btn.setValue(this.getValue());
				$(btn).removeClass(function (index, className) {
				    return (className.match (/(^|\s)stance_\S+/g) || []).join(' ');
				}).addClass(this.className);
			});
		}

	}

	return sel;

}

/*

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>


<div class="dropdown">
	<button id="btn-27a3a266-d743-78d3-c227-5f37b3d26e60" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		Drop
	</button>
	<div class="dropdown-menu" aria-labelledby="btn-27a3a266-d743-78d3-c227-5f37b3d26e60">
		<a href="#" class="dropdown-item">Lanceur</a>
		<a href="#" class="dropdown-item">Receveur</a>
		<a href="#" class="dropdown-item">1ier but</a>
		<a href="#" class="dropdown-item">2ieme but</a>
		<a href="#" class="dropdown-item">3ieme but</a>
		<a href="#" class="dropdown-item">Arr Court</a>
		<a href="#" class="dropdown-item">C. Gauche</a>
		<a href="#" class="dropdown-item">C. Centre</a>
		<a href="#" class="dropdown-item">C. Droit</a>
	</div>
</div>

*/











