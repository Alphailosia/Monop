<template>
<div>
    <v-card v-for="(joueur,index) in joueurs" :key="index" class="inventaire">
        <v-card-title>  {{ joueur.nom }} 
            <div class="argent"> {{ joueur.inventaire.argent }} €</div>
        </v-card-title>
        <div class="proprietes">  {{ joueur.inventaire.proprietes }}</div>
    </v-card>
</div>
</template>

<script>
export default {
    props:{
        joueurs:Array,
    }
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
    justify-content: center;
}

.argent{
    margin-left: 5%;
}
</style>