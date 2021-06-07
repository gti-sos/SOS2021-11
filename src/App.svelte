<script>
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";

	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Integrations from "./Integrations.svelte";

	import anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsAPI.svelte";
	import edit_anxiety_stats from "./front/anxiety_stats_API/AnxietyStatsEdit.svelte";

	import depression_stats from "./front/depression_stats_API/App.svelte";
	import edit_depression_stats from "./front/depression_stats_API/DepressionStatsEdit.svelte";

	import stress_stats from "./front/stress_stats_API/StressStatsAPI.svelte";
	import edit_stress_stats from "./front/stress_stats_API/StressStatsEdit.svelte";

	import smoking_stats from "./front/smoking_stats_API/SmokingStatsAPI.svelte";
	import edit_smoking_stats from "./front/smoking_stats_API/SmokingStatsEdit.svelte";

	import analytics from "./front/Analytics/MedicalIssues.svelte";


	import depression_stats_graph from "./front/Analytics/depression/DepressionStatsGraph.svelte";
	import depression_stats_chart from "./front/Analytics/depression/DepressionStatsChart.svelte";

	import stress_stats_graph from "./front/Analytics/stress/StressStatsGraph.svelte";
	import stress_stats_chart from "./front/Analytics/stress/StressStatsChart.svelte";

	import smoking_stats_graph from "./front/Analytics/smoking/SmokingStatsGraph.svelte";
	import smoking_stats_chart from "./front/Analytics/smoking/SmokingStatsChart.svelte";

	//INTEGRACIONES JOSE PABLO CARRASCO COBOS
	import India from "./front/anxiety_stats_API/Integrations/India.svelte";
	import Sanity from "./front/anxiety_stats_API/Integrations/Sanity.svelte";
	import Illiteracy from "./front/anxiety_stats_API/Integrations/Illiteracy.svelte";
	import Natality from "./front/anxiety_stats_API/Integrations/Natality.svelte";

	import NBA from "./front/anxiety_stats_API/Integrations/NBA.svelte";
	import Games from "./front/anxiety_stats_API/Integrations/Games.svelte"

	import anxiety_1 from "./front/anxiety_stats_API/anxiety/anxiety_1.svelte";
	import anxiety_2 from "./front/anxiety_stats_API/anxiety/anxiety_2.svelte";

	//INTEGRACIONES Juan Díez Blanco
	import children_out from "./front/depression_stats_API/children_out.svelte";
	import suicides from "./front/depression_stats_API/suicides.svelte";
	import obesity from "./front/depression_stats_API/obesity.svelte";
	import Futbol from "./front/depression_stats_API/Futbol.svelte";
	import bad from "./front/depression_stats_API/bad.svelte";

	//INTEGRACIONES ANA ROMERO CÁCERES
	import COVID_19 from "./front/stress_stats_API/Covid.svelte";
	import Bicicletas from "./front/stress_stats_API/Bicicleta.svelte";
	import Unemployment from "./front/stress_stats_API/Unemployment.svelte";
	import Evictions from "./front/stress_stats_API/Evictions.svelte";
	import Inversion from "./front/stress_stats_API/Inversion.svelte";
	import Education from "./front/stress_stats_API/Education.svelte";

	//INTEGRACIONES MIRIAM CAMPANO CRESPO
	import Sport from "./front/smoking_stats_API/Sport.svelte";
	import Enfermo from "./front/smoking_stats_API/Enfermo.svelte";
	import Food from "./front/smoking_stats_API/Food.svelte";
	import Life from "./front/smoking_stats_API/Life.svelte";
	import Pollution from "./front/smoking_stats_API/Pollution.svelte";
	import Grammys from "./front/smoking_stats_API/Grammys.svelte";

	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/anxiety_stats": anxiety_stats,
		"/anxiety_stats/:country/:year": edit_anxiety_stats,
		"/depression_stats": depression_stats,
		"/depression_stats/:country/:year": edit_depression_stats,
		"/stress_stats": stress_stats,
		"/stress_stats/:country/:year": edit_stress_stats,
		"/smoking_stats": smoking_stats,
		"/smoking_stats/:country/:year": edit_smoking_stats,

		"/analytics/depression_stats_graph": depression_stats_graph,
		"/analytics/depression_stats_chart": depression_stats_chart,

		"/analytics/stress_stats_graph": stress_stats_graph,
		"/analytics/stress_stats_chart": stress_stats_chart,

		"/analytics/smoking_stats_graph": smoking_stats_graph,
		"/analytics/smoking_stats_chart": smoking_stats_chart,

		"/analytics": analytics,

		//INTEGRACIONES JOSE PABLO CARRASCO COBOS
		//APIs personales
		"/integrations/anxiety_1": anxiety_1,
		"/integrations/anxiety_2": anxiety_2,
		//Compañeros SOS
		"/integrations/India": India,
		"/integrations/Sanity": Sanity,
		"/integrations/Illiteracy": Illiteracy,
		"/integrations/Natality": Natality,
		//APIs Externas
		"/integrations/NBA": NBA,
		"/integrations/Games": Games,
		
		//INTEGRACIONES Juan Díez Blanco
		"/integrations/children_out": children_out,
		"/integrations/suicides": suicides,
		"/integrations/obesity": obesity,
		"/integrations/Futbol": Futbol,
		"/integrations/bad": bad,

		//INTEGRACIONES ANA ROMERO CÁCERES
		"/integrations/Covid": COVID_19,
		"/integrations/Bicicletas": Bicicletas,
		"/integrations/Unemployment": Unemployment,
		"/integrations/Evictions": Evictions,
		"/integrations/Inversion": Inversion,
		"/integrations/Education": Education,

		//INTEGRACIONES MIRIAM CAMPANO CRESPO
		"/integrations/Sport": Sport,
		"/integrations/Enfermo": Enfermo,
		"/integrations/Life": Life,
		"/integrations/Grammys": Grammys,
		"/integrations/Food": Food,
		"/integrations/Pollution": Pollution,

		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
