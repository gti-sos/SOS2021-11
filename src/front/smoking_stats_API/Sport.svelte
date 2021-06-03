<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_SPORTS = "https://datos.vigo.org/data/deportes/ins-complejos.json"
    
    async function loadSport() {
        console.log("Loading data...");
      
        const res = await fetch(BASE_API_SPORTS).then(
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
        await loadSport();
        const res = await fetch(BASE_API_SPORTS);
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
        var longitud = [] ;
        var latitud = [];
       
        datos.forEach((dato_api) => {
            nombre.push(dato_api.nombre);
            longitud.push(dato_api.lon);
            latitud.push(dato_api.lat);
    
        });
        
          Highcharts.chart('container', {
              chart: {
                  type: 'areaspline'
              },
              title: {
                  text: 'Instalaciones Deportivas de Vigo'
              },
              legend: {
                  layout: 'vertical',
                  align: 'left',
                  verticalAlign: 'top',
                  x: 150,
                  y: 100,
                  floating: true,
                  borderWidth: 1,
                  backgroundColor:
                      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
              },
              xAxis: {
                  categories: nombre,
              },
              yAxis: {
                  title: {
                      text: 'Dirección GPS'
                  }
              },
              tooltip: {
                  shared: true,
                  valueSuffix: ' units'
              },
              credits: {
                  enabled: false
              },
              plotOptions: {
                  areaspline: {
                      fillOpacity: 0.5
                  }
              },
              series: [{
                  name: 'Coordenada de la longitud',
                  data: longitud   
              }, {
                  name: 'Coordenada de la latitud',
                  data: latitud
              }, {
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
          
      <h3>Uso de la API externa Deportes Vigo</h3>
      
    
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