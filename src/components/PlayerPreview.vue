<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <ul class="card-text">
      <li> full name: {{ name }}</li>
      <li> team name: {{ team_name }}</li>
      <li> position: {{ position }}</li>
      </ul>
      <a
        target="_blank"
        :href= "image"
        class="btn btn-primary"
        >Get more data</a
      >
    </div>
    <!-- <img
      :src="get_image(pok_name)"
      class="card-img-bottom"
      style="height: 200px; width: auto"
    /> -->
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
          position : 9
    };
   },
  methods: {
        async getPlayerDetails(){
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetailsById/${{player_id}}`,
        );
        // this.details = response;
          console.log("player :")
          console.log(response)
          this.name=response.data.name;
          this.team_name=response.date.team_name;
          this.Image=response.data.Image;
          this.position=response.data.position;

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