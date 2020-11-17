<template>
  <div>
    <p>C'est le plateau</p>
    
    <CasePropriete 
    :nom="proprietes[0][1].nom" 
    :monopole="proprietes[0][0]"
    />

    <CaseServicePublic 
    :nom="services[0][1].nom" 
    :monopole="services[0][0]"
    />
  </div>
</template>

<script>
import CasePropriete from "./CasePropriete";
import CaseServicePublic  from "./CaseServicePublic";
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    CasePropriete,
    CaseServicePublic
  },
  data: () => ({
    proprietes: [],
    services: [],
    jsonProprietes: [],
  }),
  created() {
    this.jsonProprietes = Cartes_propriete_gares_services;
    this.init();
  },
  methods: {
    init: function () {
        this.proprietes = this.jsonProprietes[0];
        this.services = this.jsonProprietes[2];
        console.log(this.proprietes[0][1]);
        console.log(this.proprietes);

    },
  },
};
</script>