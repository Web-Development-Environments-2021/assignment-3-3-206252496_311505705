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
    <b-button @click="showPast" style="background-color: #907FA4" >🡠 Show Past Matches</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <b-button @click="showPlayer" style="background-color: #907FA4" >Show Players</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <b-button @click="showFuture" style="background-color: #907FA4" >Show Future Matches 🡢</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <br/>
  </center>
  <hr>
  <br/>
    <div v-if="showfuture">
    <center>
      <h3 class="title" style="padding-bottom: 2%">Future Mathces</h3>
      <hr>
    </center>
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
      <div else>
        <center>
        <h4> No Future Matches</h4>
        </center>
      </div>
  </div>
  <div v-if="showplayer">
    <center>
    <h3 class="title" style="padding-bottom: 2%">Team's Players</h3>
    <hr>
    </center>
    <div v-if="players.length != 0">
      <center>
        <PlayerSearch style="padding: 20px 20px; display: inline-block;"
        v-for="(g,index) in playersLimited"
        :name="g.name" 
        :team_name="g.team_name" 
        :image="g.image"
        :position="g.position.toString()"
        :player_id="g.player_id"    
        :key="index"></PlayerSearch>
      </center>
    </div>
  </div>
  <div v-if="showpast">
    <center>
      <h3 class="title" style="padding-bottom: 2%">Past Mathces</h3>
      <hr>
    </center>
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
    <div else>
    <center>
    <h4> No Past Matches</h4>
    </center>
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
        type: [Number,String],
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
      if (this.team_id == '0') {
        this.splitID();
        this.splitName();
      }
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
      if (this.team_id == '0') {
        this.splitID();
        this.splitName();
      }
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
    splitID() {
      this.team_id = parseInt(this.team_name.split(' ')[0]);
    },
    splitName() {
      this.team_name = this.team_name.split(' ')[1];
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