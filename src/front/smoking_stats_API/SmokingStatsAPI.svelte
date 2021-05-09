<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

    let smoking = [];
    let newSmoking = {
        
        country: "",
        year: "",
        smokingMen: 0.0,
        smokingWomen: 0.0,
        smokingPopulation: 0.0,
    };

    //===========IDENTIFICADORES===========\\

    let countries = [];
    let years = [];
    
    //===========CamposVaciosParaLaBusqueda===========\\
    
    let actualCountry = "";
    let actualYear = "";

    //===========Paginacion===========\\
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

    //===========MensajesDesactivados===========\\
    let okMsg = false;
    let errorMsg = false;
    
    onMount(getsmokingCountryYear);
    onMount(getsmoking);

    //=======================GET=======================\\
    async function getsmokingCountryYear() {
        const res = await fetch("/api/v1/smoking_stats");

        if (res.ok) {
            //===========PAIS===========\\
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));

            //===========ANYOS===========\\
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }

    async function getsmoking() {
        console.log("Fetching smoking_stats...");
        const res = await fetch(
            "/api/v1/smoking_stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v1/smoking_stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            smoking = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
    //=======================POST=======================\\
    async function insertsmoking() {
        console.log(
            "Insertando smoking_stats..." + JSON.stringify(newSmoking)
        );
        if (
            isNaN(newSmoking.year) ||
            isNaN(newSmoking.smokingMen) ||
            isNaN(newSmoking.smokingWomen) ||
            isNaN(newSmoking.smokingPopulation) ||
            newSmoking.country === "" ||
            newSmoking.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v1/smoking_stats", {
                method: "POST",
                body: JSON.stringify(newSmoking),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getsmoking();
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
    //=======================DELETE=======================\\
    async function deletesmoking(country, year) {
        const res = await fetch(
            "/api/v1/smoking_stats/" + country + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getsmoking();
            getsmokingCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }

    async function deletesmokingData() {
        const res = await fetch("/api/v1/smoking_stats", {
            method: "DELETE",
        }).then(function (res) {
            getsmoking();
            getsmokingCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }

    //=======================LOADINITIALDATA=======================\\
    async function loadInitialDatasmoking() {
        const res = await fetch("/api/v1/smoking_stats/loadInitialData").then(
            function (res) {
                getsmoking();
            }
        );
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }

    //=======================BUSQUEDA=======================\\

    async function searchsmoking(country, year) {
        var url = "/api/v1/smoking_stats";

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
            smoking = json;

            if (smoking.length > 0) {
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
        getsmoking();
    }
    //=======================FIN=======================\\
    //=======================FIN=======================\\
    //=======================FIN=======================\\
    //=======================FIN=======================\\
</script>

<main>
    {#await smoking}
        Loading smoking stats...
    {:then smoking}



  
       
    
        <div class='col'>
        <div class='row justify-content-evenly'>
            <div class= 'col-4'>
            
        <FormGroup>
            <Label for="selectCountry">Búsqueda por país</Label>
            <Input
                name="selectCountry"
                id="selectCountry"
                bind:value={actualCountry}
            >
                {#each countries as country}
                    <option>{country}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
            </div>
            <div class= 'col-4'>
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
        <div style="text-align:center; width:100px; ">
        <Button
        outline
        style= "font-size: 16px;border-radius: 4px;background-color: primary; height:50px;"
        color="primary"
        on:click={searchsmoking(actualCountry, actualYear)}
        class="button-search"
    >
        Buscar
    </Button>
</div>
    
        </div>
        </div>
    

        <h6 style="color:rgb(187, 0, 0)">
            Atención: si intenta insertar los datos de un país que contenga más
            de una palabra, debe insertar una "_" en lugar de " ".
        </h6>
        <p style="color:rgb(6, 100, 6)">
            Por ejemplo: si quiere insertar los datos del país "Spain Murcia" debe
            poner "Spain_Murcia".
        </p>
        <Table bordered>
            <thead style="background:purple;color:white;text-align:center;">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Datos de Tabaquismo por Hombre</th>
                    <th>Datos de Tabaquismo por Mujer</th>
                    <th>Datos de Tabaquismo en Población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td>
                        <Input
                            type="text"
                            placeholder="Introduzca un país"
                            bind:value={newSmoking.country}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newSmoking.year}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSmoking.smokingMen}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSmoking.smokingWomen}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSmoking.smokingPopulation}
                        /></td
                    >
                    <td>
                        <Button outline color="primary" on:click={insertsmoking}>
                            Insertar
                        </Button>
                    </td>
                </tr>
                {#each smoking as smokingStat}
                    <tr>
                        <td>
                            <a
                                href="#/smoking_stats/{smokingStat.country}/{smokingStat.year}"
                            >
                                {smokingStat.country}
                            </a>
                        </td>
                        <td> {smokingStat.year} </td>
                        <td> {smokingStat.smokingMen} </td>
                        <td> {smokingStat.smokingWomen} </td>
                        <td> {smokingStat.smokingPopulation} </td>
                        <td>
                            <Button
                                outline
                                color="danger"
                                on:click={deletesmoking(
                                    smokingStat.country,
                                    smokingStat.year
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

    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/smoking_stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/smoking_stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/smoking_stats">{actualPage}</PaginationLink>
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink href="#/smoking_stats" on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/smoking_stats"
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
        style="font-size: 16px;border-radius: 4px;background-color: secondary;"
        outline
        color="secondary"
        on:click={pop}
        
    >
       Atrás
     
       
    
    </Button>

    <Button
        style="font-size: 16px;border-radius: 4px;background-color: primary;"
        outline
        color="btn btn-primary"
        on:click={loadInitialDatasmoking}>Cargar datos iniciales</Button
    >
    <Button
        style="font-size: 16px;border-radius: 4px;background-color: danger;"
        outline
        on:click={deletesmokingData}
        color="btn btn-danger"
    >
        Borrar todo
    </Button>
</main>