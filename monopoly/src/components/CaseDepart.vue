<template>
  <v-card class="services" v-bind:class="[position]">
    <v-card-title class="title-services"> Départ </v-card-title>
    <div class="sous-nom-services">
        Recevez 200€ chaque fois<br> que vous passez ici
    </div>
    <div class="image-services">
      <img src="../assets/images/fleche.png" alt="départ" />
    </div>
  </v-card>
</template>

<script>
export default {
props: {
    position: String,
    } 
}
</script>

<style scoped>
.services {
  width: 300px;
  height: 300px;
  border: solid 2px;
  border-radius: 5px;
}
.color-services {
  height: 20%;
}
.title-services {
  text-align: center;
  font-weight: bold;
  margin-top:20px;
  font-size: 40px;
}
.sous-nom-services {
  text-align: center;
  justify-content: center;
  margin-top: 20px;
}

.image-services {
  height: 1px;
  width: 100px;
  margin-top: 110px;
  margin-left: 75px;
  margin-right: 75px;
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