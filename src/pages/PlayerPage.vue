<template>
  <div class="container">
    <h1 class="title">Player Page</h1>
    <PlayerInfo :player_id=player_id2></PlayerInfo>
    <PlayerSearch @clicked="onClickChild"></PlayerSearch>
  </div>

</template>

<script>
import PlayerSearch from "../components/PlayerSearch";
import PlayerInfo from "../components/PlayerInfo";
export default {
  name: "Player",
  components: {
    PlayerInfo:PlayerInfo,
    PlayerSearch:PlayerSearch
  },
  props:['player_id'],
    data() {
    return {
      player_id2:0
    }},
  methods: {
    onClickChild (player_id) {
      console.log("**")
      this.player_id=player_id;
    }
  },
  mounted(){
    if(this.player_id){
      console.log("im here")
      this.player_id2 = this.player_id
    }
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
