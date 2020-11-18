<template>
  <v-card class="taxe">
    <v-card-title class="title-taxe">
      {{ nom }}
    </v-card-title>

    <div class="image-taxes">
      <img src="../assets/images/bague.png" alt="départ" />
    </div>
    <v-card-title class="prix-taxe"> Prix : {{ prix }} euros </v-card-title>
  </v-card>
</template>



<script>
export default {
  props: {
    nom: String,
    prix: Number,
  },
};
</script>

<style scoped>


.title-taxe {
  width:200px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 40px;
}



.taxe {
  width: 204px;
  height: 300px;
  border: solid 2px;
  border-radius: 5px;
}


.prix-taxe {
  text-align: center;
  justify-content: center;
  margin-top: 170px;
}

.image-taxes {
  height: 1px;
  width: 100px;
  margin-bottom: 40px;
  margin-left: 25px;
  margin-right: 75px;
}

</style>
