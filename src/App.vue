<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'games' }">Matches</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>

        <!-- <b-nav-item :to="{ name: 'team' }">Team</b-nav-item> -->

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <h5 style="color:white; padding-top: 3%">hello guest! </h5>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <!-- // permission -->
        <b-navbar-nav class="ml-auto" v-else-if="findIfRepresentative() && isRepresentative==true">
        <b-nav-item-dropdown right>
          <template #button-content>
            {{$root.store.username}}
          </template>
          <b-dropdown-item href="#/league">Manage League</b-dropdown-item>
          <b-dropdown-item href="#/Favorites">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- // no permission -->
        <b-navbar-nav class="ml-auto" v-else-if="findIfRepresentative() && isRepresentative==false">
        <b-nav-item-dropdown right>
          <template #button-content>
            User
          </template>
          <b-dropdown-item href="#/Favorites">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
   data() {
    return {
      isRepresentative: false
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async findIfRepresentative() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/league/isRepresentative`,
        );        
        this.isRepresentative = response.data;
      } catch (error) {
        console.log("error in isRepresentative")
        this.isRepresentative = false;
        console.log(error);
      }
    }
  },
//     computed: {
//      PlayIsRepresentative() {
//       return this.findIfRepresentative()
//     }
// },
  //   mounted(){
  //   this.findIfRepresentative(); 
  // },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
