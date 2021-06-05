<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var smoking = [];
    const BASE_API_URL_SMOKING = "/api/v2/smoking_stats";
    const BASE_API_URL_POLLUTION = "/api/integrations/air-pollution";
    
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
            
                    muertesPolucion.push(d.deaths_air_pollution);
                    muertesCombustible.push(d.deaths_household_air_pollution_from_solid_fuels);
                    smoking_pop.push(data.smoking_population);
                   
                }
            })
        });


    }
    </script>