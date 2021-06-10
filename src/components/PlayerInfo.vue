<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title" style="text-align: center">{{ name }}</h5>
      <p class="card-text">
      <br/>
      Team Name: {{ team_name }}
      <br/>
      Position: {{ position }}
      <br/>
      commonname: {{commonname}},     
       <br/>
      nationality: {{nationality}},
      <br/>
      birthdate: {{birthdate}},
      <br/>
      birthplace: {{birthplace}},
      <br/>
      height:{{height}},
      <br/>
      weight:{{weight}}
      </p>
    </div>
        <center>
    <img
      :src= "image"
      class="card-img-bottom"
      style="height: 100px; width: auto; text-align: center"
    />
        </center>

  </div>
</template>


<script>
// import Pokemon from "pokemon-images";

export default {
  name: "playerInfo",
  props: { player_id: { require: true } },
   data() {
    return {
          name : "",
          team_name: "",
          image: "",
          position : 0,
          commonname: "",
          nationality: "",
          birthdate: "",
          birthplace: "",
          height:"",
          weight:""
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
          this.commonname=response.data.commonname,
          this.nationality=response.data.nationality,
          this.birthdate=response.data.birthdate,
          this.birthplace=response.data.birthplace,
          this.height=response.data.height,
          this.weight=response.data.weight

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
  width: 12rem;
  display: inline-block;
  margin: 6px;
}
</style>