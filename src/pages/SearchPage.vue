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
            <!-- <mdb-datatable
            :data="players_data"
            striped
            bordered
            fixed
            /> -->
        <b-row>
          <b-col sm="3" md="4" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-input v-model="filter" placeholder="Filter table.."></b-input>
          </b-col>
          <b-col sm="3" md="4" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
        <hr/>
        <b-table :fields="players_data.columns" :items="players_data.rows" :striped="true" :filter="filter" :current-page="currentPage"
          :per-page="perPage" sort-icon-left>
            <template #cell(id)="data">
              <router-link :to="{name:`players`, params:{player_id:parseInt(data.value)}}">&#127760;</router-link>
            </template>
        </b-table>
        <hr>
      </div>
      <div v-else-if="search">
        <h3>Your search did not match any Player. </h3>
      </div>
      <br/>
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
    <div v-if="isTeam">
      <div v-if="teams.length != 0">
        <!-- <mdb-datatable 
        :data="teams_data"
        striped
        bordered
        fixed
        /> -->
        <b-row>
          <b-col sm="3" md="4" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-input v-model="filter" placeholder="Filter table.."></b-input>
          </b-col>
          <b-col sm="3" md="4" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
        <hr/>
        <b-table :fields="teams_data.columns" :items="teams_data.rows" :striped="true" :current-page="currentPage"
          :per-page="perPage" sort-icon-left>
          <template #cell(team_details)="data">
              <!-- `data.value` is the value after formatted by the Formatter -->
                <!--{{data.value}}
              {{"*****"}}
              {{"####"}}
              1 = {{data.value.split(" ")[0]}}
              2 = {{data.value.split(" ")[1]}} -->
              <!-- <a :href="`#${'/team/'+data.value.replace(/\D/g, '')}`">{{ data.value.split(' ')[1] }}</a> -->
              <!-- <a :href="$router.resolve({name:`teams`, params:{team_id:parseInt(data.value.split(' ')[0]), team_name:data.value.split(' ')[1]}}).href">{{ data.value.split(' ')[1] }}</a> -->
              <!-- <a :href="$router.resolve({name:`teams`, params:{team_id:data.value, team_name:data.value}}).href">{{ data.value.split(' ')[1] }}</a> -->
              <!-- <router-link :to="{name:`teams`, params:{team_id:parseInt(data.value), team_name:data.value}}">{{ data.value.split(' ')[1] }}</router-link> -->
              <router-link :to="{name:`teams`, params:{team_id:'0', team_name:data.value}}">&#127760;</router-link>
          </template>
        </b-table>
        <hr>
      </div>
      <div v-else-if="search">
        <h3> Your search did not match any Team. </h3>
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
  import {BTable, BPagination } from 'bootstrap-vue';
  // import { mdbDatatable} from 'mdbvue';
  import TeamSearch from "../components/TeamSearch";
  import PlayerSearch from "../components/PlayerSearch";
export default {
  name: "Search",
  components: {
    PlayerSearch,
    TeamSearch,
    // mdbDatatable,
    BTable,
    BPagination

  },
 data() {
    return {
      searchQuery:"",
      players:[],
      teams:[],
      only_team_name:"",
      isPlayer: false,
      isTeam: false,
      search: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      filter: '',
      players_data: {
      columns: [
            {
              label: 'Full Name',
              key: 'name',
              sortable: true
            },
            {
              label: 'Team Name',
              key: 'team_name',
              sortable: true
            },
            {
              label: 'Position',
              key: 'position',
              sortable: true
            },
            {
              label: 'Link to Player Page',
              key: 'id',
              formatter: 'playerID',
            },
          ],
          rows: []
      },
      teams_data: {
      columns: [
            {
              label: 'Team Name',
              key: 'only_team_name',
              sortable: true
            },
            {
              label: 'Link to Team Page',
              key: 'team_details',
              formatter: 'teamNameID',
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
      this.$root.store.lastSearchQuery(this.searchQuery);
      this.$root.store.searchTeam(this.isTeam);
      this.$root.store.searchPlayer(this.isPlayer);

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
              team_details: {
                team_id: element.team_id,
                team_name: element.team_name
              },
              only_team_name: element.team_name
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
              id: element.player_id,
              team_name: element.team_name,
              position: element.position,
            }
            this.players_data.rows.push(rows);
          });
          this.totalRows = this.players_data.rows.length;
      } catch (error) {
        console.log("error in update players search")
        console.log(error);
      }
    },
    playerID(value) {
      return `${value}`
    },
    teamNameID(value) {
      return `${value.team_id} ${value.team_name}`
    },
  },
    computed: {
    playersLimited() {
        return this.players.slice(0, 20)
    },
    teamsLimited() {
        return this.teams.slice(0, 20)
    },
    playersRows() {
        return this.players_data.rows.length
    },
    teamRows() {
        return this.teams_data.rows.length
    },
},
mounted(){
  this.isPlayer=this.$root.store.search_player;
  this.isTeam=this.$root.store.search_team;
  this.searchQuery=this.$root.store.searchquery;
  this.Search()
}
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>