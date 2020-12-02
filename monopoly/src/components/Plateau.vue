<template>
  <div class="plateau">
    <div
      v-for="(row, indexRow) in cases"
      :key="indexRow"
      :class="indexRow < cases.length - 1 && indexRow > 0 ? 'ligne' : ''"
    >
      <div v-for="(c, indexCase) in row" :key="indexCase">
        <CasePropriete
          v-if="c.type === 'propriete'"
          :nom="c.nom"
          :sous_nom="c.sous_nom"
          :monopole="c.Color"
          :loyer="c.loyer[0]"
          :position="getCasePosition(indexRow, indexCase)"
          @propriete="affichageClick(c.nom, c.Color)"
        />
        <CaseDepart
          v-else-if="c.type === 'Départ'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CaseGare
          v-else-if="c.type === 'gare'"
          :image="c.image"
          :nom="c.nom"
          :prixAchat="c.prixAchat"
          :position="getCasePosition(indexRow, indexCase)"
          @gare="affichageClick2(c.nom, c.type)"
        ></CaseGare>
        <CaseChance
          v-else-if="c.type === 'chance'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CaseCaisseCommunaute
          v-else-if="c.type === 'caisse'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CaseParcGratuit
          v-else-if="c.type === 'parc'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CaseServicePublic
          v-else-if="c.type === 'service'"
          :nom="c.nom"
          :loyer="c.loyer[0]"
          :position="getCasePosition(indexRow, indexCase)"
          @service="affichageClick2(c.nom, c.type)"
        />
        <Taxe
          v-else-if="c.type === 'taxe'"
          :nom="c.nom"
          :prix="c.prix"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CasePrison
          v-else-if="c.type === 'prison'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <CaseSimpleVisite
          v-else-if="c.type === 'visite'"
          :position="getCasePosition(indexRow, indexCase)"
        />
        <div v-else-if="c.type === 'null'" class="empty-case"></div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <CartesPropriete :carte="carte" />
    </v-dialog>
  </div>
</template>

<script>
import CaseDepart from "./CaseDepart";
import CasePropriete from "./CasePropriete";
import CaseGare from "./CaseGare";
import CaseServicePublic from "./CaseServicePublic";
import Taxe from "./Taxe.vue";
import TaxeJson from "../Taxe.json";
import CaseParcGratuit from "./CaseParcGratuit";
import Cartes_propriete_gares_services from "../Cartes_propriete_gares_services.json";
import CaseChance from "./CaseChance";
import CaseCaisseCommunaute from "./CaseCaisseCommunaute";
import Cartes_chances_communautes from "../Cartes_chances_communautes.json";
import CaseSimpleVisite from "./CaseSimpleVisite";
import CasePrison from "./CasePrison";
import cases from "../cases.json";
import CartesPropriete from "./CartesPropriete.vue";

export default {
  components: {
    CaseDepart,
    CasePropriete,
    CaseGare,
    CaseServicePublic,
    Taxe,
    CaseChance,
    CaseCaisseCommunaute,
    CaseParcGratuit,
    CaseSimpleVisite,
    CasePrison,
    CartesPropriete,
  },
  data: () => ({
    proprietes: [],
    gares: [],
    services: [],
    jsonProprietes: [],
    Taxe: [],
    jsonTaxe: [],
    chance: [],
    communaute: [],
    jsonChance: [],
    cases: cases,
    dialog: false,
    carte: {},
  }),
  created() {
    this.jsonProprietes = Cartes_propriete_gares_services;
    this.jsonChance = Cartes_chances_communautes;
    this.jsonTaxe = TaxeJson;
    this.init();
  },
  methods: {
    init: function () {
      this.proprietes = this.jsonProprietes[0];
      this.gares = this.jsonProprietes[1];
      this.services = this.jsonProprietes[2];
      this.chance = this.jsonChance[0];
      this.communaute = this.jsonChance[1];
      this.Taxe = this.jsonTaxe[0];
    },
    affichageClick: function (nom, Color) {
      for (let i = 0; i < this.proprietes.length; i++) {
        if (Color === this.proprietes[i][0].Color) {
          for (let j = 0; j < this.proprietes[i].length; j++) {
            if (nom === this.proprietes[i][j].nom) {
              this.carte = this.proprietes[i][j];
            }
          }
        }
      }
      this.dialog = true;
    },
    affichageClick2: function (nom, type) {
      if (type === "gare") {
        for (let i = 0; i < this.gares.length; i++) {
          if (nom === this.gares[i].nom) {
            this.carte = this.gares[i];
          }
        }
      }
      else {
        for (let i = 0; i < this.services.length; i++) {
          if (nom === this.services[i].nom) {
            this.carte = this.services[i];
          }
        }
      }
      this.dialog = true;
    },
    getCasePosition: function (indexRow, indexCase) {
      if (indexRow === 0) {
        return "top";
      } else if (indexRow > 0 && indexRow < 11 && indexCase === 0) {
        return "left";
      } else if (indexRow > 0 && indexRow < 11 && indexCase === 10) {
        return "right";
      }
    },
    setDepl: function () {
      this.deplLeft += 125;
    },
  },
};
</script>
<style scoped>
.plateau > div {
  display: flex;
}

.ligne {
  height: 200px;
}

.empty-case {
  width: 200px;
  height: 200px;
}
</style>