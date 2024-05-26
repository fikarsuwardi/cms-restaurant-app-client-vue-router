<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "@/store/main";

import TheHomeCardVue from "../components/TheHomeCard.vue";

export default {
  name: "HomePage",
  components: {
    TheHomeCardVue,
  },
  computed: {
    ...mapState(useMainStore, ["dataFood", "totalPage"]),
    ...mapWritableState(useMainStore, ["currentPage", "searchName", "minprice"])
  },
  methods: {
    ...mapActions(useMainStore, ["getDataFood"]),

    buttonSearch() {
      this.$router.push({
        path: this.$route.fullPath,
        query: {
          name: this.searchName,
          search: this.minprice,
        },
      });
      this.getDataFood();
    },

    navigationPage(id = 1) {
      this.currentPage = id
      this.$router.push({
        path: this.$route.fullPath,
        query: {
          page: id,
        },
      });
      this.getDataFood()
    },

  },
  created() {
    this.buttonSearch()
    this.navigationPage(this.$route.query.page);
  },
};
</script>

<template>
  <!-- HOME -->
  <div class="container-fluid">
    <div class="row content">
      <!-- BODY -->
      <div class="col-sm-12 text-left p-3 text-center">
        <div>
          <form>
        <input
          class="form-control me-2"
          type="text"
          placeholder="Search Name"
          name="name"
          v-model="this.searchName"
        />
        <input
          class="form-control me-2"
          type="text"
          placeholder="Search MinPrice"
          name="minprice"
          v-model="this.minprice"
        />
        <br />
        <button
          class="btn btn-primary"
          type="button"
          v-on:click.prevent="buttonSearch(this.searchName, this.minprice)"
        > 
          Search
        </button>
      </form>
        </div>
        <h1>WELCOME</h1>
        <p>Welcome to Restaurant Fikar</p>
        <div class="row">
          <TheHomeCardVue v-for="el in dataFood" :key="el.id" v-bind:el2="el" />
        </div>
        <ul class="pagination">
          <li v-for="(el, index) in totalPage"  >
            <a href="#" v-on:click.prevent="navigationPage(el)">{{ el }}</a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
