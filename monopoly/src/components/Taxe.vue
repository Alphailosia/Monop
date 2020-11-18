<template>
    <v-card class="Taxe">
        <div class="color-Taxe">
        </div>
        <v-card-title class="title-propriete">
            {{nom}}
        </v-card-title>

        <v-card-title class="prix-taxe">
            {{prix}}
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        props: {
            nom: String,
            prix: Number,
        }
    }
</script>

<style scoped>



    .title-propriete {
        text-align: center;
        font-weight: bold;
    }

    .prix-taxe {
        text-align: center;
        justify-content: end;

    }

</style>