<template >
  <div id="base">
    <v-btn v-if="!partie" @click="lancerPartie()" :disabled="partie"
    >Lancer Partie</v-btn
    >
    <div v-if="partie">
      <v-btn @click="jouer" :disabled="desactif">Lancer</v-btn>
      <p>{{ joueurs[numJoueur].nom }} doit jouer.</p>
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


    <v-alert v-if="joueurs[numJoueur].prison"
             id="prison"
             colored-border
             color="deep-black"
             elevation="2"
    >
      <h1 style="text-align: center">Vous êtes en prison.</h1>
      <h2 style="text-align: center">Que voulez vous faire?</h2>
      <div>
        <v-btn @click="prison(1)" text>Essayer de faire un double.</v-btn>
      </div>
      <div>
        <v-btn @click="prison(2)" :disabled="joueurs[numJoueur].inventaire.argent<50" text>Payer 50 pour pouvoir sortir.</v-btn>
      </div>
      <div>
        <v-btn @click="prison(3)" :disabled="joueurs[numJoueur].cartePrison.length==0" text>Utiliser une carte "Vous êtes libéré de prison".</v-btn>
      </div>
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
  sockets: {
    connection: function () {
      this.connected = true;
      console.log("socket connected");
    },
    envoiNom: function (data) {
      this.joueurs = data;
    },
    start: function () {
      this.partie = true;
      this.lancerPartie();
    },
    deplacement: function (data) {
      if (data.nom !== this.nom) {
        this.affichedes[0] = data.de1;
        this.affichedes[1] = data.de2;
        this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
      }
    },
    etatJoueur: function (data) {
      this.joueurs = data;
    },
    finPartie: function () {
      this.partie = false;
      this.desactif = false;
    },
  },
  data: () => ({
      partie: false,
      comptdouble: 0,
      joueurs: [
        {
          nom: "joueur1",
          proprietes:[],
          prison: false,
          tourPrison:0,
          cartePrison: [],
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
          proprietes:[],
          prison: false,
          tourPrison:0,
          cartePrison: [],
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
        this.joueurs[i].inventaire = {
          argent: 0,
          proprietes: [],
          cartePrison: [],
        };
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
      this.lancerDes();
     

      this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
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
    ProposerAchat: function (joueur, proprieteEnVente) {
      console.log(joueur, proprieteEnVente);
    },
    PositionToPropriete: function () {
      let numCase = this.joueurs[this.numJoueur].caseVisitees + this.memoire;
      //console.log("case :" + this.joueurs[this.numJoueur].caseVisitees);
      if (this.depl > 1) {
        return "en deplacement";
      }
      switch (numCase) {
        case 1:
          // return "RUE ROSSETTI";
          return "0,0,1";
        case 3:
          // return "RUE SMOLETT";
          return "0,0,2";
        case 6:
          //  return "BOULEVARD RENE CASSIN";
          return "0,1,0";
        case 5:
          return "1,0,0";
        case 8:
          //  return "BOULEVARD RISSO";
          return "0,1,1";
        case 9:
          //  return "QUAI PAPACINO";
          return "0,1,2";
        case 11:
          // return "RUE BARLA";
          return "0,2,0";
        case 12:
          // return "RUE BARLA";
          return "3,0,0";
        case 13:
          //  return "AVENUE VALROSE";
          return "0,2,1";
        case 14:
          //  return "AVENUE SAINT JEAN BAPTISTE";
          return "0,2,2";
        case 15:
          return "1,0,1";
          //gare
        case 16:
          //  return "PLACE GARIBALDI";
          return "0,3,0";
        case 18:
          //  return "AVENUE DE LA CALIFORNIE";
          return "0,3,1";
        case 19:
          // return "RUE ST FRANCOIS DE PAULE";
          return "0,3,2";
        case 21:
          // return "RUE GIOFFREDO";
          return "0,4,0";
        case 23:
          // return "COURS SALEYA";
          return "0,4,1";
        case 24:
          //  return "AVENUE JEAN MEDECIN\"";
          return "0,4,2";
        case 25:
          return "1,0,2";
          //gare
        case 26:
          // return "BOULEVARD DUBOUCHAGE";
          return "0,5,0";
        case 27:
          // return "BOULEVARD CARABACEL";
          return "0,5,1";
        case 28:
          // return "RUE BARLA";
          return "3,0,1";
        case 29:
          //  return "BOULEVARD TZAREWITCH";
          return "0,5,2";
        case 30:
          //  return "BOULEVARD DE CIMIEZ";
          return "0,6,0";
        case 31:
          // return "PLACE MASSENA";
          return "0,6,1";
        case 33:
          // return "BD MAURICE MAETERLINCK";
          return "0,6,2";
        case 35:
          //   gare
          return "0,7,0";
        case 36:
          //  return "PROMENADE DES ANGLAIS";
          return "0,7,1";
        default:
          return "inachetable";
      }
    },
    prison: function (cpt) {
      this.joueurs[this.numJoueur].tourPrison += 1;
      if (cpt == 1) {
        this.lancerDes();
        if (this.affichedes[0] == this.affichedes[1]) {
          this.joueurs[this.numJoueur].caseVisitees = 10;
          this.joueurs[this.numJoueur].retDepl = 10;
          this.joueurs[this.numJoueur].tourPrison = 0;
          this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
        } else {
          if (this.joueurs[this.numJoueur].tourPrison == 3) {
            this.joueurs[this.numJoueur].inventaire.argent -= 50;
            this.joueurs[this.numJoueur].caseVisitees = 10;
            this.joueurs[this.numJoueur].retDepl = 10;
            this.joueurs[this.numJoueur].tourPrison = 0;
            this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
          } else {
            if (this.numJoueur < this.joueurs.length - 1) {
              this.numJoueur++;
              console.log(this.numJoueur);
            } else {
              this.numJoueur = 0;
              this.partieTerminer += 1;
              console.log(this.numJoueur);
            }
          }
        }
      } else if (cpt == 2) {
        this.joueurs[this.numJoueur].inventaire.argent -= 50;
        this.lancerDes();
        this.joueurs[this.numJoueur].caseVisitees = 10;
        this.joueurs[this.numJoueur].retDepl = 10;
        this.joueurs[this.numJoueur].tourPrison = 0;
        this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
      } else if (cpt == 3) {
        this.joueurs[this.numJoueur].cartePrison.remove(0);
        this.lancerDes();
        this.joueurs[this.numJoueur].caseVisitees = 10;
        this.joueurs[this.numJoueur].retDepl = 10;
        this.joueurs[this.numJoueur].tourPrison = 0;
        this.deplacerJoueur(this.affichedes[0], this.affichedes[1]);
      }
    },
    deplacerJoueur: function (de1, de2) {
      this.depl = de1 + de2;
      this.memoire = this.depl;
      this.joueurs[this.numJoueur].retDepl += this.depl;
      while (this.depl != 0) {
        if (
          this.PositionToPropriete() != "inachetable" &&
          this.PositionToPropriete() != "en deplacement"
        ) {
          let positions = this.PositionToPropriete();
          //  console.log(this.banque.proprietes[2][1]);
          //console.log(this.banque.proprietes[positions.substring(2,3)][positions.substring(4,5)].nom);
          // on vérifie que l'objet carte ne contient pas déjà un propriétaire
          if (
            this.banque.proprietes[positions.substring(2, 3)][
              positions.substring(4, 5)
            ].proprietaire == ""
          ) {
            //  this.ProposerAchat(this.joueur,this.banque.proprietes[positions.substring(2,3)][positions.substring(4,5)]);
            this.banque.proprietes[positions.substring(2, 3)][
              positions.substring(4, 5)
            ].proprietaire = this.joueurs[this.numJoueur];
            this.joueurs[this.numJoueur].proprietes.push(
              this.banque.proprietes[positions.substring(2, 3)][
                positions.substring(4, 5)
              ]
            );
            let newtab = [];
            //trier monopoles
            for (let j = 0; j < 8; j++) {
              for (
                let i = 0;
                i < this.joueurs[this.numJoueur].proprietes.length;
                i++
              ) {
                if (
                  j == 0 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#ff69b4"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 1 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#87cefa"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 2 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#ba55d3"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 3 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#ff8c00"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 4 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "##ff0000"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 5 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#ffd700"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 6 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#2e8b57"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
                if (
                  j == 7 &&
                  this.joueurs[this.numJoueur].proprietes[i].color == "#00008b"
                ) {
                  newtab.push(this.joueurs[this.numJoueur].proprietes[i]);
                }
              }
            }
            this.joueurs[this.numJoueur].proprietes = newtab;
          } else {
            // faire payer
          }
        }
        if (this.joueurs[this.numJoueur].caseVisitees + this.memoire > 39) {
          this.memoire =
            this.joueurs[this.numJoueur].caseVisitees + this.memoire - 39;
        }
        console.log("dep1 = " + this.depl);
        console.log("retDep1 = " + this.joueurs[this.numJoueur].retDepl);
        if (this.joueurs[this.numJoueur].caseVisitees + this.memoire > 40) {
          this.memoire =
            this.joueurs[this.numJoueur].caseVisitees + this.memoire - 40;
        }
        while (this.depl != 0) {
          //if (this.joueurs[this.numJoueur].caseVisitees + this.memoire > 39) {
          //this.memoire =
          //this.joueurs[this.numJoueur].caseVisitees + this.memoire - 39;
          //}
          setTimeout(this.animation, 1000 * (de1 + de2 - this.depl));
          this.depl--;
        }
      }
    },
    animation: function () {
      if (
        this.joueurs[this.numJoueur].caseVisitees === 0 ||
        this.joueurs[this.numJoueur].caseVisitees === 40
      ) {
        this.joueurs[this.numJoueur].inventaire.argent += 200;
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
      } else if (this.joueurs[this.numJoueur].caseVisitees === 40) {
        this.joueurs[this.numJoueur].deplLeft += 223;
        this.joueurs[this.numJoueur].caseVisitees = 1;
        this.joueurs[this.numJoueur].retDepl = this.memoire;
      }

      if (
        this.joueurs[this.numJoueur].retDepl ===
        this.joueurs[this.numJoueur].caseVisitees
      ) {
        console.log(this.joueurs[this.numJoueur].caseVisitees);
        if (this.joueurs[this.numJoueur].caseVisitees === 30) {
          this.joueurs[this.numJoueur].prison = true;
          this.joueurs[this.numJoueur].deplLeft = 2170;
          this.joueurs[this.numJoueur].deplTop = 250;
          if (this.numJoueur < this.joueurs.length - 1) {
            this.numJoueur++;
          } else {
            this.numJoueur = 0;
            this.partieTerminer += 1;
            console.log(this.numJoueur);
          }
          this.comptdouble = 0;
        } else if (
          this.joueurs[this.numJoueur].prison ||
          this.affichedes[0] != this.affichedes[1]
        ) {
          this.comptdouble = 0;
          this.joueurs[this.numJoueur].prison = false;
          if (this.numJoueur < this.joueurs.length - 1) {
            this.numJoueur++;
          } else {
            this.numJoueur = 0;
            this.partieTerminer += 1;
          }
        } else {
          this.comptdouble++;

          if (this.comptdouble === 3) {
            this.joueurs[this.numJoueur].prison = true;
            this.joueurs[this.numJoueur].deplLeft = 2170;
            this.joueurs[this.numJoueur].deplTop = 250;
            this.joueurs[this.numJoueur].caseVisitees = 10; // mise a jour case visitées
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
  background-color: #0000ff;
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

#prison {
  position: absolute;
  text-align: center;
  width: 500px;
  height: 220px;
  top: 700px;
  left: 940px;
  z-index: 10000000000;
}
</style>