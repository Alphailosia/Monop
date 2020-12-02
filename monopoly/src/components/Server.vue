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
    <div v-if="partie">
      <div
        v-for="(joueur, index) in joueurs"
        :key="index"
        :class="`pion${index}`"
        :style="`left:${joueur.deplLeft}px;top:${joueur.deplTop}px;`"
      ></div>
    </div>
    <Plateau v-if="partie" :joueurs="joueurs" class="plateau" />
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
    comptdouble: 0,
    joueurs: [
      {
        nom: "joueur1",
        deplLeft: 150,
        deplTop: 200,
        caseVisitees: 0,
        retDepl: 0,
        inventaire:{
          argent:0,
          proprietes:[],
        }
      },
      {
        nom: "joueur2",
        deplLeft: 120,
        deplTop: 200,
        caseVisitees: 0,
        retDepl: 0,
        inventaire:{
          argent:0,
          proprietes:[],
        }
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
    depl: 0,
    retDepl: 0,
    proprietes: [],
    gares: [],
    services: [],
    memoire: 0,

  }),
  created() {
    this.jsonPropriete = CartesProprieteGareService;
  },
  methods: {
    lancerPartie: function () {
      this.partie = true;
      this.partieTerminer = 1;
      this.numJoueur = 0;
      for (let i = 0; i < this.joueurs.length; i++) {
        this.joueurs[i].deplLeft = 125;
        this.joueurs[i].deplTop = 200;
        this.joueurs[i].retDepl = 0;
        this.joueurs[i].caseVisitees = 0;
      }
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
      this.desactif = true;
      this.destime = setTimeout(this.desTime, 3000);
    },
    jouer: function () {
      if (this.partieTerminer == 8) {
        this.partie = false;
        this.desactif = false;
        console.log("partie terminer");
      } else {
        this.lancerDes();
        this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
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
      this.memoire = this.depl;
      this.joueurs[this.numJoueur].retDepl += this.depl;
      console.log("dep1 = " + this.depl);
      console.log("retDep1 = "+ this.joueurs[this.numJoueur].retDepl);
      if (this.joueurs[this.numJoueur].caseVisitees + this.memoire > 40){
        this.memoire = this.joueurs[this.numJoueur].caseVisitees + this.memoire - 40 ;
      }
      while (this.depl != 0) {
        //if (this.joueurs[this.numJoueur].caseVisitees + this.memoire > 39) {
          //this.memoire =
            //this.joueurs[this.numJoueur].caseVisitees + this.memoire - 39;
        //}
        setTimeout(this.animation, 1000 * (de1 + de2 - this.depl));
        this.depl--;
      }

      
      
    },
    animation: function () {
      if(this.joueurs[this.numJoueur].caseVisitees === 0||
        this.joueurs[this.numJoueur].caseVisitees === 40){
          this.joueurs[this.numJoueur].inventaire.argent += 200;
          console.log("Inventaire du joueur " + this.numJoueur + " : " + this.joueurs[this.numJoueur].inventaire.argent);
        }
      
      if (
        this.joueurs[this.numJoueur].caseVisitees === 0 ||
        this.joueurs[this.numJoueur].caseVisitees === 9
      ) {
        this.joueurs[this.numJoueur].deplLeft += 223;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees >= 1 &&
        this.joueurs[this.numJoueur].caseVisitees < 9
      ) {
        this.joueurs[this.numJoueur].deplLeft += 200;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees === 10 ||
        this.joueurs[this.numJoueur].caseVisitees === 19
      ) {
        this.joueurs[this.numJoueur].deplTop += 235;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees >= 11 &&
        this.joueurs[this.numJoueur].caseVisitees < 19
      ) {
        this.joueurs[this.numJoueur].deplTop += 200;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees === 20 ||
        this.joueurs[this.numJoueur].caseVisitees === 29
      ) {
        this.joueurs[this.numJoueur].deplLeft -= 223;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees >= 20 &&
        this.joueurs[this.numJoueur].caseVisitees < 29
      ) {
        this.joueurs[this.numJoueur].deplLeft -= 200;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (this.joueurs[this.numJoueur].caseVisitees === 20) {
        this.joueurs[this.numJoueur].deplTop -= 223;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (
        this.joueurs[this.numJoueur].caseVisitees >= 30 &&
        this.joueurs[this.numJoueur].caseVisitees < 39
      ) {
        this.joueurs[this.numJoueur].deplTop -= 200;
        this.joueurs[this.numJoueur].caseVisitees++;
      } else if (this.joueurs[this.numJoueur].caseVisitees === 39) {
        this.joueurs[this.numJoueur].deplTop -= 235;
        this.joueurs[this.numJoueur].caseVisitees++;
      }
        else if(this.joueurs[this.numJoueur].caseVisitees === 40){
          this.joueurs[this.numJoueur].deplLeft += 223;
          this.joueurs[this.numJoueur].caseVisitees = 1;
          this.joueurs[this.numJoueur].retDepl = this.memoire;
          console.log("retDep1 = "+ this.joueurs[this.numJoueur].retDepl);
          console.log("CaseVisitees = "+ this.joueurs[this.numJoueur].caseVisitees);
          

        }

        
      
      if (
        this.joueurs[this.numJoueur].retDepl ===
        this.joueurs[this.numJoueur].caseVisitees
      ) {
        if (this.affichedes[0] != this.affichedes[1]) {
          if (this.numJoueur < this.joueurs.length - 1) {
            this.numJoueur++;
            console.log(this.numJoueur);
          } else {
            this.numJoueur = 0;
            this.partieTerminer += 1;
            console.log(this.numJoueur);
          }
        } else {
          this.comptdouble++;
          if (this.comptdouble === 2) {                      // GO TO PRISON
            this.joueurs[this.numJoueur].deplLeft = 2170;
            this.joueurs[this.numJoueur].deplTop = 250;
            this.joueurs[this.numJoueur].caseVisitees = 10 ; // mise a jour case visitées
            if (this.numJoueur < this.joueurs.length - 1) {
              this.numJoueur++;
              console.log(this.numJoueur);
            } else {
              this.numJoueur = 0;
              this.partieTerminer += 1;
              console.log(this.numJoueur);
            }
            this.comptdouble = 0;
          }
        }
      }
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

.pion0 {
  width: 50px;
  height: 50px;
  border: solid 1px;
  border-radius: 25px;
  background-color: red;
  position: absolute;
  transition: all ease-in-out 1s;
  z-index: 10000000000;
}

.pion1 {
  width: 50px;
  height: 50px;
  border: solid 1px;
  border-radius: 25px;
  background-color: blue;
  position: absolute;
  transition: all ease-in-out 1s;
  z-index: 10000000000;
}

#des {
  position: absolute;
  text-align: center;
  width: 20%;
  height: 7%;
  top: 500px;
  left: 900px;
  z-index: 10000000000;
}

</style>