<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let suicideData = [];
        
        const resData = await fetch(
            "/api/v2/depression_stats"
        );

        const resData2 = await fetch(
            "http://sos2021-27.herokuapp.com/api/integration/suicide-records"
        );
        depressionData = await resData.json();
        suicideData = await resData2.json();


        
        var coordenadasDepresion=[];
        var coordenadassuicide=[];
        
        depressionData.forEach((campo) => {
           coordenadasDepresion.push({x:campo.year,y:campo.depression_men});
                
        });
        suicideData.forEach((campo) => {
           coordenadassuicide.push({x:campo.year,y:campo.suic_woman});
                
        });

        
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Depresion y suicidio por año",
                },
                axisY: {
                    includeZero: false,
                  
                },
                toolTip: {
                    shared: true,
                },
                legend: {
                    fontSize: 13,
                },
                data: [
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "suicide",
                    
                        dataPoints: coordenadassuicide,
                    },
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "depression",
                        dataPoints: coordenadasDepresion,
                    },
                   
                ],
            });
            chart.render();
        
    }
</script>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;" />
    <script
        type="text/javascript"
        src="https://canvasjs.com/assets/script/canvasjs.min.js"  on:load={loadGraph}></script>
    <div
        style="margin-top:16px;color:dimgrey;font-size:9px;font-family: Verdana, Arial, Helvetica, sans-serif;text-decoration:none;"
    >
        Source:
        <a
            href="https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/"
            target="_blank"
            title="JavaScript Multi Series Spline Area Charts "
            >https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/</a
        >
    </div>
    <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
</main>
