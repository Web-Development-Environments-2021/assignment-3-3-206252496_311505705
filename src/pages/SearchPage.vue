<template>
<div>
      <div class="container">
      <br/>
    <h1 class="title">Search Page</h1>
      </div>
    <hr>
    <br/>
      <center>
        <h4 style="padding: 0px 20px;"> What would you like to search:</h4>
            <b-button @click="showTeams" style="background-color: #907FA4" >Teams</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <b-button  @click="showPlayers"  style="background-color: #907FA4" >Players</b-button>
      </center>
    <br/>
      <center>
        <b-input-group prepend="Search Query:" id="search-input" style="text-align: center">
          <b-form-input v-model="searchQuery"></b-form-input>
          <b-input-group-append>
              <div class="container">
            <b-button style="background-color:#2c3e50" :disabled='isTeam == isPlayer' @click="Search">Search</b-button>
              </div>
          </b-input-group-append>
        </b-input-group>
      </center>
      <br/>
      <hr>
      <!-- Your search Query: {{ searchQuery }} -->
      <br/>
      <div v-if="isPlayer">
      <div v-if="players.length != 0">
            <mdb-datatable
            :data="players_data"
            striped
            bordered
            fixed
            />
      </div>
      <div v-else-if="search">
        Your search did not match any Player. 
      </div>
      <br/>
        <PlayerSearch style="padding: 20px 20px; display: inline-block;"
        v-for="(g,index) in playersLimited"
        :name="g.name" 
        :team_name="g.team_name" 
        :image="g.image"
        :position="g.position.toString()"
        :player_id="g.player_id"    
        :key="index"></PlayerSearch>
    </div>
      <div v-if="isTeam">
      <div v-if="teams.length != 0">
        <mdb-datatable 
        :data="teams_data"
        striped
        bordered
        fixed
        />

      </div>
      <div v-else-if="search">
        Your search did not match any Team. 
      </div>
        <br/>
        <TeamSearch style="padding: 20px 20px; display: inline-block;"
        v-for="g in teamsLimited"
        :team_name="g.team_name" 
        :team_logo="g.team_logo" 
        :team_id="g.team_id.toString()"    
        :key="g.team_name"></TeamSearch>
      </div>
  </div>
</template>


<script>  
  import { mdbDatatable} from 'mdbvue';
  import TeamSearch from "../components/TeamSearch";
  import PlayerSearch from "../components/PlayerSearch";
export default {
  name: "Search",
  components: {
    PlayerSearch,
    TeamSearch,
    mdbDatatable,
  },
 data() {
    return {
      searchQuery:"",
      players:[],
      teams:[],
      isPlayer: false,
      isTeam: false,
      search: false,
      players_data: {
      columns: [
            {
              label: 'name ⇅',
              field: 'name',
              sort: 'asc'
            },
            {
              label: 'team_name ⇅',
              field: 'team_name',
              sort: 'asc'
            },
            {
              label: 'position ⇅',
              field: 'position',
              sort: 'asc'
            }
          ],
          rows: []
      },
      teams_data: {
      columns: [
            {
              label: 'team_name ⇅',
              field: 'team_name',
              sort: 'asc'
            },
            {
              label: 'team_page ⇅',
              field: 'team_page',
              sort: 'asc'
            },
          ],
          rows: []
      }
    };
  },
  methods: {
    showPlayers(){
      this.isPlayer = true;
      this.isTeam = false;
      this.search = false;
    },
    showTeams(){
      this.isTeam = true;
      this.isPlayer = false;
      this.search = false;
    },
    async Search() {
      if (this.isPlayer){
        this.Players()
      }
      else{
        this.Teams()
      }
    },
    async Teams() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/searchTeam/${this.searchQuery}`,
        );
        this.search = true;
        const teams = response.data;
        this.teams = [];
        this.teams.push(...teams);
        this.teams_data.rows = [];
          response.data.forEach(element => {
            const rows = {
            team_name: element.team_name
            }
            this.teams_data.rows.push(rows);
          }); 
      } catch (error) {
        console.log("error in update teams in search")
        console.log(error);
      }
    },
    async Players() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetailsByName/${this.searchQuery}`,
        );
          this.search = true;
          const players = response.data;
          this.players = [];
          this.players.push(...players);
          this.players_data.rows = [];
          response.data.forEach(element => {
          if (element.position == undefined ||  element.position == null || element.position == "undefined"){
              element.position = "No position"
            }
            const rows = {
            name: element.name,
            team_name: element.team_name,
            position: element.position,
            }
            this.players_data.rows.push(rows);
          }); 
      } catch (error) {
        console.log("error in update players search")
        console.log(error);
      }
    }
  },
    computed: {
    playersLimited() {
        return this.players.slice(0, 20)
    },
    teamsLimited() {
        return this.teams.slice(0, 20)
    }
}
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>