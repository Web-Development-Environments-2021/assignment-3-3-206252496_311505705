<template>
<div>
  <div class="Games">
    <div class="container">
      <br/>
      <h1 class="title">Matches Page</h1>
    </div>
    <center>
      <b-button @click="showPast" style="background-color: #907FA4" >🡠 Show Past Matches</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <b-button @click="showFuture" style="background-color: #907FA4" >Show Future Matches 🡢</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </center>
    <hr>
    <div v-if="showfuture" class="component">
      <div v-if="future.length != 0">
        <center>
          <h3 class="title">Future Matches</h3>
          <hr>
        </center>
        <FutureGamePreview style="display: inline-block; padding: 20px 20px;"
          v-for="(g,index) in future"
          title="Match Details:"
          :hostTeam="g.hometeam" 
          :guestTeam="g.awayteam" 
          :date="g.date" 
          :hour="g.time"
          :stadium="g.stadium"  
          :match_id="g.match_id"
          :key="index"></FutureGamePreview>
      </div>
    </div>
    <div v-if="showpast">
      <div v-if="past.length != 0">
        <center>
          <h3 class="title">Past Matches</h3>
          <hr>
        </center>
        <PastGamePreview
          v-for="(g,index) in past"
          title="Match Details:"
          :hostTeam="g.hometeam" 
          :guestTeam="g.awayteam" 
          :date="g.date" 
          :hour="g.time"
          :stadium="g.stadium"  
          :result="g.result"  
          :events="g.events"  
          :key="index"></PastGamePreview>
      </div>
    </div>
  </div>
</div>
</template>


<script>  
import PastGamePreview from "../components/PastGamePreview";
import FutureGamePreview from "../components/FutureGamePreview";
export default {
  name: "MatchPage",
  components: {
    PastGamePreview,
    FutureGamePreview
  },
 data() {
    return {
      past:[],
      future:[],
      showfuture: false,
      showpast: false
    };
  },
  methods: {
    showFuture(){
      this.showfuture = true;
      this.showpast = false;
    },
    showPast(){
      this.showfuture = false;
      this.showpast = true;
    },
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