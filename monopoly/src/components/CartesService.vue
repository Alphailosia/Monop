<template>
  <v-card class="services">
      <div class="image-services">
      <img src="../assets/images/ampoule.png" />
    </div>
    <v-card-title class="title-services">
      {{ carte.nom }}
    </v-card-title>
    <div class="explications">
        Si l'on possède UNE carte de compagnie de Service Public, le loyer est 4 fois le montant indiqué par les dés.
        <br>
        <br>
        Si l'on possède DEUX cartes de compagnie de Service Public, le loyer est 10 fois le montant indiqué par les dés.
      </div>
    <div class="hypotheque"> Valeur Hypothécaire : € {{ carte.hypotheque }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    carte: Object,
  },
  mounted() {
      console.log(this.carte);
  },
};
</script>

<style scoped>
.services {
  width: 500px;
  height: 800px;
  border: solid 2px;
  border-radius: 5px;
  position: relative;
}

.image-services {
  height: 100px;
  width: 100px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
}

.title-services {
  text-align: center;
  font-weight: bold;
  word-break: break-word;
  justify-content: center;
  font-size: 230%;
  margin-top: 20px;
}

.explications {
  margin-top: 30px;
  text-align: center;
  font-size: 150%;
  margin-right: 50px;
  margin-left: 50px;
}

.hypotheque {
  text-align: center;
  font-size: 150%;
  margin-top: 50px;
}
</style>
