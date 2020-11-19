<template >
  <div id="base">
    <v-btn v-if="!partie" @click="lancerPartie()" :disabled="partie"
      >Lancer Partie</v-btn
    >
    <div v-if="partie">
      <v-btn @click="jouer" :disabled="desactif">Lancer</v-btn>
      <p>{{ joueurs[numJoueur].nom }} doit lancer les dés</p>
    </div>
    <v-alert
      id="des"
      v-if="desactif"
      border="top"
      colored-border
      color="deep-black"
      elevation="2"
    >
      <p>Voici vos dés.</p>
      <img :src="affichedes[2]" alt="dé 1" />
      <img :src="affichedes[3]" alt="dé 2" />
    </v-alert>

    <p v-if="partie">Tour numéro : {{ partieTerminer }}</p>
    <div
      v-if="partie"
      class="pion"
      :style="`left:${this.joueurs[this.numJoueur].deplLeft}px;top:${
        this.joueurs[this.numJoueur].deplTop
      }px;`"
    ></div>
    <Plateau v-if="partie" :joueurs="joueurs" />
  </div>
</template>


<script>
import Plateau from "./Plateau";
import CartesProprieteGareService from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    Plateau,
  },
  data: () => ({
    partie: false,
    joueurs: [
      {
        nom: "joueur1",
        deplLeft: 150,
        deplTop: 200,
        caseVisitees: 0,
      },
    ],
    partieTerminer: 0,
    numJoueur: 0,
    destime: "",
    desactif: false,
    affichedes: [],
    des: [
      [1, require("../assets/images/De1.png")],
      [2, require("../assets/images/De2.png")],
      [3, require("../assets/images/De3.png")],
      [4, require("../assets/images/De4.png")],
      [5, require("../assets/images/De5.png")],
      [6, require("../assets/images/De6.png")],
    ],
    banque: {
      proprietes: {},
      gares: {},
      services: {},
      hypotheque: {},
    },
    jsonPropriete: [],
    depl:0
  }),
  mounted() {
    this.jsonPropriete = CartesProprieteGareService;
  },
  methods: {
    lancerPartie: function () {
      this.partie = true;
      this.partieTerminer = 1;
      this.numJoueur = 0;
      this.initBanque();
    },
    desTime() {
      this.desactif = false;
    },
    lancerDes() {
      clearTimeout(this.destime);
      let de1 = Math.floor(Math.random() * this.des.length);
      let de2 = Math.floor(Math.random() * this.des.length);
      this.affichedes = [
        this.des[de1][0],
        this.des[de2][0],
        this.des[de1][1],
        this.des[de2][1],
      ];
      this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
      this.desactif = true;
      this.destime = setTimeout(this.desTime, 3000);
      if (de1 == de2) {
        return false;
      }
      return true;
    },

    jouer: function () {
      if (this.numJoueur < this.joueurs.length - 1) {
        if (this.lancerDes()) {
          this.deplacementJoueur();
          this.numJoueur++;
        }
        if (this.partieTerminer == 6) {
          this.partie = false;
          this.desactif = false;
          console.log("partie terminer");
        }
      } else {
        if (this.lancerDes()) {
          this.numJoueur = 0;
          this.partieTerminer += 1;
        }
        if (this.partieTerminer == 6) {
          this.partie = false;
          this.desactif = false;
          console.log("partie terminer");
        }
      }
    },
    initBanque: function () {
      for (let i = 0; i < this.jsonPropriete.length; i++) {
        if (i === 0) {
          this.banque.proprietes = this.jsonPropriete[i];
        } else if (i === 1) {
          this.banque.gares = this.jsonPropriete[i];
        } else {
          this.banque.services = this.jsonPropriete[i];
        }
      }
    },
    deplacerJoueur: function (de1, de2) {
      this.depl = de1 + de2;
      console.log(this.depl)
      while (this.depl != 0) {
        if(this.joueurs[this.numJoueur].caseVisitees===0 || this.joueurs[this.numJoueur].caseVisitees===8){
          this.joueurs[this.numJoueur].deplLeft += 223;
        }
        else if (this.joueurs[this.numJoueur].caseVisitees >= 1 && this.joueurs[this.numJoueur].caseVisitees < 9) {
          this.joueurs[this.numJoueur].deplLeft += 200;
        }
        else if (this.joueurs[this.numJoueur].caseVisitees=== 9){
          this.joueurs[this.numJoueur].deplTop += 223;
        } 
        else if (this.joueurs[this.numJoueur].caseVisitees >= 10 && this.joueurs[this.numJoueur].caseVisitees < 18) {
          this.joueurs[this.numJoueur].deplTop += 180;
        } 
        else if (this.joueurs[this.numJoueur].caseVisitees=== 19 || this.joueurs[this.numJoueur].caseVisitees=== 28){
          this.joueurs[this.numJoueur].deplTop += 223;
        } 
        else if (this.joueurs[this.numJoueur].caseVisitees >= 20 && this.joueurs[this.numJoueur].caseVisitees < 28) {
          this.joueurs[this.numJoueur].deplLeft -= 200;
        } 
        else if (this.joueurs[this.numJoueur].caseVisitees >= 30 && this.joueurs[this.numJoueur].caseVisitees <= 40) {
          this.joueurs[this.numJoueur].deplTop -= 200;
        } 
        else {
          this.joueurs[this.numJoueur].caseVisitees=0
        }
        this.joueurs[this.numJoueur].caseVisitees++;
        this.depl--;
      }
      console.log(this.joueurs[this.numJoueur].deplTop)
      console.log(this.joueurs[this.numJoueur].deplLeft)
    },
  },
};
</script>
<style scoped>
template {
  width: 100%;
  height: 100%;
}

#base {
  position: relative;
  width: 100%;
  height: 100%;
}

.pion {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  transition: all ease-in-out 3s;
  z-index: 10000000000;
}

#des {
  position: absolute;
  text-align: center;
  width: 20%;
  height: 7%;
  margin-left: 40%;
  margin-top: 0;
}
</style>