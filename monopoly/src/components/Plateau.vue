<template>
  <div>
    <p>C'est le plateau</p>
    <!-- Permet d'afficher la première case propriété sur le plateau pour tester-->
    <!--<CasePropriete 
    :nom="proprietes[0][1].nom" 
    :monopole="proprietes[0][0]"
    />

    :sous_nom="proprietes[0][1].sous_nom" 
    :monopole="proprietes[0][1].Color"
    :loyer="proprietes[0][1].loyer[0]"
    />

    <CaseServicePublic 
    :nom="services[0][1].nom" 
    :monopole="services[0][0]"
    />-->

    <CaseCommunaute
    :nom="communaute[0][1].nom" 
    :label="communaute[0][0]"
    />

    <!--<CaseChance 
    :nom="chance[0][1].nom" 
    :label="chance[0][0]"
    />-->
  </div>
</template>

<script>
/*import CasePropriete from "./CasePropriete";
import CaseServicePublic  from "./CaseServicePublic";
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";*/

import CaseCaisseCommunaute from "./CaseCaisseCommunaute";
//import CaseChance from "./CaseChance";
import Cartes_chances_communautes from "../Cartes_chances_communautes.json";

/*export default {
  components: {
    //CasePropriete,
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
};*/

export default {
  components: {
    CaseCaisseCommunaute,
  },
  data: () => ({
    communaute: [],
    jsonCommunautes: [],
  }),
  mounted() {
    this.jsonCommunautes = Cartes_chances_communautes;
    this.init();
  },
  methods: {
    init: function () {
        this.communaute = this.jsonCommunautes[0];
        console.log(this.communaute[0][1]);
        console.log(this.caisseCommunaute);
    },
  },
};

/*export default {
  components: {
    CaseChance,
  },
  data: () => ({
    chance: [],
    jsonChance: [],
  }),
  mounted() {
    this.jsonChance = Cartes_chances_communautes;
    this.init();
  },
  methods: {
    init: function () {
        this.chance = this.jsonChance[0];
        console.log(this.chance[0][1]);
        console.log(this.chance);
    },
  },
};*/
</script>