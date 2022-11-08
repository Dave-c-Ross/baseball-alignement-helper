const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	number: { type: Number, required: true },
	stance: { type: [Number], required: true },
	substitute: { type: Boolean, required: true },
	enable: { type: Boolean, required: true }
}).index({ firstname: 1, lastname: 1 }, { unique: true });

const coachSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	number: { type: Number, required: true },
	headCoach: { type: Boolean, default: false }
}).index({ firstname: 1, lastname: 1 }, { unique: true });

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	city: { type: String, required: true },
	players: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], default: [] },
	coaches: { type: [coachSchema], default: [] },
	division: { type: String, required: true },
	classe: { type: String, required: true },
	league: { type: String, required: true }
},
{
	methods:{
		async addPlayer(playerId) {	
			await Player.populate(this, "players");
			console.log("================================");		
			console.log(this.players.isMongooseDocumentArray);
			console.log(this.players.id());
			console.log("================================");
			
			if (!this.players.includes(playerId)) {
				this.players.push(playerId);
				return true;
			}
			return false;
		},
		async removePlayer(playerId) {
			this.players.id(playerId).remove();
		},
		async addCoach(coachId) {
			
			var p = await Coach.findById(coachId).exec();

			if (!this.coaches.id(coachId)) {
				this.coaches.push(p);
				this.save();
				return true;
			}
				return false;
		},
		async removeCoach(coachId) {
			this.coaches.id(coachId).remove();
		}
	}
}).index({ name: 1, city: 1, division: 1, classe: 1, league: 1 }, { unique: true });

const gameSchema = new mongoose.Schema({
	dateTime: { type: Date },
	gameID: { type: Number, required: true },
	gameNumber: { type: Number, required: true },
	isLocal: { type: Boolean, required: true },
	ownTeam: { type: [teamSchema], default: {} },
	players: { type: [playerSchema], default: {} },
	coaches: { type: [coachSchema], default: {} },
	opponentTeamLabel: { type: String, required: true }
}).index({ gameID: 1 }, { unique: true });;


const Player = mongoose.model('Player', playerSchema);
const Coach = mongoose.model('Coach', coachSchema);
const Team = mongoose.model('Team', teamSchema);
const Game = mongoose.model('Game', gameSchema);

async function init() {
	await mongoose.connect('mongodb://localhost:27017/test');
}

async function upsertPlayer(lastname, firstname, number, stance, substitute, enable) {

	var query = {
		lastname: lastname,
		firstname: firstname,
		number: number
	};

	var newPlayer = {
		lastname: lastname,
		firstname: firstname,
		number: number,
		stance: stance,
		substitute: substitute,
		enable: enable
	};

	Player.findOneAndUpdate(query, newPlayer, { upsert: true }, (e,d) => {
		// console.log(e);
		// console.log(d);
	});
}

async function upsertCoach(lastname, firstname, number, headCoach = false) {

	var query = {
		lastname: lastname,
		firstname: firstname,
		number: number
	};

	var newCoach = {
		lastname: lastname,
		firstname: firstname,
		number: number,
		headCoach: headCoach
	};

	Coach.findOneAndUpdate(query, newCoach, { upsert: true }, (e,d) => {
		// console.log(e);
		// console.log(d);
	});
}

async function upsertTeam(_id, name, city, players, coaches, division, classe, league) {

	var newTeam = {
		name: name,
		city: city,
		players: players,
		coaches: coaches,
		division: division,
		classe: classe,
		league: league
	};

	Team.findByIdAndUpdate(mongoose.Types.ObjectId(_id), newTeam, { upsert: true }, (e,d) => {
		if (e)
			console.log(e);
		// console.log(d);
	});	
}

async function upsertGame() {
}

async function getPlayers() {
	return Player.find().exec();
}

async function getCoaches() {
	return Coach.find().exec();
}

async function getTeams() {
	return Team.find().populate({ path: "players", getters: true }).populate("coaches").exec();
}

async function getTeam(id) {
	return Team.findById(id).populate({ path: "players", getters: true }).populate("coaches").exec();
	//return Team.findById(id).exec();
}

async function getGames() {
	return Game.find().exec();
}

async function getGame(id) {
	return Game.findById(id).exec();
}

module.exports = {
	init, 
	upsertPlayer, 
	upsertCoach,
	upsertTeam,  
	upsertGame, 
	getPlayers, 
	getCoaches,
	getTeams, 
	getTeam, 
	getGames,
	getGame
};
















