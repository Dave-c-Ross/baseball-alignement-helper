// Class BaseballAlignmentHelper

class BBAH {

	#playerList;
	#coachList;
	
	#gameList;

	constructor(players, coachs) {  // Constructor
		
		this.playerList = players;
		this.coachList = coachs;

		this.gameList = [];

	}

	loadGameHistory() {}

	getGameList() {
		return this.gameList;
	}

	createNewGame(date, gameID, gameNumber, local, opponent, division, classe, league) {
		let game = Object.create(BBAH_Game);
		
		game.date = date;
		game.gameID = gameID;
		game.gameNumber = gameNumber;
		game.local = local;
		game.opponent = opponent;
		game.division = division;
		game.classe = classe;
		game.league = league;

		game.players = this.playerList;
		game.coachs = this.coachList;
		game.innings = [];

		game.innings.push(new BBAH_Inning(1, [1,2,3,4,5,6,7,8,9]));
		game.innings.push(new BBAH_Inning(2, [1,2,3,4,5,6,7,8,9]));
		game.innings.push(new BBAH_Inning(3, [1,2,3,4,5,6,7,8,9]));
		game.innings.push(new BBAH_Inning(4, [1,2,3,4,5,6,7,8,9]));
		game.innings.push(new BBAH_Inning(5, [1,2,3,4,5,6,7,8,9]));
		game.innings.push(new BBAH_Inning(6, [1,2,3,4,5,6,7,8,9]));

		this.gameList.push(game);
	}

}

var BBAH_Game = {
	date : "",
	gameID : 0,
	gameNumber : 0,
	local : true,
	opponent : "",
	division : "",
	classe : "",
	league : "",
	
	coaches : [],
	players : [],
	innings : [],

}

class BBAH_Inning {
	#inningNumber;
	#availableStances;

	constructor(inningNumber, availableStances) {
		this.inningNumber = inningNumber;
		this.availableStances = availableStances;
	}

	setStanceAvailable(stance) {
		if (!this.availableStances.includes(stance)) {
			this.availableStances.push(stance);
			this.availableStances.sort();
		}
	}

	setStanceUnAvailable(stance) {
		stance = parseInt(stance);
		console.log("Remove : " + stance);
		arrayRemove(this.availableStances, stance);
		this.availableStances.sort();
	}

	getAvailableStances() {
		return this.availableStances;
	}
}

// var BBAH_Coach = {
// 	firstname : "",
// 	lastname : "",
// 	number : 0
// }

// var BBAH_Player = {
// 	firstname : "",
// 	lastname : "",
// 	number : 0,
// 	stance : [],
// 	enable : true
// }



