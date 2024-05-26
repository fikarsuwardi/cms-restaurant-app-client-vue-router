<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../store/main";

import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://restaurant-server-fikar.herokuapp.com";

export default {
  name: "LoginPage",
  data() {
    return {
      objLogin: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ["dataFood", "isLogin"]),
  },
  methods: {
    ...mapActions(useMainStore, ["loginHandle"]),

    loginButton() {
      this.loginHandle(this.objLogin);
    },

    // GOOGLE LOGIN
    handleCredentialResponse(response) {
      axios({
        method: "POST",
        url: baseUrl + "/public/login-google",
        data: {
          credential: response.credential,
        },
      })
        .then((response) => {
          // console.log(response);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("id", response.data.dataUser.id);
          localStorage.setItem("role", response.data.dataUser.role);

          this.isLogin = true;
          this.$router.push("/");

          Swal.fire({
            icon: "success",
            text: "Login Success",
          })
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            text: error.response.data.error.message,
          });
        });
    },
  },
  mounted() {
    const cb = this.handleCredentialResponse;

    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "97034013937-4ojhlo9i1gv9q66li46jkfqajvf1tbt6.apps.googleusercontent.com",
        callback: cb,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
    };
  },
  created() {
    this.dataFood;
  },
};
</script>

<template>
  <!-- LOGIN -->
  <div class="text-center">
    <div class="row content">
      <div class="col-sm-6">
        <img
          style="height: 550px; width: 550px; object-fit: cover"
          src="../assets/login_wallpaper.jpg"
          alt=""
        />
      </div>
      <div class="col-sm-6 text-center">
        <!-- LOGIN FORM -->
        <div class="login-form text-center mt-5">
          <form action="" style="max-width: 480px; margin: auto">
            <img
              class="mt-4 mb-4"
              src="../assets/meal-food.png"
              alt="bootstrap-logo"
              height="72"
            />
            <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
            <label for="email-login" class="sr-only">Email Address</label>
            <input
              type="email"
              id="email-login"
              class="form-control"
              placeholder="Email Address"
              required
              autofocus
              v-model="objLogin.email"
            />
            <label for="password-login" class="sr-only">Password</label>
            <input
              type="password"
              id="password-login"
              placeholder="Password"
              class="form-control"
              v-model="objLogin.password"
            />
            <br />
            <div class="mt-3">
              <button
                class="btn btn-lg btn-primary btn-block col-12"
                id="signin-button"
                v-on:click.prevent="loginButton"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <!-- BATAS LOGIN FORM -->
        <br>
        <div style="display:block;margin-left:auto;margin-right:auto;" align="center" >
          <div id="buttonDiv"></div>
        </div>
      </div>
    </div>
  </div>
</template>
