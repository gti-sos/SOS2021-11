<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_FARMACIA = "https://opendata.alcoi.org/data/dataset/73088621-45b9-41a0-9060-c90ab20daf76/resource/1d9e38a7-4ff1-4eb6-a018-ddd71bb52b08/download/deporte.geojson"
    //INTEGRACION API EXTERNA
    async function loadFarmacia() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_FARMACIA).then(
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
        await loadFarmacia();
        const res = await fetch(BASE_API_FARMACIA);
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
        var calle = [];
        var idComunidad = [] ;
        var latitud = [] ;
        var longitud = [] ;
        datos.forEach((dato_Farmacia) => {
            calle.push(dato_Farmacia.streetAddress);
            idComunidad.push(dato_Farmacia.idComunidad);
            latitud.push(dato_Farmacia.latitud);
            longitud.push(dato_Farmacia.longitud);
        });
        
        Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Farmacias dadas de alta en registros municipal y autonómico'
    },
    xAxis: {
        categories: calle,
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Coordenadas'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Coordenada de la longitud',
        data: longitud   
    }, {
        name: 'Coordenada de la latitud',
        data: latitud
    }, {
        name: 'Identificador de Comunidad',
        data: idComunidad
    }]
});
}
</script>

<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
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
    
#container {
    height: 400px; 
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
