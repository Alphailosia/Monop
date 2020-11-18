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
    />-->



    <CaseDepart/>
  </div>
</template>

<script>
import CaseDepart  from "./CaseDepart";
/*import CasePropriete from "./CasePropriete";*/
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";

export default {
  components: {
    CaseDepart
    /*CasePropriete,*/
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