
var express = require("express");

var path = require("path");

var bodyParser = requires("body-parser"); // M I L E S T O N E Nº 4

var BASE_API_PATH = "/api/v1"; // M I L E S T O N E Nº 4

var app = express();

var port = (process.env.PORT || 10000);

/*+var anxiety_stats_data = [
	{ country: 'Spain_Andalucia', year: 2017, anxiety_men: 4.92, anxiety_women: 9.84, anxiety_population: 7.43 },
	{ country: 'Spain_Madrid', year: 2017, anxiety_men: 2.49, anxiety_women: 5.42, anxiety_population: 4.03 },
	{ country: 'Spain_Catalunna', year: 2017, anxiety_men: 4.09, anxiety_women: 9.12, anxiety_population: 6.67 },
	{ country: 'Spain_Comunidad_Valenciana', year: 2017, anxiety_men: 4.24, anxiety_women: 9.64, anxiety_population: 7.00 },
	{ country: 'Spain_Galicia', year: 2017, anxiety_men: 5.99, anxiety_women: 14.35, anxiety_population: 10.35 },
	{ country: 'Spain_Pais_Vasco', year: 2017, anxiety_men: 4.54, anxiety_women: 7.42, anxiety_population: 6.03 },
];*/

//--------------------------------- M I L E S T O N E Nº 4 (F04) ------------------------------------------------


// API_REST de anxiety -> Jose Pablo Carrasco (@EsDeSepa)
var anxiety_stats_data = [];


// 5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.

app.get(BASE_API_PATH + "/anxiety-stats/loadInitialData", (req, res) => {
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




// API_REST de depression -> Juan Diez Blanco (@jdbaldno)


// API_REST de stress -> Ana Romero Cáceres (@anaromero99)


// API_REST de smoking -> Miriam Campano Crespo (@Myrisha)




































app.use("/", express.static(path.join(__dirname, "public")));




// App Listen (para todas las peticiones)

app.listen(port, () => {
	console.log(`Server ready listening on port ${PORT}!`);
})



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



