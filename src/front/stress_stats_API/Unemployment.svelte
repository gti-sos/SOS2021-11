<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var stress = [];
    const BASE_API_URL_STRESS = "/api/v2/stress_stats";
    const BASE_API_URL_DESEMPLEO = "/api/v2/unemployment-stats";
    
    //INTEGRACION GRUPO 23
  async function loadDesempleo() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_API_URL_STRESS + "/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        errorMsg = "";
        correctMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        correctMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  async function getDesempleo() {
    console.log("Fetching data...");
    await loadDesempleo();
    const res = await fetch(BASE_API_URL_STRESS);
    if (res.ok) {
      console.log("OK");
      stress = await res.json();
      correctMsg = "";
      console.log(`We have received ${stress.length} stress-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }
    async function loadAPIDesempleo() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_DESEMPLEO).then(
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
        await loadAPIDesempleo();
        const res = await fetch(BASE_API_URL_DESEMPLEO);
    
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
        await getDesempleo();
        await getDatos();
    
       
        var pais =[];
        var porcentaje = [];
        var stress_pop=[];
       
        datos.filter(datos => datos.year == 2017 ).forEach(d => { 
           
            stress.forEach((data) => {               
                if(data.date=="Spain"){
                    pais.push((d.country));
                    porcentaje.push(d.gfperc);
                    stress_pop.push(data.stress_population);
                }
            })
        });

        var data =pais;

Highcharts.chart('container', {
    title: {
        text: 'Highcharts Histogram'
    },

    xAxis: [{
        title: { text: 'Data' },
        alignTicks: false
    }, {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: { text: 'Data' }
    }, {
        title: { text: 'Histogram' },
        opposite: true
    }],

    plotOptions: {
        histogram: {
            accessibility: {
                pointDescriptionFormatter: function (point) {
                    var ix = point.index + 1,
                        x1 = point.x.toFixed(3),
                        x2 = point.x2.toFixed(3),
                        val = point.y;
                    return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                }
            }
        }
    },

    series: [{
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        data: stress_pop,
        baseSeries: 's1',
        zIndex: -1
    }, {
        name: 'Data',
        type: 'histogram',
        data: porcentaje,
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
});

    }

    </script>

<svelte:head>
        
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/histogram-bellcurve.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
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
        
    <h3>Uso de la API Interna Desempleo</h3>
    
  
    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">    </p>
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
    .highcharts-figure, .highcharts-data-table table {
  min-width: 310px; 
  max-width: 800px;
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

