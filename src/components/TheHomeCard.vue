<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from "@/store/main";

export default {
  name: "TheHomeCard",
  props: ["el2"],
  computed: {
    ...mapState(useMainStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useMainStore, ["addToFavorite", "getDetailFood"]),

    buttonFavorite(id) {
      this.addToFavorite(id)
      console.log("cek");
    },

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
  <div class="col-sm-4 p-2">
    <div class="card text-center mx-auto" >
      <img
        class="card-img-top img-thumbnail"
        v-bind:src="el2.imgUrl"
        alt="Card image"
      />
      <div class="card-body">
        <h4 class="card-title">{{ el2.name }}</h4>
        <p class="card-text">{{ formatRupiah(el2.price) }}</p>
        <a href="#" class="btn btn-primary pb-2"
          v-on:click.prevent="buttonDetail(el2.id)"
          >See Detail</a>
        <a href="#" class="btn btn-primary pb-2"
          v-if="isLogin === true"
          v-on:click.prevent="buttonFavorite(el2.id)"
        >Bookmark</a>
        <hr>
      </div>
    </div>
  </div>
</template>
