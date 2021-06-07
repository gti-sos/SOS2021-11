<script>
  import { select_multiple_value } from "svelte/internal";
  
  
    var miAPI = "http://sos2021-25.herokuapp.com/api/v1/evictions/?year=2017";
    var API2 = "https://sos2021-11.herokuapp.com/api/v2/stress_stats/?year=2017";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
  
        myData = await resData.json();
        dataG2 = await resDataG2.json();
  
        let array1 = [];
        let array2 =[];
        let sum = [];
  
        dataG2.forEach(( x) =>{
       sum +=parseFloat(x.stress_population)
       console.log(dataG2)
       console.log((x.stress_population))
       
        });
  
        
       array1.push({x:"2017".toString(), y:parseFloat(sum) });
        
  
        
  
    myData.forEach(( x) =>{
       array2.push({x: x.rustic.toString(), y: x.household.toString()})
       console.log(myData)
      });
  
      console.log(array1)
      console.log(array2)
      
  
        console.log("OK, BIEN")

        var chart = JSC.chart('chartDiv', { 
  debug: true, 
  defaultSeries_type: 'spline', 
  defaultPoint_label_text: '%xValue, %yValue', 
  xAxis_scale_range: [2, 8], 
  series: [ 
    { 
      name: 'Start Points', 
      defaultPoint_color: 'red', 
      points: array2
    } 
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