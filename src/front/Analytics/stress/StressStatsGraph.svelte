<script>
    async function loadGraph() {
        const stress_stats_data = await fetch("/api/v2/stress_stats");

        let stress_data = await stress_stats_data.json();

        console.log("Base de datos de Estres:" + stress_data);

        let stressData = stress_data.map((d) => {
            let res = {
                name: d.country,
                y: d.stress_population,
                z: d.year
            };
            return res;
        });
        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Estres (Año 2017)'
            },
            subtitle: {
                text: 'Estres por población en las CC.AA de España'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    'Población Afectada: <b>{point.y}</b><br/>' +
                    'Año: <b>{point.z}</b><br/>'
            },
            series: [{
                name: 'Población Afectada',
                data: stressData
            }]
        });
    }
    loadGraph();
</script>
<main>
    <div id='container'></div>
</main>