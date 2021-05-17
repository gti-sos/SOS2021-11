<script>

    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
        //Esta es la gráfica común del grupo.

        const anxiety_stats = await fetch("/api/v2/anxiety_stats");
        const depression_stats = await fetch("/api/v1/depression_stats");
        const stress_stats = await fetch("/api/v1/stress_stats");
        const smoking_stats = await fetch("/api/v1/smoking_stats");

        let anxiety = await anxiety_stats.json();
        let depression = await depression_stats.json();
        let stress = await stress_stats.json();
        let smoking = await smoking_stats.json();

        let anxiety_stats_data = anxiety.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["anxiety_men"],
            };
            return res;
        });

        let depression_stats_data = depression.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["depression_women"],
            };
            return res;
        });

        let stress_stats_data = stress.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["stress_population"],
            };
            return res;
        });

        let smoking_stats_data = smoking.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["smoking_women"],
            };
            return res;
        });

        let dataTotal = [
            {
                name: "Datos de Ansiedad de hombres en el caso de sufrir ansiedad",
                data: anxiety_stats_data,
            },
            {
                name: "Datos de Ansiedad de mujeres en el caso de sufrir depresión",
                data: depression_stats_data,
            },
            {
                name: "Datos de Estrés de la población en el caso de sufrir estrés",
                data: stress_stats_data,
            },
            {
                name: "Datos de Tabaquismo de mujeres en el caso de estar afectados por tabaquismo",
                data: smoking_stats_data,
            }
        ];

        Highcharts.chart("container", {
            chart: {
                type: "packedbubble",
                height: "100%",
            },
            title: {
                text: "Mezcla de APIs",
            },
            tooltip: {
                useHTML: true,
                pointFormat: "<b>{point.name}:</b> {point.value}",
            },
            plotOptions: {
                packedbubble: {
                    minSize: "30%",
                    maxSize: "120%",
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02,
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                        filter: {
                            property: "y",
                            operator: ">",
                            value: 250,
                        },
                        style: {
                            color: "black",
                            textOutline: "none",
                            fontWeight: "normal",
                        },
                    },
                },
            },
            series: dataTotal,
        });
    }
    loadGraph();
</script>

<svelte:head>
    <script
        src="https://code.highcharts.com/highcharts.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/highcharts-more.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/modules/exporting.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfica que muestra los datos de las 4 APIs. Son los siguientes datos: datos de ansiedad de hombre en las CC.AA de España, 
            datos de depresión de mujer en las CC.AA de España, datos de la población afectada por estrés en las CC.AA de España, y por último, 
            y no menos importante, los datos de mujeres afectadas por el tabaquismo en países de Europa
        </p>
    </figure>
</main>
