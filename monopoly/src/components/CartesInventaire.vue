<template>
  <v-card
    class="inventaire"
    @click="affichageCartes()">
    <div class="color" :style="{ backgroundColor: monopole }">
    <v-card-title class="title-cartes">
      {{ nom }}
    </v-card-title>
    </div>
  </v-card>
</template>

<script>
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";
export default {
  props: {
    carte: Object,
    monopole: String,
    nom: String,
  },
};
</script>

<style scoped>
.inventaire {
  width: 50px;
  height: 100px;
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