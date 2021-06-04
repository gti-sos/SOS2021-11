<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_DESEMPLEO = "https://sos2021-07.herokuapp.com/api/v2/unemployment"
    //INTEGRACION API INTERNA
    async function loadDesempleo() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_DESEMPLEO).then(
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
        await loadDesempleo();
        const res = await fetch(BASE_API_DESEMPLEO);
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
        var ocupacion = [] ;
        var anyo = [] ;
        datos.forEach((dato_desempleo) => {
            ocupacion.push(dato_desempleo.occupation_variation);
            anyo.push(dato_desempleo.year);
        });
        
        Highcharts.chart('container', {

chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy'
},

title: {
    text: 'Tasa de ocupación por año'
},

xAxis: {
    gridLineWidth: 1,
    accessibility: {
        rangeDescription: 'Range: 0 to 100.'
    }
},

yAxis: {
    startOnTick: false,
    endOnTick: false,
    accessibility: {
        rangeDescription: 'Range: 0 to 100.'
    }
},

series: [{
    data: 
        anyo,
    marker: {
        fillColor: {
            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
            stops: [
                [0, 'rgba(255,255,255,0.5)'],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
            ]
        }
    }
}, {
    data: 
        ocupacion,
    marker: {
        fillColor: {
            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
            stops: [
                [0, 'rgba(255,255,255,0.5)'],
                [1, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
            ]
        }
    }
}]

});
}
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
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
