<template>
  <div>
    <v-btn @click="lancerPartie()" :disabled="partie">Lancer Partie</v-btn>
    <Plateau v-if="partie" :joueurs="joueurs" />
    <v-btn v-if="partie" @click="jouer"
      >{{ joueurs[numJoueur].nom }} doit lancer les dés</v-btn
    >
    <p v-if="partie">Tour numéro : {{ partieTerminer + 1 }}</p>
  </div>
</template>
<script>
import Plateau from "./Plateau";

export default {
  components: {
    Plateau,
  },
  data: () => ({
    partie: false,
    joueurs: [
      {
        nom: "joueur1",
        // met 2 dés ici yann :)
      },
      {
        nom: "joueur2",
        // met 2 dés ici yann :)
      },
    ],
    partieTerminer: 0,
    numJoueur: 0,
  }),
  methods: {
    lancerPartie: function () {
      this.partie = true;
      this.partieTerminer = 0;
      this.numJoueur = 0;
    },
    jouer: function () {
        if (this.numJoueur < this.joueurs.length - 1) {
            // lancer les dés du joueurs
          this.numJoueur++;
          if (this.partieTerminer==5) {
            this.partie = false;
            console.log("partie terminer");
          }
        } else {
          // lancer les dés du joueurs[this.numJoueur]
          this.numJoueur = 0;
          this.partieTerminer++;
          if (this.partieTerminer==5) {
            this.partie = false;
            console.log("partie terminer");
          }
        }
    },
  },
};
</script>