
const baseball = require("./baseball.js");
const express = require('express');
const cors = require('cors')
const app = express();

main().catch(err => console.log(err));

async function main() {
	 baseball.init();
}

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log(req.headers);
  
  if (req.query.cat != undefined)
  	console.log("Will output in plain text");

  next();
})

app.listen(3000);

app.get('/', (req, res) => {
});

/* Players Actions */

app.get('/players', async (req, res) => {
	
	var t = await baseball.getPlayers();

	if (req.query.cat != undefined) {
		var buff = "";
		
		res.set('Content-Type', 'text/plain')
		buff += "|".padEnd(42,"-") + "|\n";
		buff += "| #".padEnd(6," ") + "| Name".padEnd(35, " ") + " |\n";
		buff += "|".padEnd(42,"-") + "|\n";

		for (i in t) {
			buff += String("| " + t[i].number).padEnd(6," ") + String("| " + t[i].lastname + ", " + t[i].firstname).padEnd(35, " ") + " |\n";	
		}
		
		buff += "|".padEnd(42,"-") + "|\n";
		res.send(buff);
	} else
		res.json(t);

});
app.post('/players/add', (req, res) => {
	
	baseball.addPlayer(
		"Cuerrier",
		"Gabriel",
		50,
		[1],
		false,
		true
	);

	baseball.addPlayer(
		"Cuerrier",
		"Emilie",
		59,
		[1],
		false,
		true
	);

	res.sendStatus(200);
});
app.put('/players/add', (req, res) => {
	
	for (i in req.body) {
		baseball.upsertPlayer(
			req.body[i].lastname,
			req.body[i].firstname,
			req.body[i].number,
			req.body[i].stance,
			req.body[i].substitute,
			req.body[i].enable
		);
	}

	res.sendStatus(201);
});

/* Coaches Actions */
app.get('/coaches', async (req, res) => {	
	var t = await baseball.getCoaches();
	if (req.query.cat != undefined) {
		var buff = "";
		
		res.set('Content-Type', 'text/plain')
		buff += "|".padEnd(42,"-") + "|\n";
		buff += "| #".padEnd(6," ") + "| Name".padEnd(35, " ") + " |\n";
		buff += "|".padEnd(42,"-") + "|\n";

		for (i in t) {
			buff += String("| " + t[i].number).padEnd(6," ") + String("| " + t[i].lastname + ", " + t[i].firstname).padEnd(35, " ") + " |\n";	
		}
		
		buff += "|".padEnd(42,"-") + "|\n";
		res.send(buff);
	} else
		res.json(t);
});
app.put('/coaches/add', (req, res) => {
	
	for (i in req.body) {
		baseball.upsertCoach(
			req.body[i].lastname,
			req.body[i].firstname,
			req.body[i].number,
			req.body[i].headCoach
		);
	}

	res.sendStatus(201);
});

/* Team Action */
app.get('/teams', async (req, res) => {
	var t = await baseball.getTeams();
	res.json(t);
});
app.put('/team/:id/players/add', async (req, res) => {

	var team = await baseball.getTeam(req.params['id']);
	
	console.log(team);

	for (i in req.body) {
		team.addPlayer(req.body[i]);
	}

	team.save();

	res.sendStatus(201);

});
app.put('/teams/add', async (req, res) => {				// Add one or many teams

	for (i in req.body) {
		baseball.upsertTeam(
			0,
			req.body[i].name,
			req.body[i].city,
			[],[],
			req.body[i].division,
			req.body[i].classe,
			req.body[i].league
		);
	}

	res.sendStatus(201);

});



