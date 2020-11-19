<template>
    <v-card class="propriete" v-bind:class="[position]">
        <div class="color-propriete" :style="{backgroundColor:monopole}">
        </div>
        <v-card-title class="title-propriete">
            {{nom}}
        </v-card-title>
        <div class="sous-nom-propriete">
            {{sous_nom}}
        </div>
        <div class="prix-propriete">
            Prix : {{loyer}} euros
        </div>
    </v-card>
</template>

<script>
export default {
props: {
    monopole: String,
    nom: String,
    sous_nom: String,
    loyer: Number,
    position: String,
    } 
}
</script>

<style scoped>

.propriete {
width: 200px;
height: 300px;
border: solid 2px;
border-radius: 5px;
}

.color-propriete{
height: 20%;
}

.title-propriete {
text-align: center;
font-weight: bold;
}

.sous-nom-propriete {
text-align: center;
justify-content: center;
}

.prix-propriete {
text-align: center;
width: 100%;
margin-top: 80%;
}
.top {
    transform: rotate(180deg);
}
.left {
    transform: rotate(90deg);
}
.right {
    transform: rotate(270deg);
}
</style>