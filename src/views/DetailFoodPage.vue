<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../store/main";

export default {
  name: "DetailFoodPage",
  computed: {
    ...mapWritableState(useMainStore, ["dataDetailFood", "dataDetailFoodUser", "dataDetailFoodCategory" ,"codeQR"]),
  },
  methods: {
    ...mapActions(useMainStore, ["getDetailFood"]),

    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(money);
    },
  },
  created() {
    this.route = this.$route.fullPath;
    this.id = this.$route.params.id;
    this.getDetailFood(this.id);
    this.codeNuklir
  },
};
</script>

<template>
  <!-- DETAIL FOOD -->
  <div class="container-fluid text-center">
    <div class="row content">
      <div class="col-sm-8">
        <img
          class="card-img-top img-thumbnail"
          v-bind:src="dataDetailFood.imgUrl"
          alt="Card image"
        />
        <hr />
        <div>
          <h3>{{ dataDetailFood.name }}</h3>
          <p>
            {{ dataDetailFood.description }}
          </p>
          <p>{{ formatRupiah(dataDetailFood.price) }}</p>
          <p>{{ dataDetailFoodCategory.name }}</p>
        </div>
      </div>

      <div class="col-sm-4 text-left p-3">
        <h1>happi.dev</h1>
        <img
          class="card-img-top img-thumbnail"
          v-bind:src="codeQR"
          alt="Card image"
        />
      </div>
    </div>
    <!-- BATAS DETAIL FOOD -->
  </div>
</template>
