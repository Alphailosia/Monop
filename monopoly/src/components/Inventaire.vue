<template>
<div>
    <v-card v-for="(joueur,index) in joueurs" :key="index" class="inventaire" @click="affichageInventaire(joueur)">
        <v-card-title class="title-inventaire">  <span :class="`J${index+1}`">{{ joueur.nom }} </span>
            <div class="argent"> {{ joueur.inventaire.argent }} €</div>
        </v-card-title>
        <div class="proprietes">  {{ joueur.inventaire.proprietes }}</div>
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
</style>