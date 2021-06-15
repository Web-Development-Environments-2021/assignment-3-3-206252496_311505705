<template>
<div>
    <div class="container">
  <center>
        <br/>
    <h1 class="title">{{team_name}}</h1>
    <img
      :src= "team_logo"
      class="card-img-bottom"
      style="height: 100px; width: auto; text-align: center"
    />
  </center>
    </div>
  <center>
    <br/>
    <br/>
    <b-button @click="showFuture" style="background-color: #907FA4" >Show Future Matches</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <b-button @click="showPast" style="background-color: #907FA4" >Show Past Matches</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <b-button @click="showPlayer" style="background-color: #907FA4" >Show Players</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <br/>
  </center>
    <hr>
    <br/>
        <div v-if="showplayer">
      <div v-if="players.length != 0">
        <PlayerSearch style="padding: 20px 20px; display: inline-block;"
        v-for="(g,index) in playersLimited"
        :name="g.name" 
        :team_name="g.team_name" 
        :image="g.image"
        :position="g.position.toString()"
        :player_id="g.player_id"    
        :key="index"></PlayerSearch>
      </div>
        </div>
      <div v-if="showpast">
      <div v-if="past.length != 0">
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
      <div v-if="showfuture">
      <div v-if="future.length != 0">
      <FutureGamePreview style="display: inline-block; padding: 20px 20px;"
        v-for="(g,index) in future"
        title="Match Details:"
        :hostTeam="g.hometeam" 
        :guestTeam="g.awayteam" 
        :date="g.date" 
        :hour="g.time"
        :stadium="g.stadium"  
        :match_id="0"
        :key="index"></FutureGamePreview>
      </div>
      </div>
  </div>
</template>


<script>  
  import PastGamePreview from "../components/PastGamePreview";
  import FutureGamePreview from "../components/FutureGamePreview";
  import PlayerSearch from "../components/PlayerSearch";
export default {
  name: "TeamPage",
  components: {
    PastGamePreview,
    FutureGamePreview,
    PlayerSearch
  },
  props: {
      team_id: {
        type: Number,
        required: true
      },
      team_name: {
        type: String,
        required: true
      }
    },
 data() {
    return {
      players:[],
      past:[],
      future:[],
      team_logo: "",
      showfuture: false,
      showpast: false,
      showplayer: false
    };
  },
  methods: {
        showFuture(){
      this.showfuture = true;
      this.showpast = false;
      this.showplayer = false;

    },
    showPast(){
      this.showfuture = false;
      this.showpast = true;
      this.showplayer = false;

    },
    showPlayer(){
      this.showfuture = false;
      this.showpast = false;
      this.showplayer = true;

    },
    async teamPage() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamFullDetails/${this.team_id}`,
        );
        //players
          const players = response.data.players;
          this.players = [];
          this.players.push(...players);
        //past games
          const past = response.data.past_games;
          this.past = [];
          this.past.push(...past);
        //future games
          const future = response.data.future_games;
          this.future = [];
          this.future.push(...future);
      } catch (error) {
        console.log("error in geting team details")
        console.log(error);
      }
    },
    async teamDetails() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/searchTeam/${this.team_name}`,
        );

        this.team_logo = response.data[0].team_logo;
      } catch (error) {
        console.log("error in update teams in search")
        console.log(error);
      }
    },
  },
    computed: {
    playersLimited() {
        return this.players.slice(0, 20)
    }
},
  mounted(){
    console.log("favorite games mounted");
    this.teamDetails(); 
    this.teamPage();

  },
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>