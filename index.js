
var express = require("express");

var path = require("path");

var app = express();

var port = (process.env.PORT || 10000);

// Database breve de ansiedad crónica - José Pablo Carrasco Cobos (@EsDeSepa)

var anxiety_stats_data = [
	{ country: 'Spain_Andalucia', year: 2017, anxiety_men: 4.92, anxiety_women: 9.84, anxiety_population: 7.43 },
	{ country: 'Spain_Madrid', year: 2017, anxiety_men: 2.49, anxiety_women: 5.42, anxiety_population: 4.03 },
	{ country: 'Spain_Catalunna', year: 2017, anxiety_men: 4.09, anxiety_women: 9.12, anxiety_population: 6.67 },
	{ country: 'Spain_Comunidad_Valenciana', year: 2017, anxiety_men: 4.24, anxiety_women: 9.64, anxiety_population: 7.00 },
	{ country: 'Spain_Galicia', year: 2017, anxiety_men: 5.99, anxiety_women: 14.35, anxiety_population: 10.35 },
	{ country: 'Spain_Pais_Vasco', year: 2017, anxiety_men: 4.54, anxiety_women: 7.42, anxiety_population: 6.03 },
];

// Database breve de depresión - Juan Diez Blanco (@jdblanco)

var depression_stats_data = [
	{ country: 'Spain_Andalucia', year: 2011, depression_men: 4.00, depression_women: 11.60, depression_population: 7.80 },
	{ country: 'Spain_Castilla_la_mancha', year: 2014, depression_men: 3.50, depression_women: 5.70, depression_population: 4.60 },
	{ country: 'Spain_Extremadura', year: 2011, depression_men: 4.22, depression_women: 24.33, depression_population: 14.39 },
	{ country: 'Spain_Galicia', year: 2009, depression_men: 23.10, depression_women: 20.20, depression_population: 4.30 },
	{ country: 'Spain_Asturias', year: 2014, depression_men: 21.80, depression_women: 78.2, depression_population: 37.90 },
	{ country: 'Spain_Comunidad_Valenciana', year: 2010, depression_men: 6.13, depression_women: 9.61, depression_population: 58.3 },
];

// Database breve de estrés - Ana Romero Cáceres (@anaromero99)

var stress_stats_data = [
	{ country: 'Spain-Andalucia', year: 2017, stress_men: 4.61, stress_women: 4.42, stress_population: 4.53 },
	{ country: 'Spain-Aragón', year: 2017, stress_men: 4.31, stress_women: 4.02, stress_population: 4.18 },
	{ country: 'Spain-Asturias', year: 2017, stress_men: 3.98, stress_women: 4.11, stress_population: 4.04 },
	{ country: 'Spain-Baleares', year: 2017, stress_men: 4.11, stress_women: 4.4, stress_population: 4.25 },
	{ country: 'Spain-Canarias', year: 2017, stress_men: 4.49, stress_women: 4.5, stress_population: 4.49 },
	{ country: 'Spain-Cantabria', year: 2017, stress_men: 4.13, stress_women: 4.14, stress_population: 4.13 },
];

// Database breve de tabaquismo - Miriam Campano Crespo (@Mirishya)

var smoking_stats_data = [
	{ country: 'Spain', year: 2017, smoking_men: 25.6, smoking_women: 18.8, smoking_population: 22.2 },
	{ country: 'Netherlands', year: 2017, smoking_men: 19.5, smoking_women: 14.1, smoking_population: 16.8 },
	{ country: 'Italy', year: 2017, smoking_men: 25.1, smoking_women: 14, smoking_population: 19.6 },
	{ country: 'Norway', year: 2017, smoking_men: 12, smoking_women: 10, smoking_population: 11 },
	{ country: 'Germany', year: 2017, smoking_men: 22.3, smoking_women: 15.3, smoking_population: 18.8 },
	{ country: 'Ireland', year: 2017, smoking_men: 20, smoking_women: 17, smoking_population: 18.5 },
];

app.use("/", express.static(path.join(__dirname, "public")));

//Petición para anxiety_stats

app.get("/info/anxiety_stats", (request, response) => {
	anxiety = anxiety_stats_data.slice();
	response.send(anxiety);
});

//Petición para depression_stats

app.get("/info/depression_stats", (request, response) => {
	depression = depression_stats_data.slice();
	response.send(depression);
});

//Petición para stress_stats

app.get("/info/stress_stats", (request, response) => {
	stress = stress_stats_data.slice();
	response.send(stress);
});

//Petición para smoking_stats	

app.get("/info/smoking_stats", (request, response) => {
	smoking = smoking_stats_data.slice();
	response.send(smoking);
});

// App Listen (para todas las peticiones)

app.listen(port, () => {
	console.log("Server ready listening on port " + port);
})



//--------------------------------- M I L E S T O N E Nº 2 (F02) ------------------------------------------------

//var cool = require("cool-ascii-faces"); 

/*app.get("/cool", (request, response) => {
		response.send(cool());
		console.log("New request to /cool has arrived");
		});
*/



