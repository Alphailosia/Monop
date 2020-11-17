<template>
    <v-card class="gare">
        <img v-if="afficheimage()" :src="imagefinal"/>
        <v-card-title class="title-gare">
            {{nom}}
        </v-card-title>

        <div class="prix-gare">
            LOYER € {{loyer[0]}}
            <br>
            LOYER si vous avez 2 gares {{loyer[1]}}
            <br>
            LOYER si vous avez 2 gares {{loyer[2]}}
            <br>
            LOYER si vous avez 2 gares {{loyer[3]}}
        </div>
        <br>
        <div class="hypothèque">
            Valeur Hypothécaire <br>
            € {{hypothèque}}
        </div>
    </v-card>
</template>

<script>
    export default {
        props: {
            image: Number,
            nom: String,
            loyer: Array,
            hypothèque: Number
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
        margin-left: 20%;
        margin-top: 5%;

    }

    .title-gare {
        text-align: center;
        margin-top: 10%;
        font-weight: bold;
    }


    .prix-gare{
        font-size: small;
        width: 100%;
        margin-top: 20%;
    }
    .hypothèque{
        font-size: small;
        text-align: center;
        width: 100%;
        margin-top:0;
    }

</style>