<template>
  <div class="container">
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <div v-if="!$root.store.username">
        <b-row>
          <b-col align-self="baseline"><LeagueInfo></LeagueInfo></b-col>
          <!-- <div class="vl"></div> -->
          <b-col align-self="stretch"><LoginPage ></LoginPage></b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col align-self="baseline" ><br/><br/><LeagueInfo></LeagueInfo></b-col>
          <!-- <div class="vl"></div> -->
          <b-col class="favorites" align-self="stretch" cols=4><br/><h3 class="subtitle">My Favorites:</h3><FavoriteGames :num_of_fav=3></FavoriteGames></b-col>

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
.vl {
  border-left: 6px solid rgb(11, 131, 161);
  height: 800px;
  position: absolute;
  left: 50%;
  margin-left: -3px;
  top: 54px;
}
.favorites{
  top: 50px;
  bottom: 5px;
  text-align: center;
  display: inline-block;
  width: 350px;
  height: 830px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(11, 131, 161);
}
.subtitle{
  text-align: left;
}
</style>
