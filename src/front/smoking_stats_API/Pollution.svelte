
  <script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { onMount } from "svelte";
    async function loadGraph() {
        let pollutionData = [];
        let smokingData = [];

        await fetch(
            "https://sos2021-03.herokuapp.com/api/integrations/air-pollution/loadInitialData"
        );

        await fetch("/api/v2/smoking_stats/loadInitialData");

        const data = await fetch(
            "https://sos2021-03.herokuapp.com/api/integrations/air-pollution"
        );

        const datos = await fetch("/api/v2/smoking_stats");

        pollutionData = await data.json();
        smokingData = await datos.json();

        var muertesPolucion =[];
        var muertesCombustible =[];
        var smoking_pop=[];
      

        pollutionData.forEach((dato) => {
          muertesPolucion.push(dato.deaths_air_pollution);
          muertesCombustible.push(dato.deaths_household_air_pollution_from_solid_fuels);
        });

        smokingData.forEach((dato) => {
          smoking_pop.push(dato.smoking_population);
           
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
      data: muertesPolucion
    },
    {
      name: 'Muertes por combustible',
      data: muertesCombustible
    }
  ],
  xaxis: {
    categories: smoking_pop
  }
}
var chart = new ApexCharts(document.querySelector('#chart'), options)
chart.render()
 
onMount(loadGraph);
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"
  on:load={loadGraph}></script>
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