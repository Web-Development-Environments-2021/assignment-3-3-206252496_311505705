<template>
<div class="main">
  <div class="container">
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <div v-if="!$root.store.username">
        <b-row>
          <b-col align-self="baseline"><br/><br/><LeagueInfo></LeagueInfo></b-col>
          <b-col align-self="stretch"><br/><br/><br/><br/><br/><br/><br/><LoginPage ></LoginPage></b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col align-self="baseline" ><br/><br/><LeagueInfo></LeagueInfo></b-col>
          <b-col class="favorites" align-self="stretch" cols=4><br/><h3 class="subtitle">My Favorites:</h3><FavoriteGames :num_of_fav=3 ></FavoriteGames></b-col>
        </b-row>
      </div>  
    </b-container>
    <footer>
      <center>
      <p style="padding-top: 3%"> Ⓒ Mor Zweig and Ori Ben-Artzy </p>
      </center>
    </footer>
  </div>
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
.main{
  background-image: url("https://res.cloudinary.com/dwg8ravkv/image/upload/v1623752748/background_xlfkwv.jpg") ;
  background-repeat: no-repeat;
  background-size: 105%;
  height: 970px;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.vl {
  border-left: 6px solid rgb(11, 131, 161);
  height: 820px;
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
  height: 880px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:#2c3e50;
}
.subtitle{
  text-align: left;
}
</style>
