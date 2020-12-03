<template>
  <v-card class="inventaire">
    <h1>Propriétés</h1>
    <v-card class="carte" v-for="(monopole, index) in jsonPropriete[0]" :key="index">
      <v-card v-for="(item, j) in monopole" :key="j">
        <v-card-title
          v-if="j === 0"
          :style="{ backgroundColor: item.Color }"
        ></v-card-title>
        <v-card-text>{{ item.nom }} </v-card-text>
      </v-card>
    </v-card>
    <h1>Gares</h1>
    <v-card class="carte" v-for="(gare, index) in jsonPropriete[1]" :key="index">
      <v-card-text>{{ gare.nom }} </v-card-text>
    </v-card>
    <h1>Services</h1>
    <v-card class="carte" v-for="(service, index) in jsonPropriete[2]" :key="index">
      <v-card-text>{{ service.nom }} </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";
export default {
  data: () => ({
    tabTest: [],
    jsonPropriete:[],
  }),
  props: {
    carteInventaire: Object,
    
  },
  created() {
      this.jsonPropriete = Cartes_propriete_gares_services;
  },
};
</script>

<style scoped>
.carte {
  width: 200px;
  height: 250px;
  border: solid 2px;
  border-radius: 5px;
  position: relative;
}

.title-cartes {
  text-align: center;
  font-weight: bold;
  word-break: break-word;
  justify-content: center;
}
</style>