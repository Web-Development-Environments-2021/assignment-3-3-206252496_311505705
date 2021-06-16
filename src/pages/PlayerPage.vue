<template>
<div>
  <div class="container">
    <br/>
    <!-- <h1 class="title">Player Page</h1> -->
  </div>
    <div class="container">
      <br/>
      <PlayerInfo :player_id="player_id"></PlayerInfo>
    </div>
  </div>
</template>

<script>
import PlayerInfo from "../components/PlayerInfo";
export default {
  name: "Player",
  components: {
    PlayerInfo:PlayerInfo,
  },
    props: {
      player_id: {
        type: Number,
        required: true
      }
    },
    data() {
    return {
      
    }},
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
