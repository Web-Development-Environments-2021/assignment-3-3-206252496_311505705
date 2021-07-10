<template>
  <!-- <div class="game-preview">
    <div :title="title" class="game-title">
      <b>{{title}}</b> 
    </div>
    <ul class="game-content">
      <li> host team: <router-link :to="{name:`teams`, params:{team_id:hostTeamID, team_name:hostTeam}}">{{ hostTeam }}</router-link></li>
      <li> guest team: <router-link :to="{name:`teams`, params:{team_id:guestTeamID, team_name:guestTeam}}">{{ guestTeam }}</router-link></li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> stadium: {{ stadium }}</li>
      <li> result: {{ result }}</li>
      <b-button @click="show=!show" style="background-color: #2f5d62" >Show events</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div v-if="show">
        <EventPreview 
        v-for="(g,index) in events"
        :date="g.date" 
        :time="g.time" 
        :gamemin="g.gamemin"
        :event="g.event"
        :count="index" 
        :key="g.gamemin"></EventPreview>
        </div>
    </ul>
  </div> -->
  
<div>
  <b-card style="max-width: 300px;display: inline">
    <b-card-body>
      <b-card-title>{{title}}</b-card-title>
      <!-- <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title> -->
      <b-card-text>
        <li> Host team: <router-link @click="play_host_id" :to="{name:`teams`, params:{team_id:parseInt(hostTeamID), team_name:hostTeam}}">{{ hostTeam }}</router-link></li>
        <li> Guest team: <router-link @click="play_guest_id" :to="{name:`teams`, params:{team_id:parseInt(guestTeamID), team_name:guestTeam}}">{{ guestTeam }}</router-link></li>
        <li> Date: {{ date }}</li>
        <li> Time: {{ hour }}</li>
        <li> Stadium: {{ stadium }}</li>
        <li> Result: {{ result }}</li>
      </b-card-text>
    </b-card-body>
    <EventPreview 
    v-for="(g,index) in events"
    :date="g.date" 
    :time="g.time" 
    :gamemin="g.gamemin"
    :event="g.event"
    :count="index" 
    :key="g.gamemin"></EventPreview>
  </b-card>
  <hr>
</div>
</template>


<script>
  import EventPreview from "../components/EventPreview";
export default {
  name: "PastGamePreview",
  components: {
    EventPreview
  },
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
      result: {
        type: String,
        required: true
      },
      events: {
        type: Array,
        required: true
      }
  }, 
    data() {
    return {
      hostTeamID: "939",
      guestTeamID: "939" ,
      show: false
    };
  },
  methods:{
    async host_id(host) {
      try {
        let name = host;
        const response = await this.axios.get(
          `http://localhost:3000/teams/searchTeam/${name}`,
        );
        this.hostTeamID = response.data[0].team_id;
      } catch (error) {
        console.log("error in update teams in search")
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
        console.log("error in update teams in search")
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
    console.log("Past game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
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
