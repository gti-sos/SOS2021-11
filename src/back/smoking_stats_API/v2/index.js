// Variables necesarias por database - smoking_stats

var path = require("path");
var Datastore = require("nedb");
//const request = require("request");
//Database Generada - smoking_stats

var BASE_API_PATH = "/api/v2";
var datafile = path.join(__dirname, 'smoking_stats.db');
var db = new Datastore({ filename: datafile, autoload: true });


//Variables Iniciales de Tabaquismo (smoking_data)

var smoking_stats_data = [
	{ "country": 'Spain', "year": 2017, "smoking_men": 25.6, "smoking_women": 18.8, "smoking_population": 22.2 },
	{ "country": 'Netherlands', "year": 2017, "smoking_men": 19.5, "smoking_women": 14.1, "smoking_population": 16.8 },
	{ "country": 'Italy', "year": 2017, "smoking_men": 25.1, "smoking_women": 14, "smoking_population": 19.6 },
	{ "country": 'Norway', "year": 2017, "smoking_men": 12, "smoking_women": 10, "smoking_population": 11 },
	{ "country": 'Germany', "year": 2017, "smoking_men": 22.3, "smoking_women": 15.3, "smoking_population": 18.8 },
	{ "country": 'Ireland', "year": 2017, "smoking_men": 20, "smoking_women": 17, "smoking_population": 18.5 },

	
];

// API_REST de smoking -> Miriam Campano Crespo (@Mirishya)

module.exports.register = (app, BASE_API_PATH) => { // M I L E S T O N E  Nº 5


	//--------------------------------- M I L E S T O N E Nº 6 (F06) ------------------------------------------------



	app.get(BASE_API_PATH + "/smoking_stats/loadInitialData", (req, res) => {

		db.find({ $or: [{ country: "Spain_Andalucia" }, { country: "Spain_Madrid" }] }, { _id: 0 }, function (err, data) {
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

	// 6.1 GET a la lista de recursos (p.e. “/api/v2/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

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

	//6.2 POST a la lista de recursos (p.e. “/api/v2/stats”) crea un nuevo recurso.

	app.post(BASE_API_PATH + "/smoking_stats", (req, res) => {

		var data = req.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
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
		/*var data = req.body;
		smoking_stats_data.push(data);
		console.log(`new data pushed: <${JSON.stringify(smoking_stats_data, null, 2)}>`);
		res.sendStatus(201);*/
	});

	// POST Alternativo para añadir - 6.2 - smoking_stats //M I L E S T O N E Fº 4

	/*{
		"country": "Spain_Galicia",
		"year": 2017,
		"smoking_men": 5.99,
		"smoking_women": 14.35,
		"smoking_population": 10.35
	}*/


	//6.3 GET a un recurso (p.e. “/api/v2/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

	app.get(BASE_API_PATH + "/smoking_stats/:country/:year", (req, res) => {

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
		for (var stat of smoking_stats_data) {
			if (stat.country === country && stat.year === year) {
				return res.status(200).json(stat);
			}
		}

		return res.sendStatus(404); */
	});

	//6.4 DELETE a un recurso (p.e. “/api/v2/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).

	app.delete(BASE_API_PATH + "/smoking_stats/:country/:year", (req, res) => {

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

		for (var i = 0; i < smoking_stats_data.length; i++) {
			if (smoking_stats_data[i]["country"] === country && smoking_stats_data[i]["year"] === year) {
				smoking_stats_data.splice(i, 1);
				return res.sendStatus(200);
			}
		}

		return res.sendStatus(404);*/
	});

	//6.5 PUT a un recurso (p.e. “/api/v2/stats/sevilla/2013”) actualiza ese recurso. 

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

	/*var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDatasmoking = req.body;

	console.log(`PUT ${newDatasmoking.country} OVER ${country} `);
	console.log(`PUT ${newDatasmoking.year} OVER ${year} `);

	if (smoking_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < smoking_stats_data.length; i++) {
			var stat = smoking_stats_data[i];
			if (stat.country === country && stat.year === year) {
				smoking_stats_data[i] = newDatasmoking;
				return res.send('PUT success');
			}
		}
	}
});*/

	//6.6 POST a un recurso (p.e. “/api/v2/stats/sevilla/2013”) debe dar un error de método no permitido.

	app.post(BASE_API_PATH + "/smoking_stats/:country/:date", (req, res) => {
		console.log("POST no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.7 PUT a la lista de recursos (p.e. “/api/v2/stats”) debe dar un error de método no permitido.

	app.put(BASE_API_PATH + "/smoking_stats", (req, res) => {
		console.log("PUT no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.8 DELETE a la lista de recursos (p.e. “/api/v2/stats”) borra todos los recursos

	app.delete(BASE_API_PATH + "/smoking_stats", (req, res) => {
		db.remove({}, { multi: true }, (error, smoking_stats_deleted) => {
			console.log(smoking_stats_deleted + " smoking_stats deleted");
		});
		res.sendStatus(200, "OK");

	})



app.use("/proxyHeroku", function(req, res) {
	var apiServerHost = "https://2021-11.herokuapp.com"
	
	console.log(`apiServerHost= <${apiServerHost}>`);
	console.log(`baseURL = <${req.baseUrl}>`);
	console.log(`url = <${req.url}>`);
	var url = apiServerHost + req.url;
	console.log(`piped: ${req.baseUrl}${req.url} -> ${url}`);
	req.pipe(request(url)).pipe(res);
	});
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
};