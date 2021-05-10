<script>

import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

    let depression =[];
    let newDepression = { 
        country: "",
        year: "",
        depressionMen: 0.0,
        depressionWomen: 0.0,
        depressionPopulation: 0.0,

    };

    //======VARIABLES IDENTIFICADORES=====//

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
    
    onMount(getDepressionCountryYear);
    onMount(getDepression);
    

//=======================GET=======================\\
async function getDepressionCountryYear() {
    const res = await fetch("/api/v1/depression_stats");

    if (res.ok) {
            //===========Country===========\\
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));

            //===========years===========\\
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }
    async function getDepression() {
        console.log("Fetching depression_stats...");
        const res = await fetch(
            "/api/v1/depression_stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v1/depression_stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            anxiety = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
   
</main>

