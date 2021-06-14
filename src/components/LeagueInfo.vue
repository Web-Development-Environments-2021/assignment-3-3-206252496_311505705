<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
      </b-card-text>
    </b-card>
    <br/>
    <br/>
    <br/>
    <br/>

    <FutureGamePreview 
      title= "Next Match Details:"
    :hostTeam= "hostTeam"
    :guestTeam= "guestTeam" 
    :date= "date" 
    :hour= "hour" 
    :stadium= "stadium" 
    :match_id= 0
    :key="555"></FutureGamePreview>
  </div>
</template>


<script>
import FutureGamePreview from "./FutureGamePreview.vue";
export default {
  name: "LeagueInfo",
  components: {
    FutureGamePreview
  },  data() {
    return {
      leagueName: "superliga", 
      season: "season", 
      stage: "stage",
      hostTeam: "hostTeam",
      guestTeam: "guestTeam" ,
      date: "date" ,
      hour: "hour" ,
      stadium: "stadium" ,
      match_id: "match_id"
    };
  },
    methods: {
    async getLeagueDetails(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        // this.details = response;
        this.leagueName = response.data.league_name
        this.season = response.data.current_season_name
        this.stage = response.data.current_stage_name
        this.hostTeam = response.data.nextgame.hometeam
        this.guestTeam = response.data.nextgame.awayteam
        this.date = response.data.nextgame.date
        this.hour = response.data.nextgame.time
        this.stadium = response.data.nextgame.stadium
        this.match_id = response.data.nextgame.match_id
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("League details mounted");
    this.getLeagueDetails(); 
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 218px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>