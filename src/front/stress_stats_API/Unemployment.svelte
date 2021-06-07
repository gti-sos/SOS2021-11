<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://sos2021-11.herokuapp.com/api/v2/stress_stats";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosPaisUnemp=[];
        let datosAñosUnemp = [];
        let datosIntperc = [];
        let stress = [];
        let datosAñosLife = [];
        let datosPaisLife =[];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosPaisUnemp = myData.map((myData)=> (myData.country));
        datosAñosUnemp = myData.map((myData)=> parseInt(myData.year));
        datosIntperc = myData.map((myData)=> myData.intperc);
        
        datosPaisLife = dataG2.map((dataG2)=> dataG2.country);
        datosAñosLife = dataG2.map((dataG2)=> dataG2.date);
        stress = dataG2.map((dataG2)=> dataG2.stress_population);
        
        dataG2.forEach((e) => {
            stress.push(e.stress_population);
        });
    
        var chart = JSC.chart('chartDiv', { 
debug: true, 
type: 'horizontal column', 
palette: 'fiveColor7', 
yAxis: { 
  scale_type: 'stacked', 
  label_text: 'Units Sold'
}, 
defaultPoint_outline_color: 'darkenMore', 
title_label_text: 'Acme Tool Sales', 
xAxis_label_text: 'Quarter', 
series: [ 
  { 
    name: 'Saw', 
    id: 's1', 
    points: datosIntperc 
  }, 
  { 
    name: 'Saw', 
    id: 's1', 
    points: stress 
  }, 
  
] 
});
  
  }
</script>

<svelte:head>

  <script
  type="text/javascript" src="https://code.jscharting.com/latest/jscharting.js"
      on:load={loadGraph}></script>
</svelte:head>

<main>

  <div id="chartDiv"></div>
  
</main>