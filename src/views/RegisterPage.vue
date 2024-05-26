<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from "../store/main";

export default {
  name: "RegisterPage",
  data() {
    return {
      objRegister: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    }
  },
  methods: {
    ...mapActions(useMainStore, ["registerHandle"]),

    registerButton() {
      this.registerHandle(this.objRegister)
    }
  },
};
</script>

<template>
  <!-- REGISTER -->
  <div class="text-center">
    <div class="row content">
      <div class="col-sm-6">
        <img
          style="height: 550px; width: 550px; object-fit: cover"
          src="../assets/register_wallpaper.avif"
          alt=""
        />
      </div>
      <div class="col-sm-6">
        <!-- REGISTER-FORM -->
        <div class="register-form text-center mt-5">
          <form action="" style="max-width: 480px; margin: auto">
            <img
              class="mt-4 mb-4"
              src="../assets/meal-food.png"
              alt="bootstrap-logo"
              height="72"
            />
            <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
            <label for="username-login" class="sr-only">Username</label>
            <input
              type="text"
              id="username-login"
              class="form-control"
              placeholder="Username"
              required
              autofocus
              v-model="objRegister.username"
            />
            <label for="email-login" class="sr-only">Email Address</label>
            <input
              type="email"
              id="email-login"
              class="form-control"
              placeholder="Email Address"
              required
              autofocus
              v-model="objRegister.email"
            />
            <label for="password-login" class="sr-only">Password</label>
            <input
              type="password"
              id="password-login"
              placeholder="Password"
              class="form-control"
              v-model="objRegister.password"
            />
            <label for="phone-number-login" class="sr-only">Phone Number</label>
            <input
              type="text"
              id="phone-number-login"
              class="form-control"
              placeholder="Phone Number"
              required
              autofocus
              v-model="objRegister.phoneNumber"
            />
            <label for="address-login" class="sr-only">Email Address</label>
            <input
              type="text"
              id="address-login"
              class="form-control"
              placeholder="Address"
              required
              autofocus
              v-model="objRegister.address"
            />
            <br>
            <div class="mt-3">
              <button
                class="btn btn-lg btn-primary btn-block col-12"
                id="signup-button"
                v-on:click.prevent="registerButton"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <!-- BATAS REGISTER FORM -->
      </div>
    </div>
  </div>
  <!-- BATAS REGISTER -->
</template>
