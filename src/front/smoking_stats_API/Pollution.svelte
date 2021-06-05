<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var smoking = [];
    const BASE_API_URL_SMOKING = "https://sos2021-11.herokuapp.com/api/v2/smoking_stats";
    const BASE_API_URL_POLLUTION = "https://sos2021-03.herokuapp.com/api/integrations/air-pollution";
    
    //INTEGRACION GRUPO 10
  async function loadPollution() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_API_URL_SMOKING + "/loadInitialData"
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
  async function getPollution() {
    console.log("Fetching data...");
    await loadPollution();
    const res = await fetch(BASE_API_URL_SMOKING);
    if (res.ok) {
      console.log("OK");
      smoking = await res.json();
      correctMsg = "";
      console.log(`We have received ${smoking.length} smoking-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }
    async function LoadAPIPollution() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_POLLUTION).then(
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
        await LoadAPIPollution();
        const res = await fetch(BASE_API_URL_POLLUTION);
    
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
        await getPollution();
        await getDatos();
    
       
        var muertesPolucion =[];
        var muertesCombustible =[];
        var smoking_pop=[];
       

        datos.filter(datos => datos.year == 2017 ).forEach(d => { 

            smoking.forEach((data) => {  
                if(data.date==2017 ){
            
                    muertesPolucion.push(parseFloat(d.deaths_air_pollution));
                    muertesCombustible.push(parseFloat(d.deaths_household_air_pollution_from_solid_fuels));
                    smoking_pop.push(parseFloat(data.smoking_population));
                   
                }
            })
        });


        var options = {
  chart: {
    width: 900,
    height: 600,
    type: 'bar'
  },
  title: {
    text: "Polución en comparativa con la población fumadora",
    align: 'center',
        },
  series: [
    {
      name: 'Muertes por polución',
      data: deaths_air_pollution
    },
    {
      name: 'Muertes por combustible',
      data: deaths_household_air_pollution_from_solid_fuels
    }
  ],
  xaxis: {
    categories: smoking_pop
  }
}
var chart = new ApexCharts(document.querySelector('#chart'), options)
chart.render()
 
    
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"
  on:load={loadChart}></script>
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
  div {
    margin-bottom: 15px;
  }
  #container{
  width:100%;
  display: flex;
  justify-content: center;
  }
</style>