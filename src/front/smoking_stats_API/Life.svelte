<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var smoking = [];
    const BASE_API_URL_SMOKING = "/api/v2/smoking_stats";
    const BASE_API_URL_LIFE = "/api/v2/life-stats";
    
    //INTEGRACION GRUPO 10
  async function loadLife() {
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
  async function getLife() {
    console.log("Fetching data...");
    await loadLife();
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
    async function loadAPILife() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_LIFE).then(
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
        await loadAPILife();
        const res = await fetch(BASE_API_URL_LIFE);
    
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
        await getLife();
        await getDatos();
    
        var pais=[];
        var indiceSeguridad =[];
        var smoking_pop=[];
       
        datos.filter(datos => datos.country == "spain" && datos.country == "ireland"&&
         datos.country == "germany" && datos.country == "netherlands" &&
          datos.country == "norway").forEach(d => { 
           
            smoking.forEach((data) => {  
                
                let country_minuscula = data.country.toLowerCase();
                if(data.date=="spain" && data.date=="germany" && data.date=="norway" && 
                data.date=="netherlands" && data.date=="ireland" ){
                    indiceSeguridad.push(d.safety_index);
                    smoking_pop.push(data.smoking_population);
                    pais.push(country_minuscula);
                }
            })
        });


    }
    </script>