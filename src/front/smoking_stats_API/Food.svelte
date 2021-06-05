<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";    
    let correctMsg = "";
    var datos = [];
    var smoking = [];
    const BASE_API_URL_SMOKING = "/api/v2/smoking_stats";
    const BASE_API_URL_FOOD = "/api/integration/foodconsumption-stats";
    
    //INTEGRACION GRUPO 10
  async function loadFood() {
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
  async function getFood() {
    console.log("Fetching data...");
    await loadFood();
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
    async function loadAPIFood() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_FOOD).then(
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
        await loadAPIFood();
        const res = await fetch(BASE_API_URL_FOOD);
    
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
        await getFood();
        await getDatos();
    
       
        var anyo =[];
        var gramosdiario= [];
        var smoking_pop=[];
       
        datos.filter(datos => datos.country == "Spain").forEach(d => { 
           
            smoking.forEach((data) => {               
                if(data.date=="Spain"){
                    anyo.push(d.year);
                    gramosdiario.push(d.dailygram);
                    smoking_pop.push(data.smoking_population);
                }
            })
        });


    }
    </script>