<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_MUERTES = "https://disease.sh/v2/countries?yesterday=false&sort=deaths&allowNull=true"
    //INTEGRACION API EXTERNA
    async function loadCOVID() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_MUERTES).then(
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
        await loadCOVID();
        const res = await fetch(BASE_API_MUERTES);
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
        var pais = [];
        var casos = [] ;
        var muertes = [] ;
        datos.forEach((dato_muertes) => {
            pais.push(dato_muertes.country);
            casos.push(dato_muertes.cases);
            muertes.push(dato_muertes.deaths);
        });
        
        Highcharts.chart('container', {
    title: {
        text: 'Casos infectados de Covid-19'
    },
    
    xAxis: {
        gridLineWidth: 1,
        title: {
            enabled: true
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [{
        name: 'Muertes',
        type: 'polygon',
        data: muertes,
        color: Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
        enableMouseTracking: false,
        accessibility: {
            exposeAsGroupOnly: true
        }
    }, {
        name: 'Casos',
        type: 'scatter',
        color: Highcharts.getOptions().colors[1],
        data: casos,
    }],
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x} cm, {point.y} kg'
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    layout: 'horizontal',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

}
</script>

<svelte:head>
    
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
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

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
    </p>
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
    min-width: 360px; 
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
