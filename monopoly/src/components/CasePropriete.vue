<template>
    <v-card class="propriete">
        <div class="color-propriete" :style="{backgroundColor:monopole}">
        </div>
        <v-card-title class="title-propriete">
            {{nom}}
        </v-card-title>
        <div class="info-propriete">
            {{sous_nom}}
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
   } 
}
</script>

<style scoped>

.propriete {
width: 200px;
height: 300px;
justify-content: center;
text-align: center;
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

.info-propriete {
text-align: center;
justify-content: end;

}

</style>