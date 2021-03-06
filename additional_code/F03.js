// Database breve de depresión - Jose Pablo Carrasco Cobos (@EsDeSepa)

/*+var anxiety_stats_data = [
	{ country: 'Spain_Andalucia', year: 2017, anxiety_men: 4.92, anxiety_women: 9.84, anxiety_population: 7.43 },
	{ country: 'Spain_Madrid', year: 2017, anxiety_men: 2.49, anxiety_women: 5.42, anxiety_population: 4.03 },
	{ country: 'Spain_Catalunna', year: 2017, anxiety_men: 4.09, anxiety_women: 9.12, anxiety_population: 6.67 },
	{ country: 'Spain_Comunidad_Valenciana', year: 2017, anxiety_men: 4.24, anxiety_women: 9.64, anxiety_population: 7.00 },
	{ country: 'Spain_Galicia', year: 2017, anxiety_men: 5.99, anxiety_women: 14.35, anxiety_population: 10.35 },
	{ country: 'Spain_Pais_Vasco', year: 2017, anxiety_men: 4.54, anxiety_women: 7.42, anxiety_population: 6.03 },
];*/


/* app.get("/info/anxiety_stats", (request,response)=>{

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
							<td>Spain-Andalucia</td>
							<td>2017</td>
							<td>4,92</td>
							<td>9,84</td>
							<td>7,43</td>
						</tr>
						<tr>
							<td>Spain-Madrid</td>
							<td>2017</td>
							<td>2,49</td>
							<td>5,42</td>
							<td>4,03</td>
						</tr>
						<tr>
							<td>Spain-Cataluña</td>
							<td>2017</td>
							<td>4,09</td>
							<td>9,12</td>
							<td>6,67</td>
						</tr>
						<tr>
							<td>Spain-Comunidad Valenciana</td>
							<td>2017</td>
							<td>4,24</td>
							<td>9,64</td>
							<td>7,00</td>
						</tr>
						<tr>
							<td>Spain-Galicia</td>
							<td>2017</td>
							<td>5,99</td>
							<td>14,35</td>
							<td>10,35</td>
						</tr>
						<tr>
							<td>Spain-Pais Vasco</td>
							<td>2017</td>
							<td>4,54</td>
							<td>7,42</td>
							<td>6,03</td>
						</tr>
						</table>
					</body>
					</html>`
					);
						});
                        */
// Database breve de depresión - Juan Diez Blanco (@jdblanco)
/*app.get("/info/depression_stats", (request,response)=>{
response.send(`<!DOCTYPE html>
				<html>
					<head>
						<title>depression_stats</title>
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
						<h3>Depresion Crónica - Datos en las comunidades autónomas de España</h3>
						 </br>
						 <table class="default" style="width:100%">
						<tr>
							<td>country</td>
							<td>year</td>
							<td>depres_men</td>
							<td>depres_women</td>
							<td>depres_population</td>
						</tr>
						<tr>
							<td>Spain-Andalucia</td>
							<td>2011</td>
							<td>4,00</td>
							<td>11,60</td>
							<td>7,80</td>
						</tr>
						<tr>
							<td>Spain-Castilla-la-mancha</td>
							<td>2014</td>
							<td>3,50</td>
							<td>5,70</td>
							<td>4,60</td>
						</tr>
						<tr>
							<td>Spain-Extremadura</td>
							<td>2011</td>
							<td>4,22</td>
							<td>24,33</td>
							<td>14,39</td>
						</tr>
						<tr>
							<td>Spain-Galicia</td>
							<td>2009</td>
							<td>23,10</td>
							<td>20,20</td>
							<td>37,90</td>
						</tr>
						<tr>
							<td>Spain-Asturias</td>
							<td>2014</td>
							<td>21,80</td>
							<td>78,20</td>
							<td>37,90</td>
						</tr>
						<tr>
							<td>Spain-Comunidad-valenciana</td>
							<td>2010</td>
							<td>6,13</td>
							<td>9,61</td>
							<td>58,30</td>
						</tr>
						</table>
					</body>
					</html>`
					);
});*/
// Database breve de estrés - Ana Romero Cáceres (@anaromero99)
/*
app.get("/info/stress_stats", (request,response)=>{

	response.send(`<!DOCTYPE html>
				<html>
					<head>
						<title>stress_stats</title>
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
						<h3>Estrés Laboral - Datos en las comunidades autónomas de España</h3>
						 </br>
						 <table class="default" style="width:100%">
						<tr>
							<td>country</td>
							<td>year</td>
							<td>stress_men</td>
							<td>stress_women</td>
							<td>stress_population</td>
						</tr>
						<tr>
							<td>Spain-Andalucia</td>
							<td>2017</td>
							<td>4,61</td>
							<td>4,42</td>
							<td>4,53</td>
						</tr>
						<tr>
							<td>Spain-Aragón</td>
							<td>2017</td>
							<td>4,31</td>
							<td>4,02</td>
							<td>4,18</td>
						</tr>
						<tr>
							<td>Spain-Asturias</td>
							<td>2017</td>
							<td>3,98</td>
							<td>4,11</td>
							<td>4,04</td>
						</tr>
						<tr>
							<td>Spain-Baleares</td>
							<td>2017</td>
							<td>4,11</td>
							<td>4,4</td>
							<td>4,25</td>
						</tr>
						<tr>
							<td>Spain-Canarias</td>
							<td>2017</td>
							<td>4,49</td>
							<td>4,5</td>
							<td>4,49</td>
						</tr>
						<tr>
							<td>Spain-Cantabria</td>
							<td>2017</td>
							<td>4,13</td>
							<td>4,14</td>
							<td>4,13</td>
						</tr>
						</table>
					</body>
					</html>`
					);

});	*/
/*var stress_stats_data = [
	{ country: 'Spain-Andalucia', year: 2017, stress_men: 4.61, stress_women: 4.42, stress_population: 4.53 },
	{ country: 'Spain-Aragón', year: 2017, stress_men: 4.31, stress_women: 4.02, stress_population: 4.18 },
	{ country: 'Spain-Asturias', year: 2017, stress_men: 3.98, stress_women: 4.11, stress_population: 4.04 },
	{ country: 'Spain-Baleares', year: 2017, stress_men: 4.11, stress_women: 4.4, stress_population: 4.25 },
	{ country: 'Spain-Canarias', year: 2017, stress_men: 4.49, stress_women: 4.5, stress_population: 4.49 },
	{ country: 'Spain-Cantabria', year: 2017, stress_men: 4.13, stress_women: 4.14, stress_population: 4.13 },
];*/

