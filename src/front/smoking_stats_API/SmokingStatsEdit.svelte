<script>

    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";

    const API_SMOKING_STATS = "/api/v1/smoking_stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};

    let smokingStat = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedSmokingMen = 0.0;
    let updatedSmokingWomen = 0.0;
    let updatedSmokingPopulation = 0.0;

    let errorMsg = "";
    let correctMsg = "";
    let currentCountry = "-";
    let currentYear = "-";

    onMount(getsmokingStat(currentCountry, currentYear));

    function changePage(page, offset) {
    console.log("------Change page------");
    console.log("Params page: " + page + " offset: " + offset);
    last_page = Math.ceil(total / 10);
    console.log("new last page: " + last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: " + page);
      console.log("current_offset: " + current_offset);
      console.log("current_page: " + current_page);
      getStats();
    }
    console.log("---------Exit change page-------");
  }

    async function getsmokingStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_SMOKING_STATS + "/" + params.country + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            smokingStat = json;
            updatedCountry = smokingStat.country;
            updatedYear = smokingStat.year;
            updatedSmokingMen = smokingStat["smoking_men"];
            updatedSmokingWomen = smokingStat["smoking_women"];
            updatedSmokingPopulation = smokingStat["smoking_population"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
            changePage(current_page, current_offset);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
  
    async function updatesmokingStat() {
        console.log("Updating data..." + params.country + " " + params.year);
        const res = await fetch(
            API_SMOKING_STATS + "/" + params.country + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    smoking_men: updatedSmokingMen,
                    smoking_women: updatedSmokingWomen,
                    smoking_population: updatedSmokingPopulation,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato con país: ${params.country} y año: ${params.year} ha sido actualizado correctamente.`;
                getsmokingStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
        function search(country, year) {
        setOffset(0);
        getsmokingStats(country, year);
    }
    }
</script>

<main>
    <h2>Editar dato</h2>
    <div id="update">
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Índice de tabaquismo por hombre</th>
                    <th>Índice de tabaquismo por mujer</th>
                    <th>Índice de tabaquismo en población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSmokingMen}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSmokingWomen}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSmokingPopulation}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updatesmokingStat()}
                        >
                            Actualizar
                        </Button>
                        </td
                    >
                    <Button
                    outline
                    color="secondary"
                    on:click={search(currentCountry, currentYear)}
                    class="button-search"
                >
                    <i class="fas fa-search" /> Buscar
                </Button>
                </tr>
            </tbody>
        </Table>
        <Button style="background-color:darkgray" on:click={pop}>Volver</Button>
    </div>

    {#if errorMsg}
        <p style="color: red; text-align:center; font-size: 20px;">
            ERROR: {errorMsg}
        </p>
    {/if}

    {#if correctMsg}
        <p style="color: green; text-align:center; font-size: 20px;">
            {correctMsg}
        </p>
    {/if}
</main>

<style>
    h2 {
        text-align: center;
        margin-top: 2%;
    }
    div {
        margin-top: 5%;
        margin-left: 50px;
        margin-right: 50px;
    }
</style>
