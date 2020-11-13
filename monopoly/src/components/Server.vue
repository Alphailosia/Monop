<template>
  <div>
    <v-btn @click="lancerPartie()" :disabled="partie">Lancer Partie</v-btn>
    <Plateau v-if="partie" :joueurs="joueurs" />
    <v-btn v-if="partie" @click="jouer"
      >{{ joueurs[numJoueur].nom }} doit lancer les dés</v-btn
    >
    <p v-if="partie">Tour numéro : {{ partieTerminer + 1 }}</p>
    <Banque
    v-if="partie"
    :banque="banque"
    />
  </div>
</template>
<script>
import Plateau from "./Plateau";
import Banque from "./Banque";
import CartesProprieteGareService from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    Plateau,
    Banque
  },
  data: () => ({
    partie: false,
    joueurs: [
      {
        nom: "joueur1",
      },
      {
        nom: "joueur2",
      },
    ],
    partieTerminer: 0,
    numJoueur: 0,
    banque: {
      proprietes:{},
      gares: {},
      services: {},
      hypotheque: {},
    },
    jsonPropriete: [],
  }),
  mounted() {
    this.jsonPropriete = CartesProprieteGareService;
  },
  methods: {
    lancerPartie: function () {
      this.partie = true;
      this.partieTerminer = 0;
      this.numJoueur = 0;
      this.initBanque();
    },
    jouer: function () {
      if (this.numJoueur < this.joueurs.length - 1) {
        // lancer les dés du joueurs
        this.numJoueur++;
        if (this.partieTerminer == 5) {
          this.partie = false;
          console.log("partie terminer");
        }
      } else {
        // lancer les dés du joueurs[this.numJoueur]
        this.numJoueur = 0;
        this.partieTerminer++;
        if (this.partieTerminer == 5) {
          this.partie = false;
          console.log("partie terminer");
        }
      }
    },
    initBanque: function(){
      for(let i=0;i<this.jsonPropriete.length;i++){
        if(i===0){
          this.banque.proprietes=this.jsonPropriete[i]
        }
        else if(i===1){
          this.banque.gares=this.jsonPropriete[i]
        }
        else{
          this.banque.services=this.jsonPropriete[i]
        }
      }
    }
  },
};
</script>