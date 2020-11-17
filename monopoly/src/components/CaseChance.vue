<template>
    <v-card class="chance">
        <div class="color-chance" :style="{backgroundColor:white}">
        </div>
        <v-card-title class="title-chance">
            {{nom}}
        </v-card-title>
        <div class="label-chance">
            {{label}}
        </div>
        <div class="image-chance">
            <img src="../assets/images/coffre.png" /> 
        </div>
        <div class="description-chance">
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

.chance {
width: 300px;
height: 200px;
border: solid 2px;
border-radius: 5px;
}

.color-chance{
height: 20%;
}

.title-chance {
text-align: center;
font-weight: bold;
}

.label-chance {
text-align: center;
justify-content: center;
}

.description-chance {
text-align: center;
width: 100%;
margin-top: 80%;
}

</style>