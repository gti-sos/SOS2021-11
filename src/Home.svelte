<script>
    import Box from "./utilities/Box.svelte";
</script>

<main>
    <h3 style="text-align: center;margin-bottom: 40px;">Proyecto</h3>
    <h3 style="text-align: center;margin-bottom: 40px;">Grupo 11 SOS2021-11</h3>
    <div class="row">
        <div class="col-6">
            <h2 style="text-align: center;margin-bottom: 40px;">Repository</h2>
            <h4 style="text-align: center;margin-bottom: 40px;">
                <a href="https://github.com/gti-sos/SOS2021-11"
                    >gti-sos/SOS2021-11</a
                >
            </h4>
        </div>
        <div class="col-6">
            <h2 style="text-align: center;margin-bottom: 40px;">URL</h2>
            <h4 style="text-align: center;margin-bottom: 40px;">
                <a href="http://sos2021-11.herokuapp.com" rel="nofollow"
                    >sos2021-11.herokuapp.com</a
                >
            </h4>
        </div>
        <h2 style="text-align: center;margin-bottom: 40px;">Team</h2>
        <div
            style="display:flex;align-items:center;justify-content: center;margin-bottom: 40px;"
        >
            <Box>
                <span slot="name"> Jose Pablo Carrasco Cobos </span>
                <span slot="pmaddress">
                    <a
                        href="https://documenter.getpostman.com/view/14948159/TzJsexjn"
                        rel="nofollow">POSTMAN anxiety_stats - joscarcob1</a
                    >
                </span>
                <span slot="apiurl">
                    <a
                        href="https://sos2021-11.herokuapp.com/api/v1/anxiety_stats"
                        rel="nofollow">APIv1 anxiety-stats</a
                    >
                </span>
                <span slot="apibutton">
                    <button
                        type="button"
                        style="background: white; color:black"
                        class="btn btn-outline-success"
                        onclick="window.location.href='#/anxiety_stats_API'"
                    >
                        API anxiety_stats</button
                    >
                </span>
            </Box>
            <!--	<Box>
			<span slot="name">
				Casto Rodríguez Díaz
			</span>
			<span slot="pmaddress">
				<a href="https://documenter.getpostman.com/view/10826099/SzYUXfdy" rel="nofollow">POSTMAN DE
					casroddia</a>
			</span>
			<span slot="apiurl">
				<a href="https://sos1920-22.herokuapp.com/api/v1/og-basket-stats/" rel="nofollow">APIv1
					og-basket-stats</a>
			</span>
			<span slot="apibutton">
				<button type="button" style="background: white; color:black" class="btn btn-outline-info"
					onclick="window.location.href='#/basketAPI'"><i class='fas fa-leaf'></i> API de Baloncesto</button>
			</span>
			<span slot="chartbuttons">
				<div class="btn-group" role="group" aria-label="">
					<button type="button" class="btn btn-outline-danger" style="background: white; color:black"
						onclick="window.location.href='#/analytics/highcharts-og-basket-stats'"><i
							class='fas fa-leaf'></i> HighChart</button>
					<button type="button" class="btn btn-outline-success" style="background: white; color:black"
						onclick="window.location.href='#/analytics/awesome-og-basket-stats'"><i
							class='fas fa-leaf'></i>AwesomeChart</button>
				</div>
			</span>
		</Box>
		<Box>
			<span slot="name">
				Juan Antonio Aranda Triana
			</span>
			<span slot="pmaddress">
				<a href="https://documenter.getpostman.com/view/10153510/SzYUXfiH" rel="nofollow">POSTMAN DE
					juaaratri</a>
			</span>
			<span slot="apiurl">
				<a href="http://sos1920-22.herokuapp.com/api/v1/swim-stats" rel="nofollow">APIv1 swim-stats</a>
			</span>
			<span slot="apibutton">
				<button type="button" style="background: white; color:black" class="btn btn-outline-danger"
					onclick="window.location.href='#/swimstatsAPI'"><i class='fas fa-leaf'></i> API de Natación</button>
			</span>
			<span slot="chartbuttons">
				<div class="btn-group" role="group" aria-label="">
					<button type="button" class="btn btn-outline-danger" style="background: white; color:black"
						onclick="window.location.href='#/analytics/highcharts-swim-stats'"><i class='fas fa-leaf'></i>
						HighChart</button>
					<button type="button" class="btn btn-outline-success" style="background: white; color:black"
						onclick="window.location.href='#/analytics/awesome-swim-stats'"><i
							class='fas fa-leaf'></i>AwesomeChart</button>
				</div>
			</span>
		</Box> -->
        </div>
    </div>
</main>
