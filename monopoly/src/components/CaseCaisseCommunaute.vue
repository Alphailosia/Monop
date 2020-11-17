<template>
    <v-card class="caisseCommunaute">
        <div class="color-caisseCommunaute" :style="{backgroundColor:white}">
        </div>
        <v-card-title class="title-caisseCommunaute">
            {{nom}}
        </v-card-title>
        <div class="label-caisseCommunaute">
             {{label}}
        </div>
        <div class="image-caisseCommunaute">
             <img src="../assets/images/coffre.png" /> 
        </div>
        <div class="description-caisseCommunaute">
            Description : {{descritpion}} 
        </div>
    </v-card>
</template>

<script>
export default {
   props: {
        nom: String,
        label: String,
        description: String,
   } 
}
</script>

<style scoped>

.caisseCommunaute {
width: 300px;
height: 200px;
border: solid 2px;
border-radius: 5px;
}

.color-caisseCommunaute{
height: 20%;
}

.title-caisseCommunaute {
 text-align: center;
 font-weight: bold;
}

.label-caisseCommunaute {
text-align: center;
justify-content: center;
}

.description-caisseCommunaute {
text-align: center;
width: 100%;
margin-top: 80%;
}

</style>