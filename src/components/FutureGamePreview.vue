<template>
  <!-- <div class="game-preview">
    <div :title="title" class="game-title">
      <b>{{title}}</b> 
    </div>
    <ul class="game-content">
      <li> host team: <router-link  :to="{name:`teams`, params:{team_id:hostTeamID, team_name:hostTeam}}">{{ hostTeam }}</router-link></li>
      <li> guest team: <router-link  :to="{name:`teams`, params:{team_id:guestTeamID, team_name:guestTeam}}">{{ guestTeam }}</router-link></li>
      <a :href="$router.resolve({name:`teams`, params:{team_id:parseInt(hostTeamID), team_name:hostTeam}}).href">link1</a>
      <a :href="$router.resolve({name:`teams`, params:{team_id:parseInt(guestTeamID), team_name:guestTeam}}).href">link2</a>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> stadium: {{ stadium }}</li>
    </ul>
    <div v-if="match_id != 0 && $root.store.username">
    <a
        target="_blank"
        @click="addToFavorite"
        class="btn btn-primary"
        >Add to fatorites</a
      >
    </div>
  </div> -->
  <div>
  <b-card style="width: 300px; display: inline-block">
    <b-card-body>
      <b-card-title>{{title}}</b-card-title>
      <!-- <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title> -->
      <b-card-text style="  text-align: left;">
      <li> host team: <router-link @click="play_host_id" :to="{name:`teams`, params:{team_id:parseInt(hostTeamID), team_name:hostTeam}}">{{ hostTeam }}</router-link></li>
      <li> guest team: <router-link @click="play_guest_id" :to="{name:`teams`, params:{team_id:parseInt(guestTeamID), team_name:guestTeam}}">{{ guestTeam }}</router-link></li>
      <!-- <a :href="$router.resolve({name:`teams`, params:{team_id:parseInt(hostTeamID), team_name:hostTeam}}).href">link1</a>
      <a :href="$router.resolve({name:`teams`, params:{team_id:parseInt(guestTeamID), team_name:guestTeam}}).href">link2</a> -->
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> stadium: {{ stadium }}</li>
      </b-card-text>
    </b-card-body>

      <center>
        <div v-if="match_id != 0 && $root.store.username">
            <b-card-footer>
          <a  target="_blank"
              @click="addToFavorite"
              class="btn btn-primary"
              style="background-color: #907FA4; border-color:#7A6F9B"
              >Add to fatorites &#11088;</a>
            </b-card-footer>

        </div>
      </center>
  </b-card>
  </div>
</template>


<script>
export default {
  name: "FutureGamePreview",
  props: {
      title: {
        type: String,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      stadium: {
        type: String,
        required: true
      },
      match_id: {
        type: Number,
        required: true
      }
  }, 
  data() {
    return {
      hostTeamID: "939",
      guestTeamID: "939" 
    };
  },
  methods: {
    async addToFavorite() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/favoritematches",
          {
            match_id: this.match_id,
          }
        );
        this.$root.toast("Favorites", "The game was added successfully", "success");

      } catch (error) {
        this.$root.toast("Favorites", "The game is already in your favorites","danger");
        console.log("error in update games")
        console.log(error);
      }
    },
    async host_id(host) {
      try {
        let name = host;
        const response = await this.axios.get(
          `http://localhost:3000/teams/searchTeam/${name}`,
        );
        this.hostTeamID = response.data[0].team_id;
      } catch (error) {
        console.log("error in future game preview - getting host_id")
        console.log(error);
      }
    },
    async guest_id(guest) {
      try {
        let name = guest;
        const response = await this.axios.get(
          `http://localhost:3000/teams/searchTeam/${name}`,
        );
        this.guestTeamID = response.data[0].team_id;
      } catch (error) {
        console.log("error in future game preview - getting guest_id")
        console.log(error);
      }
    },
    play_host_id(){
      this.host_id(this.hostTeam);
    },
    play_guest_id(){
      this.guest_id(this.guestTeam)
    },
  },
  mounted(){
    console.log("Future game preview mounted")
    // this.host_id(this.hostTeam);
    // this.guest_id(this.guestTeam)
  },
  // computed:{
  //    refresh() {
  //     return this.$router.go(this.$router.currentRoute)
  //   }
// },
};
</script>

<style>
.game-preview {
  display: inline-block;
  /* width: 250px;
  height: 200px; */
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
