<template>
<div>
    <h1 class="title">Games Page</h1>
    <br/>
      <div v-if="past.length != 0">
      <PastGamePreview
        v-for="(g,index) in past"
        title="Past Game Details:"
        :hostTeam="g.hometeam" 
        :guestTeam="g.awayteam" 
        :date="g.date" 
        :hour="g.time"
        :stadium="g.stadium"  
        :result="g.result"  
        :events="g.events"  
        :key="index"></PastGamePreview>
      </div>
      <br/>
      <br/>
      <div v-if="future.length != 0">
      <FutureGamePreview
        v-for="(g,index) in future"
        title="Future Game Details:"
        :hostTeam="g.hometeam" 
        :guestTeam="g.awayteam" 
        :date="g.date" 
        :hour="g.time"
        :stadium="g.stadium"  
        :match_id="g.match_id"
        :key="index"></FutureGamePreview>
      </div>
  </div>
</template>


<script>  
  import PastGamePreview from "../components/PastGamePreview";
  import FutureGamePreview from "../components/FutureGamePreview";
export default {
  name: "GamesPage",
  components: {
    PastGamePreview,
    FutureGamePreview,
  },
 data() {
    return {
      past:[],
      future:[]
    };
  },
  methods: {
    async pastGames() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/matches/pastGames`,
        );
        //past games
          const past = response.data;
          this.past = [];
          this.past.push(...past);
      } catch (error) {
        console.log("error in geting past games")
        console.log(error);
      }
    },
  async futureGames() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/matches/futureGames`,
        );
        //future games
          const future = response.data;
          this.future = [];
          this.future.push(...future);
      } catch (error) {
        console.log("error in geting future games")
        console.log(error);
      }
    }
  },
  mounted(){
    console.log("games page mounted");
    this.pastGames(); 
    this.futureGames(); 

  },
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>