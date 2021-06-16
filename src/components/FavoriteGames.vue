<template>
  <div>
    <div v-if="num_of_fav == 3">
      <FutureGamePreview
        v-for="g in newsLimited"
        title="Match Details:"
        :hostTeam="g.hometeam" 
        :guestTeam="g.awayteam" 
        :date="g.date" 
        :hour="g.time"
        :stadium="g.stadium"  
        :match_id="0"
        :key="g.date"></FutureGamePreview>
        <div v-if="newsLimited.length==0" style="transition-delay: 5s">No games in favorites</div>
    </div>
    <div v-else>
      <FutureGamePreview style="display: inline-block; padding: 20px 20px;"
      v-for="g in games"
      title="Match Details:"
      :hostTeam="g.hometeam" 
      :guestTeam="g.awayteam" 
      :date="g.date" 
      :hour="g.time"
      :stadium="g.stadium" 
      :match_id="0" 
      :key="g.date"></FutureGamePreview>
      <div v-if="games.length==0" style="transition-delay: 5s" >No games in favorites</div>
    </div>
  </div>
</template>


<script>
import FutureGamePreview from "./FutureGamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    FutureGamePreview
  }, 
  props: { num_of_fav: { require: true } },
  data() {
    return {
      games: []
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoritematches",
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  },
  computed: {
    newsLimited() {
        return this.games.slice(0, 3)
    }
}
};
</script>

<style></style>
