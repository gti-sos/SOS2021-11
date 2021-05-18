<script>
    async function loadGraph() {
        const smoking_stats_data = await fetch("/api/v2/smoking_stats");

        let smoking_data = await smoking_stats_data.json();

        console.log("Base de datos de Tabaquismo:" + smoking_data);

        let smokingData = smoking_data.map((d) => {
            let res = {
                name: d.country,
                y: d.smoking_population,
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
                text: 'Tabaquismo (Año 2017)'
            },
            subtitle: {
                text: 'Tabaquismo por población en los países de Europa'
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
                data: smokingData
            }]
        });
    }
    loadGraph();
</script>
<main>
    <div id='container'></div>
</main>