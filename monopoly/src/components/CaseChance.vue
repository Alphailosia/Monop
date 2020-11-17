<template>
    <v-card>
        {{nom}}, {{monopole}}
    </v-card>
</template>

<script>
export default {
   props: {
       monopole: String,
       nom: String,
   } 
}
</script>

<style scoped>

</style>