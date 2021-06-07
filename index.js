console.log("primer mensaje");

var express = require("express");

var path = require("path");

var cors = require("cors");

var request = require("request");

var bodyParser = require("body-parser"); // M I L E S T O N E Nº 4

var BASE_API_PATH = "/api/v1"; // M I L E S T O N E Nº 4

var BASE_API_PATH_v2 = "/api/v2"; //M I L E S T O N E Nº 10

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

//-------------------------------- INTEGRACIONES -----------------------------------------------------



//Integracion interna Juan Díez Blanco

var pathUnemployment = '/api/v2/children-out-school/';
var apiServerHostUnemployment = 'http://sos2021-24.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathUnemployment = 'api/integration/suicide-records';
var apiServerHostUnemployment = 'http://sos2021-27.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


var pathUnemployment = '/api/integration/obesity-stats';
var apiServerHostUnemployment = 'http://sos2021-10.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//integraciones externas
var pathUnemployment = '/api/integration/obesity-stats';
var apiServerHostUnemployment = '/?action=get_standings&league_id=302&APIkey=238fa8f2f748e83ca2569474a8f848897110a90bb6837bd17d6cdc66a02eb14a';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});
var pathUnemployment = '/api/episodes';
var apiServerHostUnemployment = 'https://breakingbadapi.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});



//INTEGRACIONES - PROXYS - JOSE PABLO CARRASCO COBOS
//Api Compañero SOS - G04 - illiteracy_stats
var pathIlliteracy = 'api/v1/illiteracy';
var apiServerHostIlliteracy = 'https://sos2021-04.herokuapp.com/';

app.use(pathIlliteracy, function (req, res) {
  var url = apiServerHostIlliteracy + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
//Apis Externas
//Bitcoins (proviene de Github)
var pathIlliteracy = '/games?per_page=25&page=0';
var apiServerHostIlliteracy = "https://free-nba.p.rapidapi.com";

app.use(pathIlliteracy, function (req, res) {
  var url = apiServerHostIlliteracy + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
http://api.bitcoincharts.com/v1/weighted_prices.json
//Integración Ana Romero Cáceres

var pathCovid = '/v2/countries?yesterday=false&sort=deaths&allowNull=true';
var apiServerHostCovid = 'https://disease.sh/';

app.use(pathCovid, function (req, res) {
  var url = apiServerHostCovid + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathBicicletas = '/vls/v1/stations/?contract=Seville&apiKey=6fa39265431480ca0b5f3393cd78f29e2d436882';
var apiServerHostBicicletas = 'https://api.jcdecaux.com/';

app.use(pathBicicletas, function (req, res) {
  var url = apiServerHostBicicletas + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Integración Interna Ana Romero Cáceres

var pathUnemployment = '/api/v2/unemployment-stats';
var apiServerHostUnemployment = 'https://sos2021-23.herokuapp.com/';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathEvictions = '/api/v1/evictions';
var apiServerHostEvictions = 'https://sos2021-25.herokuapp.com/';

app.use(pathEvictions, function (req, res) {
  var url = apiServerHostEvictions + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathInversion = 'api/v2/province-budget-and-investment-in-social-promotion';
var apiServerHostInversion = 'https://sos2021-27.herokuapp.com/';

app.use(pathInversion, function (req, res) {
  var url = apiServerHostInversion + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathEducacion = '/api/v1/';
var apiServerHostEducacion = 'https://education-expenditures.herokuapp.com/';

app.use(pathEducacion, function (req, res) {
  var url = apiServerHostEducacion + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});



//Integración Miriam Campano Crespo
var pathEnfermostats = '/v2/gov/Germany';
var apiServerHostEnfermostats = 'https://disease.sh/';

app.use(pathEnfermostats, function (req, res) {
  var url = apiServerHostEnfermostats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


var pathSportVigostats = '/data/deportes/ins-complejos.json';
var apiServerHostSportVigostats = 'https://datos.vigo.org/';

app.use(pathSportVigostats, function (req, res) {
  var url = apiServerHostSportVigostats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

////////////INTEGRACIONES INTERNA MIRIAM CAMPANO CRESPO

//GRUPO 10 FOOD
var pathFoodstats = '/api/integration/foodconsumption-stats';
var apiServerHostFoodstats = 'https://sos2021-10.herokuapp.com/';

app.use(pathFoodstats, function (req, res) {
  var url = apiServerHostFoodstats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//GRUPO 01 LIFE
var pathLifestats = '/api/v2/life-stats';
var apiServerHostLifestats = 'https://sos2021-01-life-stats.herokuapp.com/';

app.use(pathLifestats, function (req, res) {
  var url = apiServerHostLifestats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//GRUPO 22 GRAMMYS
var pathGrammystats = '/api/v2/grmys';
var apiServerHostGrammystats = 'https://sos2021-22.herokuapp.com/';

app.use(pathGrammystats, function (req, res) {
  var url = apiServerHostGrammystats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//GRUPO 3 POLLUTION
var pathPollutionstats = '/api/integrations/air-pollution';
var apiServerHostPollutionstats = 'https://sos2021-03.herokuapp.com/';

app.use(pathPollutionstats, function (req, res) {
  var url = apiServerHostPollutionstats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//--------------------------------- M I L E S T O N E Nº 8 (F08) ------------------------------------------------

// BACK_API_REST de anxiety -> Jose Pablo Carrasco (@EsDeSepa)

var anxiety_stats_api = require("./src/back/anxiety_stats_API/v2"); // M I L E S T O N E Nº 5

anxiety_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5

//--------------------------------- M I L E S T O N E D03 ------------------------------------------------

var anxiety_stats_api_INT = require("./src/back/anxiety_stats_API/integration");

anxiety_stats_api_INT.register(app, "/api/integration");

var depression_stats_api_INT = require("./src/back/depression_stats_API/integration");

depression_stats_api_INT.register(app, "/api/integration");

var stress_stats_api_INT = require("./src/back/stress_stats_API/integration");

stress_stats_api_INT.register(app, "/api/integration");

var smoking_stats_api_INT = require("./src/back/smoking_stats_API/integration");

smoking_stats_api_INT.register(app, "/api/integration");
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

// API_REST de depression -> Juan Diez Blanco (@jdblanco)

var depression_stats_api = require("./src/back/depression_stats_API/v2"); // M I L E S T O N E Nº 5

depression_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
//API_REST de stress -> Ana Romero Cáceres (@anaromero99)


var stress_stats_api = require("./src/back/stress_stats_API/v2"); // M I L E S T O N E Nº 5

stress_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

// API_REST de smoking -> Miriam Campano Crespo (@Mirishya)

var smoking_stats_api = require("./src/back/smoking_stats_API/v2"); // M I L E S T O N E Nº 5
const { Console } = require("console");

smoking_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5


// App Listen (para todas las peticiones)

console.log("iniciando servidor");

app.listen(port, () => {
  console.log("Server ready listening on port " + port);
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



