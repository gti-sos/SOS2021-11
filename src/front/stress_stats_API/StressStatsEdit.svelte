<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";

    const API_STRESS_STATS = "/api/v2/stress_stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};

    let stressStat = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedStressMen = 0.0;
    let updatedStressWomen = 0.0;
    let updatedStressPopulation = 0.0;

    let errorMsg = "";
    let correctMsg = "";

    onMount(getstressStat);

    async function getstressStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_STRESS_STATS + "/" + params.country + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            stressStat = json;
            updatedCountry = stressStat.country;
            updatedYear = stressStat.year;
            updatedStressMen = stressStat["stress_men"];
            updatedStressWomen = stressStat["stress_women"];
            updatedStressPopulation = stressStat["stress_population"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
    async function updatestressStat() {
        console.log("Updating data..." + params.country + " " + params.year);
        const res = await fetch(
            API_STRESS_STATS + "/" + params.country + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    stress_men: updatedStressMen,
                    stress_women: updatedStressWomen,
                    stress_population: updatedStressPopulation,
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
                getstressStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
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
                    <th>Índice de estrés por hombre</th>
                    <th>Índice de estrés por mujer</th>
                    <th>Índice de estrés en población</th>
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
                            bind:value={updatedStressMen}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedStressWomen}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedStressPopulation}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updatestressStat()}
                        >
                            Actualizar
                        </Button></td
                    >
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
