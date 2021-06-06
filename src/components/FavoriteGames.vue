<template>
  <div>
    <GamePreview
      v-for="g in games"
      title="Game Details:"
      :hostTeam="g.hometeam" 
      :guestTeam="g.awayteam" 
      :date="g.date" 
      :hour="g.time"
      :stadium="g.stadium"  
      :key="g.date"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: []
      // games: [
      //   {
      //     title: "Game Details:",
      //     hostTeam: "Maccabi Tel-Aviv",
      //     guestTeam: "Hapoel Beer-Sheva",
      //     date: "27/5/21",
      //     hour: "20:00",
      //     stadium: "Parken"
      //   },
      //   {
      //     title: "Game Details:",
      //     hostTeam: "Hapoel Tel-Aviv",
      //     guestTeam: "Maccabi Haifa",
      //     date: "29/5/21",
      //     hour: "20:00",
      //     stadium: "Parken"

      //   }
      // ]
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
  }
};
</script>

<style></style>
