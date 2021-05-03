<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    
    const API_STRESS_STATS = "/api/v1/stress_stats"; //tiene que llamar a la API para tratar los datos

    let chargedData = false;
    let stressStats = [];
    let errorMsg = "";
    let correctMsg = "";

    let newData = {
        country: "",
        year: "",
        stress_men: "",
        stress_women: "",
        stress_population: "",
    };

    onMount(getstressStats);

    async function loadstressStats() {
        console.log("Loading data...");
        const res = await fetch(API_STRESS_STATS + "/loadInitialData");
        chargedData = true;
        if (res.ok) {
            console.log("Ok.");
            getstressStats();
            errorMsg = "";
            correctMsg = "Los datos se han cargado correctamente.";
        } else {
            console.log("Error loading data.");
        }
    }
    async function getstressStats() {
        console.log("Fetching stress stats...");
        const res = await fetch(API_STRESS_STATS);
        if (res.ok) {
            chargedData = true;
            console.log("Ok. Obtaining data...");
            const json = await res.json();
            stressStats = json;
            console.log(`Received ${stressStats.length} stress stats.`);
        } else if (res.status == 500) {
            errorMsg = "No se ha podido acceder la base de datos.";
            console.log(errorMsg);
        } else if (res.status == 404) {
            errorMsg = "No se encuentran datos. Tiene que cargarlos.";
            console.log("Error. " + errorMsg);
        } else {
            //este realmente no va a ser otro caso que el status = 500
            errorMsg = res.status + ": " + res.statusText;
            console.log(errorMsg);
        }
    }
    async function insertstressStats() {
        console.log("Inserting data" + JSON.stringify(newData) + "...");
        if (
            !newData.country ||
            !newData.year ||
            !newData["stress_men"] ||
            !newData["stress_women"] ||
            !newData["stress_population"]
        ) {
            alert("Todos los campos son obligatorios.");
        } else {
            const res = await fetch(API_STRESS_STATS, {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    console.log("OK");
                    getstressStats();
                    errorMsg = "";
                    correctMsg = "Se ha insertado correctamente.";
                } else if (res.status == 409) {
                    errorMsg = "Ya existe un recurso con el mismo país y año.";
                    console.log("ERROR. " + errorMsg);
                } else {
                    //status == 500
                    errorMsg = "No se ha podido acceder la base de datos.";
                    console.log("Error inserting data in DB");
                }
            });
        }
    }

    async function deletestressStats() {
        console.log("Deleting stress stats...");
        chargedData = false;
        const res = await fetch(API_STRESS_STATS, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("Ok. " + correctMsg);
                stressStats = [];
                errorMsg = "";
                correctMsg = "Se han eliminado todo los datos correctamente.";
            } else if (res.status == 404) {
                //no data found
                errorMsg = "No hay datos para borrar.";
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
    async function deletestressStatsPerYear(country, year) {
        //borra un recurso concreto
        console.log(`Deleting the resource with ${country} and year ${year}`);
        const res = await fetch(
            API_STRESS_STATS + "/" + country + "/" + year,
            { method: "DELETE" }
        ).then(function (res) {
            if (res.ok) {
                correctMsg = `El dato con país: ${country} y año: ${year} se ha eliminado correctamente.`;
                errorMsg = "";
                console.log("Ok. " + correctMsg);
                getstressStats(); /*para que el usuario no tenga que recargar la página */
            } else if (res.status == 404) {
                //no data found
                errorMsg = `No se encuentra el dato con país:  ${country} y año: ${year}.`;
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
</script>

<main>
    <div>
        {#if chargedData}
            <Button style="background-color: crimson;" disabled>
                Cargar datos iniciales
            </Button>
        {:else}
            <Button style="background-color: crimson;" on:click={loadstressStats}>
                Cargar datos iniciales</Button
            >
        {/if}
        <Button style="background-color: darkgray" on:click={deletestressStats}>
            Eliminar datos</Button
        >
    </div>

    {#if stressStats.length != 0}
        <br />
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Índice de ansiedad por hombre</th>
                    <th>Índice de ansiedad por mujer</th>
                    <th>Índice de ansiedad en población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        ><input
                            placeholder="Ej. Spain_Murcia"
                            bind:value={newData.country}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Ej. 2033"
                            bind:value={newData.year}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["stress_men"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["stress_women"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["stress_population"]}
                        /></td
                    >
                    <td
                        ><Button
                            outline
                            color="primary"
                            on:click={insertstressStats}
                        >
                            Insertar</Button
                        ></td
                    >
                </tr>
                {#each stressStats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.year}</td>
                        <td>{stat["stress_men"]}</td>
                        <td>{stat["stress_women"]}</td>
                        <td>{stat["stress_population"]}</td>
                        <td>
                            <a href="#/stress_stats/{stat.country}/{stat.year}">
                                <Button style="background-color: yellowgreen;">
                                    Editar
                                </Button>
                            </a>
                            <Button
                                outline
                                style="margin-right: 10px;"
                                color="danger"
                                on:click={() =>
                                    deletestressStats(stat.country, stat.year)}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <Button style="background-color:darkgray " on:click={pop}>
            Volver
        </Button>
    {:else}
        <br />
        <p style="text-align: center; background-color: antiquewhite;">
            Para ver los datos pulse el botón.
        </p>

        <Button style="background-color:darkgray" on:click={pop}>Volver</Button>
    {/if}

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
    a {
        font-size: 18px;
        background-color: rgb(74, 98, 248);
        color: white;
        border-radius: 6px;
        border: 1px solid rgb(32, 31, 31);
        padding: 4px;
    }
    a:hover {
        color: white;
    }
</style>
