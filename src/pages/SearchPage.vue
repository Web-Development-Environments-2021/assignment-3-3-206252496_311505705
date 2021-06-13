<template>
<div>
    <h1 class="title">Search Page</h1>
    <br/>
      <center>
            <b-button @click="isTeam=!isTeam" style="background: #2f5d62" >Teams</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <b-button  @click="isPlayer=!isPlayer" style="background: #2f5d62" >Players</b-button>
        <!-- <p-radio class="p-switch" name="switch1" color="success">Summer</p-radio>

        <p-radio class="p-switch p-fill" name="switch1" color="success">Winter</p-radio>

        <p-radio class="p-switch p-slim" name="switch1" color="success">Fall</p-radio> -->
      </center>
    <br/>
      <center>
        <b-input-group prepend="Search Query:" id="search-input" style="text-align: center">
          <b-form-input v-model="searchQuery"></b-form-input>
          <b-input-group-append>
            <b-button variant= "success" @click="Search">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </center>


      <br/>
      Your search Query: {{ searchQuery }}
      <br/>
      
      <div v-if="isPlayer">
        <PlayerSearch 
        v-for="(g,index) in playersLimited"
        :name="g.name" 
        :team_name="g.team_name" 
        :image="g.image"
        :position="g.position"
        :player_id="g.player_id"    
        :key="index"></PlayerSearch>
      </div>
      <div v-if="isTeam">
        <TeamSearch 
        v-for="g in teamsLimited"
        :team_name="g.team_name" 
        :team_logo="g.team_logo" 
        :team_id="g.team_id"    
        :key="g.team_name"></TeamSearch>
      </div>
            <div v-if="players.length != 0">
            <mdb-datatable 
            :data="players_data"
            striped
            bordered
            fixed
            />
      <br/>
      <br/>
      </div>
  </div>
</template>


<script>  
  import { mdbDatatable } from 'mdbvue';
  import TeamSearch from "../components/TeamSearch";
  import PlayerSearch from "../components/PlayerSearch";
export default {
  name: "Search",
  components: {
    PlayerSearch,
    TeamSearch,
    mdbDatatable
  },
 data() {
    return {
      searchQuery:"",
      players:[],
      teams:[],
      isPlayer: false,
      isTeam: false,
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
          ],
          rows: []
      }
    };
  },
  methods: {
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
        const teams = response.data;
        this.teams = [];
        this.teams.push(...teams);
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
          const players = response.data;
          this.players = [];
          this.players.push(...players);
          this.players_data.rows = [];
          response.data.forEach(element => {
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