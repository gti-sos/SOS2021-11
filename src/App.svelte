<script>
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";

	import Home from "./Home.svelte";
	import Info from "./Info.svelte";

	import anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsAPI.svelte";
	import edit_anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsEdit.svelte";

	import depression_stats from "./front/depression_stats_API/App.svelte";
	import edit_depression_stats from "./front/depression_stats_API/DepressionStatsEdit.svelte";

	import stress_stats from "./front/stress_stats_API/StressStatsAPI.svelte";
	import edit_stress_stats from "./front/stress_stats_API/StressStatsEdit.svelte";

	import smoking_stats from "./front/smoking_stats_API/SmokingStatsAPI.svelte";
	import edit_smoking_stats from "./front/smoking_stats_API/SmokingStatsEdit.svelte";

	import analytics from "./front/Analytics/MedicalIssues.svelte";
	

	import anxiety_stats_graph from "./front/Analytics/anxiety/AnxietyStatsGraph.svelte"
	import anxiety_stats_chart from "./front/Analytics/anxiety/AnxietyStatsChart.svelte"

	import depression_stats_graph from "./front/Analytics/depression/DepressionStatsGraph.svelte"
	import depression_stats_chart from "./front/Analytics/depression/DepressionStatsChart.svelte"

	import stress_stats_graph from "./front/Analytics/stress/StressStatsGraph.svelte"
	import stress_stats_chart from "./front/Analytics/stress/StressStatsChart.svelte"

	import smoking_stats_graph from "./front/Analytics/smoking/SmokingStatsGraph.svelte"
	import smoking_stats_chart from "./front/Analytics/smoking/SmokingStatsChart.svelte"


	const routes = {
		"/": Home,
		"/info": Info,
		"/anxiety_stats": anxiety_stats,
		"/anxiety_stats/:country/:year": edit_anxiety_stats,
		"/depression_stats": depression_stats,
		"/depression_stats/:country/:year": edit_depression_stats,
		"/stress_stats": stress_stats,
		"/stress_stats/:country/:year": edit_stress_stats,
		"/smoking_stats": smoking_stats,
		"/smoking_stats/:country/:year": edit_smoking_stats,

		"/analytics/anxiety_stats_graph": anxiety_stats_graph,
		"/analytics/anxiety_stats_chart": anxiety_stats_chart,

		"/analytics/depression_stats_graph": depression_stats_graph,
		"/analytics/depression_stats_chart": depression_stats_chart,

		"/analytics/stress_stats_graph": stress_stats_graph,
		"/analytics/stress_stats_chart": stress_stats_chart,

		"/analytics/smoking_stats_graph": smoking_stats_graph,
		"/analytics/smoking_stats_chart": smoking_stats_chart,

		"/analytics": analytics,
		



		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
