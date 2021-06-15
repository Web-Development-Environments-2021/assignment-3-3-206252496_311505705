<template>
  <!-- <div class="card" style="width: 18rem; display: inline-block"> -->
    <div>
      <b-card style="width: 350px; height:300px; display: inline-block">
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
// import Pokemon from "pokemon-images";

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
    return {
    };
   },
  // watch:{
  //       player_id: function (val) {
  //           this.PlayerPage()
  //       }
  //   },
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
        // this.details = response;
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
    // this.getPlayerDetails(); 
  }
    // get_image(pok_name) {
    //   try {
    //     return Pokemon.getSprite(pok_name);
    //   } catch (err) {
    //     return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png";
    //   }
    // },
  // },
};
</script>

<style>
.card {
  width: 12rem;
  display: inline-block;
  margin: 6px;
}
/* .card-body{
  height:500px;
} */
</style>