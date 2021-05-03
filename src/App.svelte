<script lang="ts">
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
		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
