<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "@/store/main";

import TheFavoriteCard from "../components/TheFavoriteCard.vue";

export default {
  name: "FavoritePage",
  components: {
    TheFavoriteCard,
  },
  computed: {
    ...mapState(useMainStore, ["dataFavorite"]),
  },
  methods: {
    ...mapActions(useMainStore, ["getDataFavorite"]),
  },
  created() {
    this.getDataFavorite();
  },
};
</script>

<template>
  <!-- FAVORITE -->
  <div class="row">
    <div class="row">
      <h1 class="text-center">My Favorite</h1>
      <TheFavoriteCard v-for="el in dataFavorite" :key="el.id" v-bind:el2="el"/>
    </div>
  </div>
</template>
