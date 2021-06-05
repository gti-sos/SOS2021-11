<script>
    import { onMount } from "svelte";
    async function loadGraph() {
        let indiaData = [];
        let indiaGraph = [];
        let indiaState = [];

        const data = await fetch(
            "https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails"
        );
        if (data.ok) {
            indiaData = await data.json();
            indiaData.forEach((x) => {
                indiaGraph.push({
                    text: x.name,
                    values: [
                        parseInt(x.totalsamples),
                        parseInt(x.negative),
                        parseInt(x.positivos),
                    ],
                });
                indiaState.push(x.state);
            });
        }
        if (data.status == 404) {
            console.log("Cargando datos iniciales al no encontrarlos");
            const data = await fetch(
                "https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails/loadInitialData"
            );
        }

        var myConfig = {
            type: "bubble-pie",
            title: {
                text: "Datos de Covid en India",
            },
            legend: {
                align: "center",
                item: {
                    text: "%data-pie",
                },
                verticalAlign: "bottom",
            },
            plot: {
                values: [
                    [2020, 2003, 2003],
                    [2021, 2500, 2500],
                    [2021, 3500, 3500],
                    [2021, 4500, 4500],
                    [2021, 5500, 5500],
                ],
                tooltip: {
                    text: "%data-pv% %data-pie",
                },
                valueBox: {
                    text: "%node-size-value total responses",
                    fontColor: "black",
                    fontWeight: "normal",
                    placement: "bottom",
                },
                dataBubble: ["2021"],
            },
            scaleX: {
                values: "2020:2021:1",
            },
            series: [
                {
                    dataPie: "positive",
                    dataV: [1250, 819, 1175, 2299, 185],
                    marker: {
                        backgroundColor: "#D60404",
                    },
                },
                {
                    dataPie: "negative",
                    dataV: [12, 16, 132, 32, 1],
                    marker: {
                        backgroundColor: "#04D607",
                    },
                },
            ],
        };
        zingchart.render({
            id: "myChart",
            data: myConfig,
        });
    }
    onMount(loadGraph);
</script>

<svelte:head>
    <script
        src="https://cdn.zingchart.com/zingchart.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <h1><div id="myChart">Integración SOS: Covid India</div></h1>
</main>

<style>
    h1 {
        text-align: center;
    }
    div {
        color: rgb(116, 121, 9); /* Blue text color */
        border: 10px dotted currentcolor;
    }
</style>
