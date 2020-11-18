<template>
  <v-card class="taxe">
    <v-card-title class="title-propriete">
      {{ nom }}
    </v-card-title>
    <v-card-title class="prix-taxe"> Prix : {{ prix }} euros </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    nom: String,
    prix: Number,
  },
};
</script>

<style scoped>
.taxe {
  width: 200px;
  height: 300px;
  border: solid 2px;
  border-radius: 5px;
}

.title-propriete {
  text-align: center;
  font-weight: bold;
  margin-top: 20%;
}

.prix-taxe {
  text-align: center;
  justify-content: end;
  width: 100%;
  margin-top: 80%;
}
</style>