<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_EDUCACION = "https://education-expenditures.herokuapp.com/api/v1"
    //INTEGRACION API INTERNA
    async function loadEducacion() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_EDUCACION).then(
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
        await loadEducacion();
        const res = await fetch(BASE_API_EDUCACION);
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
        var education_expenditure_per_millions = [] ;
        var pais = [] ;
        datos.forEach((dato_educacion) => {
          education_expenditure_per_millions.push(dato_educacion.education_expenditure_per_millions);
            pais.push(dato_educacion.country);
        });
        
        Highcharts.chart('container', {

chart: {
    type: 'lollipop'
},

accessibility: {
    point: {
        valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
    }
},

legend: {
    enabled: false
},

subtitle: {
    text: '2018'
},

title: {
    text: 'Top 10 Countries by Population'
},

tooltip: {
    shared: true
},

xAxis: {
    type: 'Expedición de educación'
},

yAxis: {
    title: {
        text: 'Pais'
    }
},

series: [{
        name: 'Pais',
        data: pais,
      
},{
        name: 'Expedición de educación',
        data: education_expenditure_per_millions,
    
}]

});
    }
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
<script src="https://code.highcharts.com/modules/lollipop.js"></script>
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

.ld-label {
	width:200px;
	display: inline-block;
}

.ld-url-input {
	width: 500px; 
}

.ld-time-input {
	width: 40px;
}

</style>
