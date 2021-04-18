// Variables necesarias por database - stress_stats

var path = require("path");
var Datastore = require("nedb");

//Database Generada - stress_stats

var BASE_API_PATH = "/api/v1";
var datafile = path.join(__dirname, 'stress_stats.db');
var db = new Datastore({ filename: datafile, autoload: true });
var stress_stats_data = [];

//var stress_stats = db.getAllData();


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

		db.find({ $or: [{ country: "Spain_Andalucia" }, { country: "Spain_Aragon" }] }, { _id: 0 }, function (err, data) {
			if (err) {
				console.error("ERROR accesing DB in GET");
				res.sendStatus(500);
			} else {
				if (data.length == 0) {
					db.insert(stress_stats_data);
					console.log(`Loaded initial data: <${JSON.stringify(stress_stats_data, null, 2)}>`);
					res.sendStatus(201);
				} else {
					console.error(`initial data already exists`);
					res.sendStatus(409);
				}
			}
		});
});


	// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

	app.get(BASE_API_PATH + "/stress_stats", (req, res) => {

		var query = req.query;

		//Aquí se obtienen offset y limit con query, si son null, le hacemos un delete y listo.
		var limit = parseInt(query.limit);
		var offset = parseInt(query.offset);

		//Deleteamos los offset y limit.
		delete query.offset;
		delete query.limit;

		//Parseamos el año a Integer, mis otras 3 propiedades numéricas también son necesarias.
		if (query.hasOwnProperty("year")) {
			query.year = parseInt(query.year);
			console.log(query.year);
		}
		if (query.hasOwnProperty("stress_men")) {
			query.stress_men = parseFloat(query.stress_men);
			console.log(query.stress_men);
		}
		if (query.hasOwnProperty("stress_women")) {
			query.stress_women = parseFloat(query.stress_women);
			console.log(query.stress_women);
		}
		if (query.hasOwnProperty("stress_population")) {
			query.stress_population = parseFloat(query.stress_population);
			console.log(query.stress_population);
		}

		console.log(query);

		db.find(query).skip(offset).limit(limit).exec((error, stress_stats) => {
			stress_stats.forEach((n) => {
				delete n._id;
			});

			if (stress_stats.length < 0) {
				res.sendStatus(400, "Bad request");
				console.log("Requested data is INVALID");
			}
			else {
				res.send(JSON.stringify(stress_stats, null, 2));
				console.log("Data sent:" + JSON.stringify(stress_stats, null, 2));

			}
		});

		/*if (stress_stats_data.length != 0) {
			console.log(`stress_stats requested`);
			return res.send(JSON.stringify(stress_stats_data, null, 2));
		} else {
			console.log("Not found");
			return res.sendStatus(404);
		}
		return res.sendStatus(200);*/
	});

	//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.

	app.post(BASE_API_PATH + "/stress_stats", (req, res) => {

		var data = req.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		var country = req.body.country;
		var year = req.body.year;

		db.find({ "country": country, "year": year }).exec((error, stress_stats) => {
			if (stress_stats.length > 0) {
				res.sendStatus(409);
				console.log("There's an object with those primary keys");
				return;
			}
			if ((data == null)
				|| (data.country == null)
				|| (data.year == null)
				|| (data.stress_men == null)
				|| (data.stress_women == null)
				|| (data.stress_population == null)
				|| ((Object.keys(data).length != 5))) {

				res.sendStatus(400, "Falta uno o más campos");
				console.log(data);
				console.log("POST not created");
				return;
			}
			db.insert(data);

			res.sendStatus(201, "Post created");
			console.log(JSON.stringify(data, null, 2));
		});
		/*var data = req.body;
		stress_stats_data.push(data);
		console.log(`new data pushed: <${JSON.stringify(stress_stats_data, null, 2)}>`);
		res.sendStatus(201);*/
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

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.find({ "country": country, "year": year }).exec((err, param) => {
			if (param.length == 1) {
				delete param[0]._id;

				res.send(JSON.stringify(param[0], null, 2));
				console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(param[0]), null, 2);
			}
			else {
				res.sendStatus(404, "Not found");
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);
	
		console.log(`GET stat by country: <${country}> and year: <${year}>`);
		for (var stat of stress_stats_data) {
			if (stat.country === country && stat.year === year) {
				return res.status(200).json(stat);
			}
		}
	
		return res.sendStatus(404); */
	});


	//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).

	app.delete(BASE_API_PATH + "/stress_stats/:country/:year", (req, res) => {

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.remove({ "country": country, "year": year }, { multi: true }, (err, paramsDeleted) => {
			if (paramsDeleted == 0) {
				res.sendStatus(404, "Not found");
			}
			else {
				res.sendStatus(200);
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);
	
		console.log(`DELETE by country <${country}> and year: <${year}>`);
	
		for (var i = 0; i < stress_stats_data.length; i++) {
			if (stress_stats_data[i]["country"] === country && stress_stats_data[i]["year"] === year) {
				stress_stats_data.splice(i, 1);
				return res.sendStatus(200);
			}
		}
	
		return res.sendStatus(404);*/
	});

	//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 

	app.put(BASE_API_PATH + "/stress_stats/:country/:year", (req, res) => {

		var countryData = req.params.country; //Pillar el contenido después de los dos puntos.
		var countryD = req.body.country;

		var yearData = parseInt(req.params.year);
		var yearD = parseInt(req.body.year);

		var body = req.body;

		if (countryData != countryD || yearData != yearD) {
			res.sendStatus(409);
			console.warn("There is a conflict!");
		}
		else {
			db.update({ "country": countryData, "year": yearData }, body, (err, paramsUpdated) => {
				if (paramsUpdated == 0) {
					res.sendStatus(404, "Not found");
				}
				else {
					res.sendStatus(200);
					console.log("PUT Correcto");
				}
			});
		}
	});

	/*var country = req.params.country;
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
});*/

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
		db.remove({}, { multi: true }, (error, stress_stats_deleted) => {
			console.log(stress_stats_deleted + " stress_stats deleted");
		});
		res.sendStatus(200, "OK");

	})

};
