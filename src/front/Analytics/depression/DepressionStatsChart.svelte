<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let depressionDataGraph = [];

        const resData = await fetch("/api/v1/depression_stats");
        depressionData = await resData.json();

        depressionData.forEach((x) => {
            depressionDataGraph.push({
                name: x.country + " " + x.year,
                data: [
                    "",
                    parseInt(x.depression_men),
                    parseInt(x.depression_women),
                    parseInt(x.depression_population),
                    "",
                ],
                pointPlacement: "on",
            });
        });
        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "Datos de Ansiedad",
            },

            xAxis: {
                categories: [
                    "",
                    "Datos de Ansiedad de Hombre (radio/media)",
                    "Datos de Ansiedad de Mujer (radio/media)",
                    "Datos de Ansiedad de Poblacion (radio/media)",
                    "",
                ],
                title: {
                    text: null,
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "miles",
                    align: "high",
                },
                labels: {
                    overflow: "justify",
                },
            },
            tooltip: {
                // valueSuffix: ' miles'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -40,
                y: 80,
                floating: false,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
                shadow: true,
            },
            credits: {
                enabled: false,
            },
            series: depressionDataGraph,
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            <i>
                En esta simple gráfica de lineas podemos observar los datos de
                Ansiedad en las CC.AA en España en el año 2017.</i
            >
        </p>
    </figure>
    <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
</main>