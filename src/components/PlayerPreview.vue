<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <ul class="card-text">
      <li> full name: {{ name }}</li>
      <li> team name: {{ team_name }}</li>
      <li> position: {{ position }}</li>
      </ul>
    </div>
    <img
      :src= "image"
      class="card-img-bottom"
      style="height: 200px; width: auto;text-align: center"
    />
  </div>
</template>

<script>
// import Pokemon from "pokemon-images";

export default {
  name: "playerPreview",
  props: { player_id: { require: true } },
   data() {
    return {
          name : "ori",
          team_name: "mor",
          image: "http",
          position : 3
    };
   },
  methods: {
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
    this.getPlayerDetails(); 
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
  width: 18rem;
  display: inline-block;
  margin: 10px;
}
</style>