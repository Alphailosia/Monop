<template>
    <v-card class="propriete" v-bind:class="[position]">
        <div class="color-joueur" :style="{ backgroundColor: monopole }"></div>
            <v-title class="inventaire">
                {{ nomJoueur }}
            </v-title>
        <div class="argent">€ {{ argent }}</div>
    </v-card>
</template>

<style scoped>
.propriete {
    width: 600px;
    height: 300px;
    border: solid 2px;
    border-radius: 5px;
    position: relative;
}

.title-propriete {
    text-align: left;
    font-weight: bold;
    word-break: break-word;
    justify-content: center;
}