// Database breve de tabaquismo - Miriam Campano Crespo (@Mirishya)
/*app.get("/info/smoking_stats", (request,response)=>{

	response.send(`<!DOCTYPE html>
				<html>
					<head>
						<title>smoking_stats</title>
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
						<h3>Fumadores - Datos en los países de Europa</h3>
						 </br>
						 <table class="default" style="width:100%">
						<tr>
							<td>country</td>
							<td>year</td>
							<td>smoking_men</td>
							<td>smoking_women</td>
							<td>smoking_population</td>
						</tr>
						<tr>
							<td>Spain</td>
							<td>2017</td>
							<td>25,6</td>
							<td>18,8</td>
							<td>22,2</td>
						</tr>
						<tr>
							<td>Netherlands</td>
							<td>2017</td>
							<td>19,5</td>
							<td>14,1</td>
							<td>16,8</td>
						</tr>
						<tr>
							<td>Italy</td>
							<td>2017</td>
							<td>25,1</td>
							<td>14</td>
							<td>19,6</td>
						</tr>
						<tr>
							<td>Norway</td>
							<td>2017</td>
							<td>12</td>
							<td>10</td>
							<td>11</td>
						</tr>
						<tr>
							<td>Germany</td>
							<td>2017</td>
							<td>22,3</td>
							<td>15,3</td>
							<td>18,8</td>
						</tr>
						<tr>
							<td>Ireland</td>
							<td>2017</td>
							<td>20</td>
							<td>17</td>
							<td>18,5</td>
						</tr>
						</table>
					</body>
					</html>`
					);

});*/
/*var smoking_stats_data = [
	{ country: 'Spain', year: 2017, smoking_men: 25.6, smoking_women: 18.8, smoking_population: 22.2 },
	{ country: 'Netherlands', year: 2017, smoking_men: 19.5, smoking_women: 14.1, smoking_population: 16.8 },
	{ country: 'Italy', year: 2017, smoking_men: 25.1, smoking_women: 14, smoking_population: 19.6 },
	{ country: 'Norway', year: 2017, smoking_men: 12, smoking_women: 10, smoking_population: 11 },
	{ country: 'Germany', year: 2017, smoking_men: 22.3, smoking_women: 15.3, smoking_population: 18.8 },
	{ country: 'Ireland', year: 2017, smoking_men: 20, smoking_women: 17, smoking_population: 18.5 },
];
*/