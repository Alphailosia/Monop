<template>
    <v-card class="gare">
        <v-card-title class="title-gare">
            {{nom}}
        </v-card-title>
        <img v-if="afficheimage()" :src="imagefinal"/>

        <br>
        <div class="prixAchat">
            € {{prixAchat}}
        </div>
    </v-card>
</template>

<script>
    export default {
        props: {
            image: Number,
            nom: String,
            prixAchat: Number
        },
        data: () => ({
            imagefinal: null
        }),
        methods:{
            afficheimage() {
                if (this.image == 0) {
                    this.imagefinal = require("../assets/images/Avion.png");

                } else if (this.image == 1) {
                    this.imagefinal = require("../assets/images/Bateau.png");
                } else {
                    this.imagefinal = require("../assets/images/Gare.png");
                }
                return true
            }
        }
    }
</script>

<style scoped>

    .gare {
        width: 200px;
        height: 300px;
        border: solid 2px;
        border-radius: 5px;
    }

    img{
        width: 60%;
        height: 35.7%;
        margin-left: 20%;
        margin-top: 25%;

    }

    .title-gare {
        text-align: center;
        margin-top: 10%;
        font-weight: bold;
    }

    .prixAchat{
        text-align: center;
        width: 100%;
        margin-top:30%;
        font-weight: bold;
        font-size: large;
    }

</style>