
window.addEventListener('load', function () {
  refreshGameList();
})

$(document).on("updateStance", event_updateStance);
// $(document).on("updateGame");
// $(document).on("updateLineUp");
// $(document).on("updatePlayer");


function event_updateStance(e) {
	console.log(e);
}

// var ev = {
// 	action
// 	gameID
// 	inningID
// 	palyerID
// 	stanceID
// }

// Game
// 	Innings
// 		addInning
// 		removeInning
// 	Players
// 		addPlayer
// 		removePlayer

