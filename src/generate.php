<?php

/* Generate a new line up rand. */
header("Content-Type: text/plain");


$players = json_decode(file_get_contents("./dataset/players.json"));

$nbr_inning = 6;
$nbr_active_players = count_active_players($players);

$stanceList = new StanceList();
$stanceList->loadFromJSON("./dataset/stances.json");


// // Iterate over inning
for ($i=0; $i<$nbr_inning; $i++) {

	$tmp_stanceList = $stanceList;

	foreach ($players as $player) {
		
	}

}

function count_active_players($playerList) {
	
	$result = 0;

	foreach ($playerList as $player)
		if ($player->enable)
			$result++;

	return $result;
}

class StanceSelector {
	
}

class StanceList extends ArrayIterator {
	
	function add($no, $name) {
		$this->append(new Stance($no, $name));
	}

	function remove($no) {

	}

	function loadFromJSON($jsonFile) {
		$stances = json_decode(file_get_contents($jsonFile), true);
		foreach ($stances as $stance_key => $value) {
			$this->add($stance_key, $value);
		}
	}
}

class Stance {
	
	public $no;
	public $name;

	function __construct($no, $name) {
		$this->no = $no;
		$this->name = $name;
	}
}









?>