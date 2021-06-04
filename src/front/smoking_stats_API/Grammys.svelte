<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  var errorMsg = "";
  var datos = [];
  const BASE_API_GRAMMYS = "https://sos2021-22.herokuapp.com/api/v2/grmys"
  
  async function loadGrammy() {
      console.log("Loading data...");
    
      const res = await fetch(BASE_API_GRAMMYS).then(
        function (res) {
          if (res.ok) {
            errorMsg = "";
            console.log("OK");
          } else {
            if (res.status === 500) {
              errorMsg = "No se ha podido acceder a la base de datos";
            }
            console.log("ERROR!" + errorMsg);
          }
        }
      );
    }
    
    async function getDatos() {
      console.log("Fetching data...");
      await loadGrammy();
      const res = await fetch(BASE_API_GRAMMYS);
      if (res.ok) {
        const json = await res.json();
        datos = json;
    
        console.log(`We have received ${datos.length} stats.`);
        console.log("Ok");
      } else {
        errorMsg = "Error recuperando datos";
        console.log("ERROR!" + errorMsg);
      }
    }
    async function loadChart(){
      await getDatos();
      var nombre = [];
    //  var pais = [] ;
      var premios = [];
      var anyo= [];
     
      datos.forEach((dato_grammy) => {
          nombre.push(dato_grammy.name);
         // pais.push(dato_grammy.country);
          premios.push(parseInt(dato_grammy.award));
    anyo.push(parseInt(dato_grammy.year));
         
  
      });
      var colors = Highcharts.getOptions().colors;
Highcharts.chart('container', {

    chart: {
        type: 'streamgraph',
        marginBottom: 30,
        zoomType: 'x'
    },

    // Make sure connected countries have similar colors
    colors: [
        colors[0],
        colors[1],
        colors[2],
        colors[3],
        colors[4],
        // East Germany, West Germany and Germany
        Highcharts.color(colors[5]).brighten(0.2).get(),
        Highcharts.color(colors[5]).brighten(0.1).get(),

        colors[5],
        colors[6],
        colors[7],
        colors[8],
        colors[9],
        colors[0],
        colors[1],
        colors[3],
        // Soviet Union, Russia
        Highcharts.color(colors[2]).brighten(-0.1).get(),
        Highcharts.color(colors[2]).brighten(-0.2).get(),
        Highcharts.color(colors[2]).brighten(-0.3).get()
    ],

    title: {
        floating: true,
        align: 'left',
        text: 'Premios de grammys por año'
    },
    subtitle: {
        floating: true,
        align: 'left',
        y: 30,
        text: ''
    },

    xAxis: {
        maxPadding: 0,
        type: 'category',
        crosshair: true,
        categories: nombre,
        labels: {
            align: 'left',
            reserveSpace: false,
            rotation: 270
        },
        lineWidth: 0,
        margin: 20,
        tickWidth: 0
    },

    yAxis: {
        visible: false,
        startOnTick: false,
        endOnTick: false
    },

    legend: {
        enabled: false
    },

    annotations: [{
        labels: [{
            point: {
                x: 5.5,
                xAxis: 0,
                y: 30,
                yAxis: 0
            },
            text: ''
        }, {
            point: {
                x: 18,
                xAxis: 0,
                y: 90,
                yAxis: 0
            },
            text: ''
        }],
        labelOptions: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'silver'
        }
    }],

    plotOptions: {
        series: {
            label: {
                minFontSize: 5,
                maxFontSize: 15,
                style: {
                    color: 'rgba(255,255,255,0.75)'
                }
            }
        }
    },

    
    series: [{
        name: "Premios",
        data: award
    }, {
        name: "Año",
        data: anyo,
    }
    
    
    ],

    exporting: {
        sourceWidth: 800,
        sourceHeight: 600
    }

});

    }
  </script>
  <svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/streamgraph.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/annotations.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>


</svelte:head>
   
  <main> 
    <Nav>
        <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        </Nav>          
        
    <h3>Uso de la API interna del Grupo 22 de SOS Grammys</h3>
    
    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">  </p>
    </figure>
  
    {#if errorMsg}
    <p>{errorMsg}</p>
    {/if}
  </main>
  
    
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
 
    #container {
	height: 600px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
	max-width: 800px;
	overflow: auto;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

  </style>