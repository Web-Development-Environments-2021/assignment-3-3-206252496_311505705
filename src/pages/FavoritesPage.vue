<template>
  <div class="container">
    <h1 class="title">Favorites Page</h1>
    <FavoriteGames :num_of_fav=10 ></FavoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  name: "Favorites",
  components: {
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
