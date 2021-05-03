<script lang="ts">
	import Router from "svelte-spa-router";

	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";

	import anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsAPI.svelte";
	import edit_anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsEdit.svelte";

	import depression_stats from "./front/depression_stats_API/App.svelte";

	import stress_stats from "./front/stress_stats_API/App.svelte";
	import edit_stress_stats from "./front/stress_stats_API/StressStatsEdit.svelte";

	import smoking_stats from "./front/smoking_stats_API/App.svelte";
	import edit_smoking_stats from "./front/smoking_stats_API/SmokingStatsEdit.svelte";
	
	import info from "./Pages/Info.svelte";

	const routes = {
		"/": Home,
		"/info": info,
		"/anxiety_stats": anxiety_stats,
		"/anxiety_stats/:country/:year": edit_anxiety_stats,
		"/depression_stats": depression_stats,
		"/stress_stats": stress_stats,
		"/smoking_stats": smoking_stats,
		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
