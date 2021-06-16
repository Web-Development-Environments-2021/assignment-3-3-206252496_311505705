<template>
  <div>
    <b-card class="playerCard" style="width: 350px; height:300px; display: inline-block">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">
          <br/>
          Team Name: {{ team_name }}
          <br/>
          Position: {{ position }}
          <br/>
        </p>
      </div>
      <center>
        <router-link :to="{name:`players`, params:{player_id:player_id}}">Go to player's page</router-link>
        <img
          :src= "image"
          class="card-img-bottom"
          style="height: 100px; width: auto; text-align: center"
        />
      </center>
    </b-card>
  </div>
</template>


<script>
export default {
  name: "PlayerSearch",
props: {
      name: {
        type: String,
        required: true
      },
      team_name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      player_id: {
        type: Number,
        required: true
      },
},
     data() {
    return {};
   },
  methods: {
    onClickButton (event) {
      console.log("***********************")
      this.$emit('clicked', this.player_id)
    },
        async getPlayerDetails(){
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetailsById/${this.player_id}`,
        );
          this.name=response.data.name;
          this.team_name=response.data.team_name;
          this.position=response.data.position;
          this.image=response.data.image;

      } catch (error) {
        console.log("error in geting players details")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("Player details mounted");
  }
};
</script>

<style>
.card {
  width: 12rem;
  display: inline-block;
  margin: 6px;
}

.playerCard{
  top: 50px;
  bottom: 5px;
  text-align: center;
  display: inline-block;
  width: 350px;
  height: 840px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:#2c3e50;
}
</style>