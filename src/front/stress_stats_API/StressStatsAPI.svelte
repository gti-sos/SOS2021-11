<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

    let stress = [];
    let newStress = {
        
        country: "",
        year: "",
        stress_men: 0.0,
        stress_women: 0.0,
        stress_population: 0.0,
    };


    let countries = [];
    let years = [];
    
    //CAMPOS VACIOS
    
    let actualCountry = "";
    let actualYear = "";

    //PAGINACION
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

    let okMsg = false;
    let errorMsg = false;
    
    onMount(getstressCountryYear);
    onMount(getstress);

    //GET
    async function getstressCountryYear() {
        const res = await fetch("/api/v2/stress_stats");

        if (res.ok) {
            //PAIS
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));

            //AÑO
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }

    async function getstress() {
        console.log("Fetching stress_stats...");
        const res = await fetch(
            "/api/v2/stress_stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v2/stress_stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            stress = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
    //POST
    async function insertstress() {
        console.log(
            "Insertando stress_stats..." + JSON.stringify(newStress)
        );
        if (
            isNaN(newStress.year) ||
            isNaN(newStress.stress_men) ||
            isNaN(newStress.stress_women) ||
            isNaN(newStress.stress_population) ||
            newStress.country === "" ||
            newStress.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v2/stress_stats", {
                method: "POST",
                body: JSON.stringify(newStress),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getstress();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                } else {
                    okMsg = false;
                    errorMsg =
                        "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
        }
    }
    //DELETE
    async function deletestress(country, year) {
        const res = await fetch(
            "/api/v2/stress_stats/" + country + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getstress();
            getstressCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }

    async function deletestressData() {
        const res = await fetch("/api/v2/stress_stats", {
            method: "DELETE",
        }).then(function (res) {
            getstress();
            getstressCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }

    //LOAD INITIAL DATA
    async function loadInitialDatastress() {
        const res = await fetch("/api/v2/stress_stats/loadInitialData").then(
            function (res) {
                getstress();
            }
        );
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }

    //=======================BUSQUEDA=======================\\

    async function searchstress(country, year) {
        var url = "/api/v2/stress_stats";

        if (country != "" && year != "") {
            url = url + "?year=" + year + "&country=" + country;
        } else if (country != "" && year == "") {
            url = url + "?country=" + country;
        } else if (country == "" && year != "") {
            url = url + "?year=" + year;
        }

        const res = await fetch(url);

        if (res.ok) {
            const json = await res.json();
            stress = json;

            if (stress.length > 0) {
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            } else {
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } else {
            console.log("ERROR");
        }
    }
    async function addOffSet(inc) {
        offset += inc;
        actualPage += inc;
        getstress();
    }
</script>
<main>
    <h1 style="text-align: center">Datos de estrés.  </h1>
    {#await stress}
        Loading stress stats...
    {:then stress}
        <div style="text-align:right; width:1500px">
        <Button
                style="font-size: 16px;border-radius: 4px;background-color: info;"
                outline
                color="btn btn-info"
                on:click={loadInitialDatastress}>Cargar datos iniciales
            </Button>
            <Button
        style="font-size: 16px;border-radius: 4px;background-color: danger;"
        outline
        on:click={deletestressData}
        color="btn btn-danger"
    >
        Borrar todo
    </Button>
        </div>
        <br/>

        <Table bordered>
            <thead style="background:white;color:black;text-align:center;">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Datos de Estrés por Hombre</th>
                    <th>Datos de Estrés por Mujer</th>
                    <th>Datos de Estrés en Población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td>
                        <Input
                            type="text"
                            placeholder="Introduzca un país"
                            bind:value={newStress.country}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newStress.year}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newStress.stress_men}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newStress.stress_women}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newStress.stress_population}
                        /></td
                    >
                    <td>
                        <Button outline color="primary" on:click={insertstress}>
                            Insertar
                        </Button>
                    </td>
                    
                </tr>
                
                
                {#each stress as stressStat}
                    <tr>
                        <td>
                            <a
                                href="#/stress_stats/{stressStat.country}/{stressStat.year}"
                            >
                                {stressStat.country}
                            </a>
                        </td>
                        <td> {stressStat.year} </td>
                        <td> {stressStat.stress_men} </td>
                        <td> {stressStat.stress_women} </td>
                        <td> {stressStat.stress_population} </td>
                        <td>
                            
                            <Button
                                outline
                                color="danger"
                                on:click={deletestress(
                                    stressStat.country,
                                    stressStat.year
                                )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    

    <div>
        <br/>
    <Button
            outline
            style="font-size: 16px;border-radius: 4px;background-color: secondary;"
            color="secondary"
            on:click={searchstress(actualCountry, actualYear)}
            class="btn btn-outline-secondary"
        >
            Buscar
        </Button>
        
    </div>
    <br/>
        
    <div class="col-md-2">
        <FormGroup>
            <Label for="selectCountry">Búsqueda por país</Label>
            <Input name="selectCountry" id="selectCountry" bind:value={actualCountry}>
                {#each countries as country}
                    <option>{country}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
    </div>
        <div class="col-md-2">
        <FormGroup>
            <Label for="selectYear">Búsqueda por año</Label>
            <Input name="selectYear" id="selectYear" bind:value={actualYear}>
                {#each years as year}
                    <option>{year}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
    </div>    
        
        <div class="alert alert-danger" role="alert">
            Atención: si intenta insertar los datos de un país que contenga más
            de una palabra, debe insertar una "_" en lugar de " ".
          </div>
        <p style="color:rgb(6, 100, 6)">
            Por ejemplo: si quiere insertar los datos del país "Spain Murcia" debe
            poner "Spain_Murcia".
        </p>

    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/stress_stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/stress_stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/stress_stats">{actualPage}</PaginationLink>
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink href="#/stress_stats" on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/stress_stats"
                on:click={() => addOffSet(1)}
            />
        </PaginationItem>
    </Pagination>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">ÉXITO: {okMsg}</p>
    {/if}

    <Button
        style="font-size: 16px;border-radius: 4px;"
        outline
        color="secondary"
        on:click={pop}
    >
        Atrás
    </Button>
   
    
</main>
