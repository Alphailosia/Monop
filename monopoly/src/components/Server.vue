<template >
  <div id="base">
    <v-btn @click="lancerPartie()" :disabled="partie">Lancer Partie</v-btn>
    <Plateau v-if="partie" :joueurs="joueurs" />
    <v-btn v-if="partie" @click="jouer"

      >{{ joueurs[numJoueur].nom }} doit lancer les dés </v-btn
    >

    <v-alert id="des" v-if="desactif"
             border="top"
             colored-border
             color="deep-black"
             elevation="5"
    >
      <img :src="affichedes[2]" alt="dé 1"/>
      <img :src="affichedes[3]" alt="dé 2"/>
      <br>
      Voici vos dés.
    </v-alert>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <p v-if="partie">Tour numéro : {{ partieTerminer}}</p>
    <!--<Banque
    v-if="partie"
    :banque="banque"
    />-->
  </div>
</template>


<script>
import Plateau from "./Plateau";
//import Banque from "./Banque";
import CartesProprieteGareService from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    Plateau,
    //Banque
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
    destime:"",
    desactif:false,
    affichedes:"",
    des: [
      [1,require("../assets/images/De1.png")],
      [2,require("../assets/images/De2.png")],
      [3,require("../assets/images/De3.png")],
      [4,require("../assets/images/De4.png")],
      [5,require("../assets/images/De5.png")],
      [6,require("../assets/images/De6.png")]
    ],
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
      this.partieTerminer = 1;
      this.numJoueur = 0;
      this.initBanque();
    },
    desTime(){
      this.desactif = false;
    },
    lancerDes() {
      clearTimeout(this.destime);
      let de1 = Math.floor(Math.random()*this.des.length);
      let de2 = Math.floor(Math.random()*this.des.length);
      this.affichedes =[[this.des[de1][0]],[this.des[de2][0]],[this.des[de1][1]],[this.des[de2][1]]];
      this.desactif = true;
      this.destime = setTimeout(this.desTime,3000);
      if(de1 == de2){
        return false
      }
      else {return true}
    },

    jouer: function () {
      if (this.numJoueur < this.joueurs.length - 1) {
        if(this.lancerDes()){
          this.numJoueur++;
        }
        if (this.partieTerminer == 6) {
          this.partie = false;
          this.desactif = false
          console.log("partie terminer");
        }
      } else {
        if(this.lancerDes()){
          this.numJoueur= 0;
          this.partieTerminer +=1;
        }
        if (this.partieTerminer == 6) {
          this.partie = false;
          this.desactif = false
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
<style scoped>
  template{
    width:100%;
    height:100%;
  }
  #base{
    width:100%;
    height:100%;
  }
  #des{
    position:absolute;
    text-align: center;
    width:20%;
    height:7%;
    margin-left:40%;
    margin-top:0;
  }
</style>