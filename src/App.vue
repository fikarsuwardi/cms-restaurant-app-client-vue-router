<script>
import { RouterView } from "vue-router";
import { mapState, mapActions } from "pinia";
import { useMainStore } from "./store/main";

import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
    RouterView,
  },
  computed: {
        ...mapState(useMainStore, ['isLogin', 'dataFood'])
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin= true;
    } else {
      this.isLogin = false;
    }
  },
};
</script>

<template>
  <div class="container">
    <TheNavbar />
    <RouterView />
  </div>
</template>

<style></style>
