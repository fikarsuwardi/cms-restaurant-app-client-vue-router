<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from "@/store/main";

export default {
  name: "TheFavoriteCard",
  props: ["el2"],
  methods: {
    ...mapActions(useMainStore, ["getDetailFood"]),

    buttonDetail(id) {
      this.$router.push(`/food/${id}`)
    },

    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(money);
    },
  },
};
</script>

<template>
  <!-- CARD -->
  <div class="col-sm-4">
    <div class="card text-center mx-auto" >
      <img
        class="card-img-top img-thumbnail"
        v-bind:src="el2.Food.imgUrl"
        alt="Card image"
      />
      <div class="card-body">
        <h4 class="card-title">{{ el2.Food.name }}</h4>
        <p class="card-text">{{ formatRupiah(el2.Food.price) }}</p>
        <a href="#" class="btn btn-primary pb-2"
        v-on:click.prevent="buttonDetail(el2.Food.id)"
          >See Detail</a>
      </div>
    </div>
  </div>
</template>
