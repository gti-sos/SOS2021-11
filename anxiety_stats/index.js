// API_REST de anxiety -> Jose Pablo Carrasco (@EsDeSepa)
module.exports.register = (app, BASE_API_PATH) => { // M I L E S T O N E Nº 5


//--------------------------------- M I L E S T O N E Nº 4 (F04) ------------------------------------------------

var anxiety_stats_data = [];

// 5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.
	
	app.get(BASE_API_PATH + "/anxiety_stats/loadInitialData", (req, res) => {
		anxiety_stats_data = [
			{
				"country": 'Spain_Andalucia',
				"year": 2017,
				"anxiety_men": 4.92,
				"anxiety_women": 9.84,
				"anxiety_population": 7.43
			},
			{
				"country": 'Spain_Madrid',
				"year": 2017,
				"anxiety_men": 2.49,
				"anxiety_women": 5.42,
				"anxiety_population": 4.03
			}
		];
	
		console.log(`Loaded Initial Data: <${JSON.stringify(anxiety_stats_data, null, 2)}>`);
		return res.sendStatus(200);
	});
	
	//
	
	// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)
	
	app.get(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		if (anxiety_stats_data.length != 0) {
			console.log(`anxiety_stats requested`);
			return res.send(JSON.stringify(anxiety_stats_data, null, 2));
		} else {
			console.log("Not found");
			return res.sendStatus(404);
		}
		return res.sendStatus(200);
	});
	
	//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.
	
	app.post(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		var data = req.body;
		anxiety_stats_data.push(data);
		console.log(`new data pushed: <${JSON.stringify(anxiety_stats_data, null, 2)}>`);
		res.sendStatus(201);
	});
	
	// POST Alternativo para añadir - 6.2 - anxiety_stats
	
	/*{
		"country": "Spain_Galicia",
		"year": 2017,
		"anxiety_men": 5.99,
		"anxiety_women": 14.35,
		"anxiety_population": 10.35
	}*/
	
	
	//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .
	
	app.get(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {
		var country = req.params.country;
		var year = parseInt(req.params.year);
	
		console.log(`GET stat by country: <${country}> and year: <${year}>`);
		for (var stat of anxiety_stats_data) {
			if (stat.country === country && stat.year === year) {
				return res.status(200).json(stat);
			}
		}
	
		return res.sendStatus(404);
	});
	
	//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).
	
	app.delete(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {
		var country = req.params.country;
		var year = parseInt(req.params.year);
	
		console.log(`DELETE by country <${country}> and year: <${year}>`);
	
		for (var i = 0; i < anxiety_stats_data.length; i++) {
			if (anxiety_stats_data[i]["country"] === country && anxiety_stats_data[i]["year"] === year) {
				anxiety_stats_data.splice(i, 1);
				return res.sendStatus(200);
			}
		}
	
		return res.sendStatus(404);
	});
	
	//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 
	
	app.put(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {
		var country = req.params.country;
		var year = parseInt(req.params.year);
		var newDataAnxiety = req.body;
	
		console.log(`PUT ${newDataAnxiety.country} OVER ${country} `);
		console.log(`PUT ${newDataAnxiety.year} OVER ${year} `);
	
		if (anxiety_stats_data.length == 0) {
			console.log("No Valido")
			return res.sendStatus(404);
		} else {
			for (var i = 0; i < anxiety_stats_data.length; i++) {
				var stat = anxiety_stats_data[i];
				if (stat.country === country && stat.year === year) {
					anxiety_stats_data[i] = newDataAnxiety;
					return res.send('PUT success');
				}
			}
		}
	});
	
	//6.6 POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.
	
	app.post(BASE_API_PATH + "/anxiety_stats/:country/:date", (req, res) => {
		console.log("POST no valido/encontrado");
		return res.sendStatus(405); //Recomendable 405
	
	});
	
	//6.7 PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.
	
	app.put(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		console.log("PUT no valido/encontrado");
		return res.sendStatus(405);  //Recomendable 405
	
	});
	
	//6.8 DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos
	
	app.delete(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		anxiety_stats_data.length = 0;
		console.log('anxiety_stats deleted');
		return res.sendStatus(200);
	
	})

};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

