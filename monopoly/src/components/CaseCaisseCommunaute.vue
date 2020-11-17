<template>
    <v-card class="communaute">
        <div class="color-communaute" :style="{backgroundColor:white}">
        </div>
        <v-card-title class="title-communaute">
            {{nom}}
        </v-card-title>
        <div class="label-communaute">
            {{label}}
        </div>
        <div class="image-communaute">
            <img src="../assets/images/coffre.png" /> 
        </div>
        <div class="description-communaute">
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

.communaute {
width: 300px;
height: 200px;
border: solid 2px;
border-radius: 5px;
}

.color-communaute{
height: 20%;
}

.title-communaute {
text-align: center;
font-weight: bold;
}

.label-communaute {
text-align: center;
justify-content: center;
}

.description-communaute {
text-align: center;
width: 100%;
margin-top: 80%;
}

</style>