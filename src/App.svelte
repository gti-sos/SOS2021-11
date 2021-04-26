<script lang="ts">

import Router from 'svelte-spa-router';

	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import anxiety_stats from "./anxiety_stats_API/App.svelte";

	const routes = {
		"/": Home,
		"/anxiety_stats": anxiety_stats,
		"*": NotFound,
	};
</script>

<main>
    <Router {routes} />
</main>
