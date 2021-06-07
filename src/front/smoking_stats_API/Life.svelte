<script>
  import { select_multiple_value } from "svelte/internal";
  
  
    var miAPI = "https://sos2021-01.herokuapp.com/api/v2/life-stats/?country=spain";
    var API2 = "https://sos2021-11.herokuapp.com/api/v2/smoking_stats/?country=Spain";
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
       sum +=parseFloat(x.smoking_population)
  
       console.log(dataG2)
       console.log((x.gfperc))
       
        });
  
        array1.push({x:"spain".toString(), y:parseFloat(sum) })
  
        
  
    myData.forEach(( x) =>{
       array2.push({x:x.country.toString(), y:parseFloat( x.safety_index)})
       console.log(myData)
      });
  
      console.log(array1)
      console.log(array2)
      
  
        console.log("OK, BIEN")

        const data = {
        labels: country,
        datasets: [
            {
            label: 'Esperanza de vida media',
            data: array1,
            borderColor: "#FF000080",
            backgroundColor: "#FF4B4B80",
            },
            {
            label: '% Dependencia de uso de drogas',
            data: array2,
            borderColor: "#0023FF80",
            backgroundColor: "#3F59FF80",
            }
        ]
        };
    var ctx = document.getElementById('myChart');
      new Chart(ctx, {
                type: 'radar',
        data: data,
        options: {
            responsive: true,
            plugins: {
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            }
            }
        },
        });

  }
</script>
  
  <svelte:head>
    <script src="https://github.com/chartjs/Chart.js/blob/master/docs/scripts/utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js" on:load={loadGraph}></script>
  </svelte:head>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div {
      margin-bottom: 15px;
    }
    #container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  </style>