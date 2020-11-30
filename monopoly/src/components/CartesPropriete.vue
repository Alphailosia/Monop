<template>
  <v-card class="propriete">
    <div>
      <div class="color-propriete" :style="{ backgroundColor: carte.Color }">
        <v-card-title class="title-propriete">
          {{ carte.nom }}
        </v-card-title>
        <div class="sous-nom-propriete">
          {{ carte.sous_nom }}
        </div>
      </div>
      <div class="prix-propriete">
        Loyer Terrain nu € {{ carte.loyer[0] }} 
        Loyer avec 1 Maison € {{ carte.loyer[1] }} 
        Loyer avec 2 Maisons € {{ carte.loyer[2] }} 
        Loyer avec 3 Maisons € {{ carte.loyer[3] }} 
        Loyer avec 4 Maisons € {{ carte.loyer[4] }} 
        Loyer avec Hôtel € {{ carte.loyer[5] }}
      </div>
      <div class="explications">
        Si un joueur possède TOUS les terrains d'un Groupe de Couleur
        quelconque, le loyer des terrains nus de ce groupe est double.
      </div>
      <div class="batiments">
        Prix des Maisons, € {{carte.batiment[0] }} chacune 
        Prix d'un Hôtel, € {{carte.batiment[1] }} plus 4 maisons
      </div>
      <div class="hypoteque">
          Valeur Hypothécaire du terrain : € {{carte.hypotheque}}
      </div>
    </div>
    <div></div>
  </v-card>
</template>

<script>
export default {
  props: {
    carte: Object,
  },
};
</script>

<style scoped>
.propriete {
  width: 600px;
  height: 900px;
  border: solid 2px;
  border-radius: 5px;
  position: relative;
}

.color-propriete {
  height: 20%;
}

.title-propriete {
  text-align: center;
  font-weight: bold;
  word-break: break-word;
  justify-content: center;
}

.sous-nom-propriete {
  text-align: center;
  justify-content: center;
  margin-top: -20px;
}

.prix-propriete {
  text-align: center;
  width: 100%;
  margin-top: 80%;
  position: absolute;
  bottom: 0;
  font-weight: bold;
  font-size: large;
}
</style>