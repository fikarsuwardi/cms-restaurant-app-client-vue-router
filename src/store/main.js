import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://restaurant-server-fikar.herokuapp.com";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      isLogin: false,
      dataFood: [],
      dataCategory: [],
      dataDetailFood: {},
      dataDetailFoodUser: {},
      dataDetailFoodCategory: {},
      dataFavorite: [],
      id: 0,
      // NAVIGASI
      totalPage: 0,
      currentPage: 0,
      searchName: "",
      minprice: "",
      codeQR: "",
      route: ""
    };
  },
  actions: {
    // REGISTER
    registerHandle: function (objRegister) {
      axios
        .post(`${baseUrl}/public/register`, {
          username: objRegister.username,
          email: objRegister.email,
          password: objRegister.password,
          phoneNumber: objRegister.phoneNumber,
          address: objRegister.address,
        })
        .then((response) => {
          console.log(response.data, "ini dari register handle");
          this.router.push("/login");
          Swal.fire({
            icon: "success",
            text: "Register Success, now Please Login",
          });
        })
        .catch((error) => {
          console.log(error, "ini error dari error handle");
          Swal.fire({
            icon: "error",
            text: error.response.data.error.message,
          });
        });
    },

    // LOGIN
    async loginHandle(objLogin) {
      try {
        const response = await axios.post(`${baseUrl}/public/login`, {
          email: objLogin.email,
          password: objLogin.password,
        });
        console.log(response.data, "ini response dari loginHandle");
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("id", response.data.payload.id);
        localStorage.setItem("role", response.data.payload.role);

        this.$state.isLogin = true;
        this.router.push("/");

        Swal.fire({
          icon: "success",
          text: "Login Success",
        });
      } catch (error) {
        console.log(error, "ini error dari loginHandle");
        Swal.fire({
          icon: "error",
          text: error.response.data.error.message,
        });
      }
    },

    // GET DATA FOOD
    async getDataFood() {
      try {
        const response = await axios.get(
          `${baseUrl}/public/?name=${this.searchName}&minprice=${this.minprice}&page=${this.currentPage}`
        );
        console.log(response.data.data.rows, "ini response dari getDataFood");
        this.dataFood = response.data.data.rows;
        this.totalPage = response.data.totalPage
        // this.currentPage = response.data.page;
      } catch (error) {
        console.log(error.message, "ini error");
        Swal.fire({
          icon: "error",
          text: error.message,
        });
      }
    },

    //GET DATA CATEGORY
    async getDataCategory() {
      try {
        const response = await axios.get(`${baseUrl}/public/category`)
        console.log(response.data.category, "ini response dari get data category");
        this.dataCategory = response.data.category
      } catch (error) {
        console.log(error.message, "ini error");
        Swal.fire({
          icon: "error",
          text: error.message,
        });
      }
    },

    // GET DETAIL FOOD
    async getDetailFood(id) {
      try {
        const response = await axios.get(`${baseUrl}/public/food/${id}`)
        const responseCode = await axios.get(`${baseUrl}/public/qrcode`, {
          data: `${this.baseUrl}${this.route}`
        })
        console.log(response.data.data, "ini response dari getDetailFood");
        console.log(responseCode.data.code, "ini temannya code nuklir")

        this.dataDetailFood = response.data.data
        this.dataDetailFoodUser = response.data.data.User
        this.dataDetailFoodCategory = response.data.data.Category

        this.codeQR = responseCode.data.code
      } catch (error) {
        console.log(error.message, "ini error");
        Swal.fire({
          icon: "error",
          text: error.message,
        });
      }
    },

    //ADD TO FAVORITE
    async addToFavorite(id) {
      // console.log(localStorage.getItem("access_token"));
      try {
        const response = await axios.post(`${baseUrl}/public/favorite/${id}`, {} ,{
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        })
        console.log(response, "ini dari add favorite");
        Swal.fire({
          icon: 'success',
          text: response.data.message
        })  
      } catch (error) {
        console.log(error.response.data.error.message, "ini error");
          Swal.fire({
            icon: 'error',
            text: error.response.data.error.message
          })
      }
    },

    // LIST FAVORITE
    async getDataFavorite() {
      try {
        const response = await axios.get(`${baseUrl}/public/favorite`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        })
        console.log(response.data.data, "ini getDataFavorite");
        this.dataFavorite = response.data.data
      } catch (error) {
        console.log(error.message, "ini error dari getDataFavorite");
        Swal.fire({
          icon: "error",
          text: error.message,
        });
      }
    },    
  },
  getters: {},
});

// export default useMainStore
