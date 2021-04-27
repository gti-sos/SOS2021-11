<script lang="ts">
	import Router from "svelte-spa-router";

	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import anxiety_stats from "./anxiety_stats_API/App.svelte";
	import depression_stats from "./depression_stats_API/App.svelte";
	import stress_stats from "./stress_stats_API/App.svelte";
	import smoking_stats from "./smoking_stats_API/App.svelte";

	const routes = {
		"/": Home,
		"/anxiety_stats": anxiety_stats,
		"/depression_stats": depression_stats,
		"/stress_stats": stress_stats,
		"/smoking_stats": smoking_stats,
		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
