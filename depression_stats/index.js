
//--------------------------------- M I L E S T O N E Nº 4 (F04) ------------------------------------------------

// API_REST de depression -> Juan Diez Blanco (@jdblanco)
module.exports.register = (app, BASE_API_PATH) =>{
var depression_stats_data = [];

// 5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.

app.get(BASE_API_PATH + "/depression_stats/loadInitialData", (req, res) => {
	depression_stats_data = [
		{
			"country": 'Spain_Andalucia',
			"year": 2011,
			"depression_men": 4.00,
			"depression_women": 11.60,
			"depression_population": 7.80
		},
		{
			"country": 'Spain_Castilla_la_mancha',
			"year": 2014,
			"depression_men": 3.50,
			"depression_women": 5.70,
			"depression_population": 4.60
		}
	];

	console.log(`Loaded Initial Data: <${JSON.stringify(depression_stats_data, null, 2)}>`);
	return res.sendStatus(200);
});

//

// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

app.get(BASE_API_PATH + "/depression_stats", (req, res) => {
	if (depression_stats_data.length != 0) {
		console.log(`depression_stats requested`);
		return res.send(JSON.stringify(depression_stats_data, null, 2));
	} else {
		console.log("Not found");
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
});

//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.

app.post(BASE_API_PATH + "/depression_stats", (req, res) => {
	var data = req.body;
	depression_stats_data.push(data);
	console.log(`new data pushed: <${JSON.stringify(depression_stats_data, null, 2)}>`);
	res.sendStatus(201);
});

// POST Alternativo para añadir - 6.2 - depression_stats

/*{
	"country": 'Spain_Extremadura',
	"year": 2011,
	"anxiety_men": 4.22,
	"anxiety_women": 24.33,
	"anxiety_population": 14.39
}*/


//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

app.get(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);

	console.log(`GET stat by country: <${country}> and year: <${year}>`);
	for (var stat of depression_stats_data) {
		if (stat.country === country && stat.year === year) {
			return res.status(200).json(stat);
		}
	}

	return res.sendStatus(404);
});

//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).

app.delete(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.body.year);

	console.log(`DELETE by country <${country}> and year: <${year}>`);

	for (var i = 0; i < depression_stats_data.length; i++) {
		if (depression_stats_data[i]["country"] === country && depression_stats_data[i]["year"] === year) {
			depression_stats_data.splice(i, 1);
			return res.sendStatus(200);
		}
	}

	return res.sendStatus(404);
});

//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 

app.put(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {
	var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDatadepression = req.body;

	console.log(`PUT ${newDatadepression.country} OVER ${country} `);
	console.log(`PUT ${newDatadepression.year} OVER ${year} `);

	if (depression_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < depression_stats_data.length; i++) {
			var stat = depression_stats_data[i];
			if (stat.country === country && stat.year === year) {
				depression_stats_data[i] = newDatadepression;
				return res.send('PUT success');
			}
		}
	}
});

//6.6 POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.

app.post(BASE_API_PATH + "/depression_stats/:country/:date", (req, res) => {
	console.log("POST no valido/encontrado");
	return res.sendStatus(405);

});

//6.7 PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.

app.put(BASE_API_PATH + "/depression_stats", (req, res) => {
	console.log("PUT no valido/encontrado");
	return res.sendStatus(405);

});

//6.8 DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos

app.delete(BASE_API_PATH + "/depression_stats", (req, res) => {
	depression_stats_data.length = 0;
	console.log('depression_stats deleted');
	return res.sendStatus(200);

})
};
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
