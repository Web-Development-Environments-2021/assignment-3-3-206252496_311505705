<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <div v-if="!$root.store.username">
        <b-row>
          <b-col align-self="baseline"><LeagueInfo></LeagueInfo></b-col>
          <b-col align-self="stretch"><LoginPage ></LoginPage></b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col align-self="baseline"><LeagueInfo></LeagueInfo></b-col>
          <b-col align-self="stretch"><h3 class="subtitle">My Favorites:</h3><FavoriteGames :num_of_fav=3></FavoriteGames></b-col>
        </b-row>
      </div>  
    </b-container>
  </div>
</template>


<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
