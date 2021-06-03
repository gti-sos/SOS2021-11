<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_ENFERMOS = "https://disease.sh/v2/gov/Germany"
    
    async function loadEnfermo() {
        console.log("Loading data...");
      
        const res = await fetch(BASE_API_ENFERMOS).then(
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
      
      async function getdatos() {
        console.log("Fetching data...");
        await loadEnfermo();
        const res = await fetch(BASE_API_ENFERMOS);
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
        await getdatos();
        var provincia = [];
        var casos = [] ;
		var muertes = [] ;

       
        datos.forEach((dato_api) => {
            provincia.push(dato_api.province);
            casos.push(dato_api.cases);
			muertes.push(dato_api.deaths);
           
    
        });
		
		
		Highcharts.chart('container', {
    chart: {
        type: 'area',
        inverted: true
    },
    title: {
        text: 'Enfermos por provincia'
    },
    accessibility: {
        keyboardNavigation: {
            seriesNavigation: {
                mode: 'serialize'
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: provincia,
    },
    yAxis: {
        title: {
            text: 'Número de casos y muertes'
        },
        allowDecimals: false,
        min: 0
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
	
	
	series: [{
        name: 'Casos',
        data: casos
    }, {
        name: 'Muertes',
        data: muertes
 
    
    
    }]
});
}

</script>
    
    <svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}>
</script>
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
	  
	  #container {
    height: 410px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
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