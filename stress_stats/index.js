
var express = require("express");

var path = require("path");

var bodyParser = require("body-parser"); // M I L E S T O N E Nº 4

var BASE_API_PATH = "/api/v1"; // M I L E S T O N E Nº 4

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));


//--------------------------------- M I L E S T O N E Nº 4 (F04) ------------------------------------------------


// API_REST de stress -> Ana Romero Cáceres (@anaromero99)
module.exports.register = (app, BASE_API_PATH) => {

var stress_stats_data = [];


// 5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.

app.get(BASE_API_PATH + "/stress_stats/loadInitialData", (req, res) => {
	stress_stats_data = [
		{
			"country": 'Spain_Andalucia',
			"year": 2017,
			"stress_men": 4.61,
			"stress_women": 4.42,
			"stress_population": 4.53
		},
		{
			"country": 'Spain_Aragon',
			"year": 2017,
			"stress_men": 4.31,
			"stress_women": 4.02,
			"stress_population": 4.31
		}
	];

	console.log(`Loaded Initial Data: <${JSON.stringify(stress_stats_data, null, 2)}>`);
	return res.sendStatus(200);
});

// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

app.get(BASE_API_PATH + "/stress_stats", (req, res) => {
	if (stress_stats_data.length != 0) {
		console.log(`stress_stats requested`);
		return res.send(JSON.stringify(stress_stats_data, null, 2));
	} else {
		console.log("No data found");
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
});

//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.

app.post(BASE_API_PATH + "/stress_stats", (req, res) => {
	var data = req.body;
	stress_stats_data.push(data);
	console.log(`new data pushed: <${JSON.stringify(stress_stats_data, null, 2)}>`);
	res.sendStatus(201);
});

// POST Alternativo para añadir - 6.2 - stress_stats

/*{
	"country": "Spain_Asturias",
	"year": 2017,
	"stress_men": 3.98,
	"stress_women": 4.11,
	"stress_population": 4.04
}*/

//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

app.get(BASE_API_PATH + "/stress_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);

	console.log(`GET stat by country: <${country}> and year: <${year}>`);
	for (var stat of stress_stats_data) {
		if (stat.country === country && stat.year === year) {
			return res.status(200).json(stat);
		}
	}

	return res.sendStatus(404);
});


//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).

app.delete(BASE_API_PATH + "/stress_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.body.year);

	console.log(`DELETE by country <${country}> and year: <${year}>`);

	for (var i = 0; i < stress_stats_data.length; i++) {
		if (stress_stats_data[i]["country"] === country && stress_stats_data[i]["year"] === year) {
			stress_stats_data.splice(i, 1);
			return res.sendStatus(200);
		}
	}

	return res.sendStatus(404);
});

//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 

app.put(BASE_API_PATH + "/stress_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDataStress = req.body;

	console.log(`PUT ${newDataStress.country} OVER ${country} `);
	console.log(`PUT ${newDataStress.year} OVER ${year} `);

	if (stress_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < stress_stats_data.length; i++) {
			var stat = stress_stats_data[i];
			if (stat.country === country && stat.year === year) {
				stress_stats_data[i] = newDataStress;
				return res.send('PUT success');
			}
		}
	}
});

//6.6 POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.

app.post(BASE_API_PATH + "/stress_stats/:country/:date", (req, res) => {
	console.log("POST no valido/encontrado");
	return res.sendStatus(405);

});

//6.7 PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.

app.put(BASE_API_PATH + "/stress_stats", (req, res) => {
	console.log("PUT no valido/encontrado");
	return res.sendStatus(405);

});

//6.8 DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos

app.delete(BASE_API_PATH + "/stress_stats", (req, res) => {
	stress_stats_data.length = 0;
	console.log('stress_stats deleted');
	return res.sendStatus(200);

})

};



//--------------------------------- M I L E S T O N E Nº 3 (F03) ------------------------------------------------

//Petición para anxiety_stats

/*
app.get("/info/anxiety_stats", (request, response) => {
	anxiety = anxiety_stats_data.slice();
	response.send(anxiety);
});
*/

//Petición para depression_stats
/*
app.get("/info/depression_stats", (request, response) => {
	depression = depression_stats_data.slice();
	response.send(depression);
});
*/
//Petición para stress_stats

/*app.get("/info/stress_stats", (request, response) => {
	stress = stress_stats_data.slice();
	response.send(stress);
});
*/
//Petición para smoking_stats	

/*app.get("/info/smoking_stats", (request, response) => {
	smoking = smoking_stats_data.slice();
	response.send(smoking);
});*/

//--------------------------------- M I L E S T O N E Nº 2 (F02) ------------------------------------------------

//var cool = require("cool-ascii-faces"); 

/*app.get("/cool", (request, response) => {
		response.send(cool());
		console.log("New request to /cool has arrived");
		});
*/



