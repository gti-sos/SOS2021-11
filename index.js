//var cool = require("cool-ascii-faces"); //Milestone F02
var express = require("express");

var path =  require("path");

var app = express();

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname, "public")));


app.get("/info/anxiety_stats", (request,response)=>{

	response.send(`<!DOCTYPE html>
				<html>
					<head>
						<title>anxiety_stats</title>
						<style>
							table, tr, td {
								border: 1px solid black;
								border-collapse: collapse;
							}
							tr, td {
								padding: 5px;
								text-align: center;    
							}
						</style>
					</head>
					<body>
						<h3>Ansiedad Crónica - Datos en las comunidades autónomas de España</h3>
						 </br>
						 <table class="default" style="width:100%">
						<tr>
							<td>country</td>
							<td>year</td>
							<td>anxiety_men</td>
							<td>anxiety_women</td>
							<td>anxiety_population</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Andalucia</td>
							<td>4,92</td>
							<td>9,84</td>
							<td>7,43</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Madrid</td>
							<td>2,49</td>
							<td>5,42</td>
							<td>4,03</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Cataluña</td>
							<td>4,09</td>
							<td>9,12</td>
							<td>6,67</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Comunidad Valenciana</td>
							<td>4,24</td>
							<td>9,64</td>
							<td>7,00</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Galicia</td>
							<td>5,99</td>
							<td>14,35</td>
							<td>10,35</td>
						</tr>
						<tr>
							<td>2017</td>
							<td>Spain-Pais Vasco</td>
							<td>4,54</td>
							<td>7,42</td>
							<td>6,03</td>
						</tr>
						</table>
					</body>
					</html>`
					);

});

/*app.get("/cool", (request, response) => {
		response.send(cool());
		console.log("New request to /cool has arrived");
		});
*/

app.listen(port, () => {
	console.log("Server ready listening on port " + port);	
})