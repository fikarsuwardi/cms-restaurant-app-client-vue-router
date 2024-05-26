<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../store/main";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "TheNavbar",
  computed: {
    ...mapWritableState(useMainStore, ["isLogin", "dataFood"]),
  },
  methods: {
    ...mapActions(useMainStore, ["logoutHandle"]),

    buttonHome() {
      this.$router.push("/");
    },
    buttonSignUp() {
      this.$router.push("/register");
    },
    buttonSignIn() {
      this.$router.push("/login");
    },
    buttonLogout() {
      this.$router.push("/login");
      localStorage.clear();
      this.isLogin = false;

      Swal.fire({
        icon: "success",
        text: "Logout Success",
      });
    },
    buttonFavorite() {
      this.$router.push("/favorite");
    },
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
  <!-- NAVBAR -->
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="#" v-on:click.prevent="buttonHome">Restaurant Fikar</a>
          </li>
          <li>
            <a href="#" 
              v-on:click.prevent="buttonFavorite"
              v-if="isLogin === true"
              >My Favorite</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" v-on:click.prevent="buttonSignIn" v-if="isLogin === false" >SignIn</a></li>
          <li><a href="#" v-on:click.prevent="buttonSignUp" v-if="isLogin === false">SignUp</a></li>
          <li><a href="#" v-on:click.prevent="buttonLogout" v-if="isLogin === true">SignOut</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
