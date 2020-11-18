<template>
  <div>
    <p>C'est le plateau</p>
    <!-- Permet d'afficher la première case propriété sur le plateau pour tester-->
    <CasePropriete 
    :nom="proprietes[0][1].nom" 
    :sous_nom="proprietes[0][1].sous_nom" 
    :monopole="proprietes[0][1].Color"
    :loyer="proprietes[0][1].loyer[0]"
    />

    <CaseServicePublic 
    :nom="services[0][1].nom" 
    :monopole="services[0][0]"
    />

    <CaseChance
    />

    <CaseCaisseCommunaute
    />
  </div>
</template>

<script>
import CasePropriete from "./CasePropriete";
import CaseServicePublic  from "./CaseServicePublic";
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";

import CaseChance from "./CaseChance";
import CaseCaisseCommunaute from "./CaseCaisseCommunaute";
import Cartes_chances_communautes from "../Cartes_chances_communautes.json";

export default {
  components: {
    CasePropriete,
    CaseServicePublic,
    CaseChance,
    CaseCaisseCommunaute,
  },
  data: () => ({
    proprietes: [],
    services: [],
    jsonProprietes: [],
    chance: [],
    communaute: [],
    jsonChance: [],
  }),
  created() {
    this.jsonProprietes = Cartes_propriete_gares_services;
    this.jsonChance = Cartes_chances_communautes;
    this.init();
  },
  methods: {
    init: function () {
        this.proprietes = this.jsonProprietes[0];
        this.services = this.jsonProprietes[2];
        this.chance = this.jsonChance[0];
        this.communaute = this.jsonChance[1];
        console.log(this.proprietes[0][1]);
        console.log(this.proprietes);
    },
  },
};

/*export default {
  components: {
    CaseChance,
    CaseCaisseCommunaute,
  },
  data: () => ({
    chance: [],
    communaute: [],
    jsonChance: [],
  }),
  created() {
    this.jsonChance = Cartes_chances_communautes;
    this.init();
  },
  methods: {
    init: function () {
        this.chance = this.jsonChance[0];
        this.communaute = this.jsonChance[1];
        console.log(this.chance[0][1]);
        console.log(this.chance);
    },
  },
};*/
</script>