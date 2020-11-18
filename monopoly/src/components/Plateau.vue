<template>
    <div>
        <p>C'est le plateau</p>

    <CaseDepart/>
    <CasePropriete
        :nom="proprietes[0][1].nom"
        :sous_nom="proprietes[0][1].sous_nom"
    :monopole="proprietes[0][1].Color"
    :loyer="proprietes[0][1].loyer[0]"></CasePropriete>
    
    <CaseGare
    :image="gares[0][0].image"
    :nom="gares[0][0].nom"
    :prixAchat="gares[0][0].prixAchat"></CaseGare>
 
    <CaseServicePublic 
    :nom="services[0][1].nom" 
    :loyer="services[0][2].loyer[0]"
    />

    <Taxe
    :nom="Taxe[0].nom"
    :prix="Taxe[0].prix"
    />

    </div>
</template>

<script>
    import CaseDepart  from "./CaseDepart";
    import CasePropriete from "./CasePropriete";
    import CaseGare from "./CaseGare";
    import CaseServicePublic  from "./CaseServicePublic";
    import Taxe from "./Taxe.vue";
    import TaxeJson from "../Taxe.json";
    import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";

    export default {
        components: {
            CaseDepart,
            CasePropriete,
            CaseGare,
            CaseServicePublic,
            Taxe,
        },
        data: () => ({
            proprietes: [],
            gares:[],
            services: [],
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
                this.gares = this.jsonProprietes[1];
               this.services = this.jsonProprietes[2];
                console.log(this.proprietes[0][1]);
                console.log(this.proprietes);
                this.Taxe = this.jsonTaxe[0];
            },
        },
    };

</script>