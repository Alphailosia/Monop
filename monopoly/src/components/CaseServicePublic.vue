<template>
    <v-card class="services">
        <div class="color-services" :style="{backgroundColor:monopole}">
        </div>
        <v-card-title class="title-services">
            {{nom}}
        </v-card-title>
        <div class="sous-nom-services">
             {{sous_nom}}
        </div>
        <div class="image-services">
             <img src="../assets/images/ampoule.png" /> 
        </div>
        <div class="prix-services">
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
.services {
width: 200px;
height: 300px;
border: solid 2px;
border-radius: 5px;
}
.color-services{
height: 20%;
}
.title-services {
 text-align: center;
 font-weight: bold;
}
.sous-nom-services {
text-align: center;
justify-content: center;
}

.image-services{
    height: 1px;
    width: 100px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
}

.prix-services {
text-align: center;
width: 100%;
margin-top: 80%;
}
</style>

