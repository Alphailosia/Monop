<template>
  <div>
    <p>C'est le plateau</p>
    
    <CasePropriete 
    :nom="proprietes[0][1].nom" 
    :monopole="proprietes[0][0]"
    />
  </div>
</template>

<script>
import CasePropriete from "./CasePropriete";
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    CasePropriete,
  },
  data: () => ({
    proprietes: [],
    jsonProprietes: [],
  }),
  mounted() {
    this.jsonProprietes = Cartes_propriete_gares_services;
    this.init();
  },
  methods: {
    init: function () {
        this.proprietes = this.jsonProprietes[0];
        console.log(this.proprietes[0][1]);
        console.log(this.proprietes);
    },
  },
};
</script>