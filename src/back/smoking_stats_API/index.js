


var path = require("path");
var Datastore = require("nedb");



//Database Generada - anxiety_stats

var BASE_API_PATH = "/api/v1";
var datafile = path.join(__dirname, 'smoking_stats.db');
var db = new Datastore({ filename: datafile, autoload: true });
var smoking_stats_data = [];








//--------------------------------- M I L E S T O N E Nº 4 (F04) ------------------------------------------------




// API_REST de smoking -> Miriam Campano Crespo (@Mirishya)
module.exports.register = (app, BASE_API_PATH) => {


	// 5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.

	app.get(BASE_API_PATH + "/smoking_stats/loadInitialData", (req, res) => {
		smoking_stats_data = [
			{
				country: 'Spain',
				year: 2017,
				smoking_men: 25.6,
				smoking_women: 18.8,
				smoking_population: 22.2
			},
			{

				country: 'Netherlands',
				year: 2017,
				smoking_men: 19.5,
				smoking_women: 14.1,
				smoking_population: 16.8
			}
		];

		db.find({ $or: [{ country: "Spain" }, { country: "Netherlands" }] }, { _id: 0 }, function (err, data) {
			if (err) {
				console.error("ERROR accesing DB in GET");
				res.sendStatus(500);
			} else {
				if (data.length == 0) {
					db.insert(smoking_stats_data);
					console.log(`Loaded initial data: <${JSON.stringify(smoking_stats_data, null, 2)}>`);
					res.sendStatus(201);
				} else {
					console.error(`initial data already exists`);
					res.sendStatus(409);
				}
			}
		});
	});

	//

	// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

	app.get(BASE_API_PATH + "/smoking_stats", (req, res) => {

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
		if (query.hasOwnProperty("smoking_men")) {
			query.smoking_men = parseFloat(query.smoking_men);
			console.log(query.smoking_men);
		}
		if (query.hasOwnProperty("smoking_women")) {
			query.smoking_women = parseFloat(query.smoking_women);
			console.log(query.smoking_women);
		}
		if (query.hasOwnProperty("smoking_population")) {
			query.smoking_population = parseFloat(query.smoking_population);
			console.log(query.smoking_population);
		}

		console.log(query);

		db.find(query).skip(offset).limit(limit).exec((error, smoking_stats) => {
			smoking_stats.forEach((n) => {
				delete n._id;
			});

			if (smoking_stats.length < 0) {
				res.sendStatus(400, "Bad request");
				console.log("Requested data is INVALID");
			}
			else {
				res.send(JSON.stringify(smoking_stats, null, 2));
				console.log("Data sent:" + JSON.stringify(smoking_stats, null, 2));

			}
		});
	});
	//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.

	app.post(BASE_API_PATH + "/smoking_stats", (req, res) => {
		var data = req.body;
		var country = req.body.country;
		var year = req.body.year;

		db.find({ "country": country, "year": year }).exec((error, smoking_stats) => {
			if (smoking_stats.length > 0) {
				res.sendStatus(409);
				console.log("There's an object with those primary keys");
				return;
			}
			if ((data == null)
				|| (data.country == null)
				|| (data.year == null)
				|| (data.smoking_men == null)
				|| (data.smoking_women == null)
				|| (data.smoking_population == null)
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
	});

	//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

	app.get(BASE_API_PATH + "/smoking_stats/:country/:year", (req, res) => {
		var country = req.params.country;
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
	});

	//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).


	app.delete(BASE_API_PATH + "/smoking_stats/:country/:year", (req, res) => {
		var country = req.params.country;
		var year = parseInt(req.params.year);



		db.remove({ "country": country, "year": year }, { multi: true }, (err, paramsDeleted) => {
			if (paramsDeleted == 0) {
				res.sendStatus(404, "Not found");
			}
			else {
				res.sendStatus(200);
			}
		});
	});
	//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 

	app.put(BASE_API_PATH + "/smoking_stats/:country/:year", (req, res) => {
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


	//6.6 POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.

	app.post(BASE_API_PATH + "/smoking_stats/:country/:date", (req, res) => {
		console.log("POST no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.7 PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.

	app.put(BASE_API_PATH + "/smoking_stats", (req, res) => {
		console.log("PUT no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.8 DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos
	app.delete(BASE_API_PATH + "/smoking_stats", (req, res) => {
		db.remove({}, { multi: true }, (error, smoking_stats_deleted) => {
			console.log(smoking_stats_deleted + " smoking_stats deleted");
		});
		res.sendStatus(200, "OK");

	})

};
