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
        Highcharts.chart('container', {

chart: {
    type: 'boxplot'
},

title: {
    text: 'Hi'
},

legend: {
    enabled: false
},

xAxis: {
    categories: nombre,
    title: {
        text: 'Experiment No.'
    }
},

yAxis: {
    title: {
        text: 'Observations'
    },
    plotLines: [{
        value: 932,
        color: 'red',
        width: 1,
        label: {
            text: 'Theoretical mean: 932',
            align: 'center',
            style: {
                color: 'gray'
            }
        }
    }]
},

series: [{
    name: 'Observations',
    data: anyo,
    tooltip: {
        headerFormat: '<em>Experiment No {point.key}</em><br/>'
    }
}, {
    name: 'Outliers',
    color: Highcharts.getOptions().colors[0],
    type: 'boxplot',
    data: premios,
    marker: {
        fillColor: 'red',
        lineWidth: 1,
        lineColor: Highcharts.getOptions().colors[0]
    },
    tooltip: {
        pointFormat: 'Observation: {point.y}'
    }
}]

});
      }
    </script>
    <svelte:head>
      <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
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
    height: 400px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 700px;
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