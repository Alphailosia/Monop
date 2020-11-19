<template>
    <v-card class="gare" v-bind:class="[position]">
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
            prixAchat: Number,
            position: String,
        },
        data: () => ({
            imagefinal: null
        }),
        methods:{
            afficheimage() {
                if (this.image == 0) {
                    this.imagefinal = require("../assets/images/avion.png");

                } else if (this.image == 1) {
                    this.imagefinal = require("../assets/images/bateau.png");
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
        position: relative;
    }

    img{
        width: 60%;
        height: 35.7%;
        margin-left: 20%;
        margin-top: 10%;

    }

    .title-gare {
        text-align: center;
        margin-top: 10%;
        font-weight: bold;
        justify-content: center;
        
    }

    .prixAchat{
        text-align: center;
        width: 100%;
        margin-top:30%;
        font-weight: bold;
        font-size: large;
        position: absolute;
        bottom: 0;
    }

.top {
    transform: rotate(180deg);
}
.left {
    transform: rotate(90deg) translate(-50px,-50px);
    margin-right: 100px;
}
.right {
    transform: rotate(270deg) translate(50px,50px);
}
</style>