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
       // var pais = [] ;
        var premios = [];
        var anyo= [];
       
        datos.forEach((dato_grammy) => {
            nombre.push(dato_grammy.name);
          //  pais.push(dato_grammy.country);
            premios.push(dato_grammy.award);
			anyo.push(dato_grammy.year);
           
    
        });
        var chart = new tauCharts.Chart({

data:premios,
type:'scatterplot',
x: anyo,
y: nombre,
color:'isWinner',
size:null,
plugins:
[

tauCharts.api.plugins.get('tooltip')(),
tauCharts.api.plugins.get('legend')(),
tauCharts.api.plugins.get('quick-filter')(),
tauCharts.api.plugins.get('trendline')(),
]

});

chart.renderTo('#container'); 
}
    </script>
    
    
    
     
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
	height: 600px;
}



    </style>