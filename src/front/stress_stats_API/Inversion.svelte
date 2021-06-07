<script>
  import { select_multiple_value } from "svelte/internal";
  
  
    var miAPI = "https://sos2021-27.herokuapp.com/api/v2/province-budget-and-investment-in-social-promotion?year=2017";
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
       sum += parseFloat(x.stress_population)
       console.log(dataG2)
       console.log((x.stress_population))
       
        });

        
       array1.push({x:"2017".toString(), y:parseFloat(sum) })
  
        
  
        
  
    myData.forEach(( x) =>{
       array2.push({x: x.year.toString(), y:parseFloat( x.percentage)})
       
      });
      console.log(myData)
  
      console.log(array1)
      console.log(array2)
      
  
        console.log("OK, BIEN")
        var chart = JSC.chart('chartDiv', { 
  debug: true, 
  type: 'area', 
  title_label_text: 'Area Series Types', 
  legend_visible: false, 
  defaultSeries: { 
    shape_opacity: 0.7, 
    color: '#f58e5e', 
    defaultPoint_marker: { 
      size: 10, 
      outline: { color: 'white', width: 2 } 
    } 
  }, 
  toolbar_items: { 
    'Area Type': { 
      type: 'select', 
      label_style_fontSize: 13, 
      margin: 5, 
      items: 'Area,Area Step,Area Spline', 
      events_change: function(val) { 
        chart.series().options({ type: val }); 
      } 
    } 
  }, 
  xAxis: { }, 
  series:  [ 
    { 
      name: 'Stress',
      points: array2
      
    }, 
    { 
      name: 'Inversion', 
      points: array1
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