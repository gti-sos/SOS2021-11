<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var stress = [];
    const BASE_API_URL_STRESS = "/api/v2/stress_stats";
    const BASE_API_URL_DESALOJOS = "/api/v1/evictions";
    
    //INTEGRACION GRUPO 25
  async function loadInversion() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_API_URL_STRESS + "/loadInitialData"
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
  async function getInversion() {
    console.log("Fetching data...");
    await loadInversion();
    const res = await fetch(BASE_API_URL_STRESS);
    if (res.ok) {
      console.log("OK");
      stress = await res.json();
      correctMsg = "";
      console.log(`We have received ${stress.length} stress-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }
    async function loadAPIInversion() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_INVERSION).then(
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
        await loadAPIInversion();
        const res = await fetch(BASE_API_URL_INVERSION);
    
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
        await getInversion();
        await getDatos();
    
       
        var presupuestos =[];
        var porcentaje = [];
        var stress_pop=[];
       
        datos.filter(datos => datos.year == 2017 ).forEach(d => { 
           
            stress.forEach((data) => {               
                if(data.date=="Spain"){
                    presupuestos.push(d.budget);
                    porcentaje.push(d.percentage);
                    stress_pop.push(data.stress_population);
                }
            })
        });


    }
    </script>