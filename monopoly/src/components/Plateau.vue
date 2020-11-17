<template>
    <div>
        <p>C'est le plateau</p>

        <Taxe
                :nom="Taxe[0].nom"
                :prix="Taxe[0].prix"
        />

    </div>
</template>

<script>
    import Taxe from "./Taxe.vue";
    import TaxeJson from "../Taxe.json";

    export default {
        components: {
            Taxe,
        },
        data: () => ({
            Taxe: [],
            jsonTaxe: [],
        }),
        created() {
            this.jsonTaxe = TaxeJson;
            this.init();
        },
        methods: {
            init: function () {
                this.Taxe = this.jsonTaxe[0];
            },
        },
    };
</script>