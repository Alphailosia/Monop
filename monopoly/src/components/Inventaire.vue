<template>
<div>
    <v-card v-for="(joueur,index) in joueurs" :key="index" class="inventaire" @click="affichageInventaire(joueur)">
        <v-card-title class="title-inventaire">  <span :class="`J${index+1}`">{{ joueur.nom }} </span>
            <div class="argent"> {{ joueur.inventaire.argent }} €</div>
        </v-card-title>
        <div v-for="(propriete, index) in joueur.inventaire.proprietes" :key="index" class="proprietes" :style="{ backgroundColor: propriete.Color }"></div>
    </v-card>
</div>
</template>

<script>
export default {
    data: () => ({
    carteInventaire: {},

  }),
    props:{
        joueurs:Array, 
    },
    mounted(){
        for(let i=0; i<this.joueurs.length;i++) {
            this.joueurs[i].inventaire.argent=1500;
        }
    },
    methods: {
    affichageInventaire: function (joueur) {
      this.$emit("inventaire", joueur);
    },
  },
}
</script>

<style scoped>
.inventaire {
    margin-left: 5%;
    margin-bottom: 5%;
    width: 600px;
    height: 300px;
    border: solid 5px;
    border-radius: 10px;
    position: relative;
    
}

.title-inventaire {
    text-align: left;
    font-weight: bold;
    word-break: break-word;
    font-size: 2em;
    
}

.argent{
    margin-left: 10%;
}

.J1 {
    color: red;
}
.J2 {
    Color: blue;
}
.proprietes {
    width: 55px;
    height: 55px;
    border-radius: 5px;
}
</style>