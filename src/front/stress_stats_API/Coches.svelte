<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_COCHES = "https://parallelum.com.br/fipe/api/v1/carros/marcas"
    //INTEGRACION API EXTERNA
    async function loadCoches() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_COCHES).then(
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
        await loadCoches();
        const res = await fetch(BASE_API_COCHES);
        if (res.ok) {
          const json = await res.json();
          datos = json;
          console.log('We have received ${datos.length} stats.');
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
      async function loadChart(){
        await getDatos();
        var modelo = [];
        var codigo = [] ;
        datos.forEach((dato_coches) => {
            modelo.push(dato_coches.nome);
            codigo.push(dato_coches.codigo);
        });
        
                Highcharts.chart('container', {
    
        chart: {
            type: 'item'
        },
    
        title: {
            text: 'Modelos de coches'
        },
    
        legend: {
            labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
        },
    
        series: [{
            name: 'Representatives',
            keys: ['modelo', 'codigo'],
            data:[{
        name: 'Modelo',
        data: modelo   
    }, {
        name: 'Codigo',
        data: codigo
    }],
            dataLabels: {
                enabled: true,
                format: '{point.label}'
            },
    
            // Circular options
            center: ['50%', '88%'],
            size: '170%',
            startAngle: -100,
            endAngle: 100
        }]
    });
}
    
    </script>
    
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/item-series.js"></script>
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
            En esta gráfica podemos ver la integración con una API Externa
        </p>
        <Button outline color="secondary" on:click="{pop}">Atrás</Button>
    </figure>

    {#if errorMsg}
      <p>{errorMsg}</p>
      {/if}
    </main>
    
    <style>
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
    
    
    input[type="number"] {
        min-width: 50px;
    }
    </style>