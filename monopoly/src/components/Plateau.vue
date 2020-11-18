<template>
    <div>
        <p>C'est le plateau</p>

        <CasePropriete
                :nom="proprietes[0][1].nom"
                :sous_nom="proprietes[0][1].sous_nom"
                :monopole="proprietes[0][1].Color"
                :loyer="proprietes[0][1].loyer[0]"
        />

        <Taxe
                :nom="Taxe[0].nom"
                :prix="Taxe[0].prix"
        />



    </div>
</template>

<script>
    import CasePropriete from "./CasePropriete";
    import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";
    import Taxe from "./Taxe.vue";
    import TaxeJson from "../Taxe.json";

    export default {
        components: {
            CasePropriete,
            Taxe,
        },
        data: () => ({
            proprietes: [],
            jsonProprietes: [],
            Taxe: [],
            jsonTaxe: [],
        }),
        created() {
            this.jsonTaxe = TaxeJson;
            this.jsonProprietes = Cartes_propriete_gares_services;
            this.init();
        },
        methods: {
            init: function () {
                this.proprietes = this.jsonProprietes[0];
                console.log(this.proprietes[0][1]);
                console.log(this.proprietes);
                this.Taxe = this.jsonTaxe[0];
            },
        },
    };
</script>