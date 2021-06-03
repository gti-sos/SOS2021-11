<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datosArea = [];
    const BASE_API_AREA = "https://restcountries.eu/rest/v2/?fields=name;subregion;area"
    
    async function loadArea() {
        console.log("Loading data...");
      
        const res = await fetch(BASE_API_AREA).then(
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
      
      async function getDatosArea() {
        console.log("Fetching data...");
        await loadArea();
        const res = await fetch(BASE_API_AREA);
        if (res.ok) {
          const json = await res.json();
          datosArea = json;
      
          console.log(`We have received ${datosArea.length} stats.`);
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
      async function loadChart(){
        await getDatosArea();
        var nombre = [];
        var area = [] ;

       
        datosArea.forEach((dato_api) => {
            nombre.push(dato_api.name);
            area.push(dato_api.area);
           
    
        });
		
		Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Extensión de área mundial'
    },
    subtitle: {
        text: ' '
    },
    xAxis: {
        categories: nombre,
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            
            
            }
        }
    },
    series: [{
        name: 'Área mundial',
        data: area
    
    }]
});
      }
		
		</script>
    
    <svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"  on:load={loadChart}></script>

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
          
      <h3>Uso de la API externa Area</h3>
      
    
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

#container {
    height: 420px;
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