<template>
  <div class="info">
    <div class="cardPlayer" style="width: 1000px;">
      <div class="card-body" >
        <h5 class="card-title" style="text-align: center; font-size:190%">{{ name }}</h5>
        <p class="card-text" style="text-align: left; font-size:130%">
        <br/>
        Team Name: {{ team_name }}
        <br/>
        Position: {{ position }}
        <br/>
        Common Name: {{commonname}}    
        <br/>
        Nationality: {{nationality}}
        <br/>
        Birthdate: {{birthdate}}
        <br/>
        Birth Place: {{birthplace}}
        <br/>
        Height:{{height}}
        <br/>
        Weight:{{weight}}
        </p>
      </div>
      <center>
        <img
          :src= "image"
          class="card-img-right"
        />
      </center>
      </div>
  </div>
</template>


<script>
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
};
</script>

<style>
/* .card {
  width: 12rem;
  display: inline-block;
  margin: 6px;
} */

.cardPlayer {
  background-color:  #BCC8A5;
  display: inline-block;
  width: 600px;
  height: 570px;
  position:fixed;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 5px;
  border-width: 5px;
  border-color:#2c3e50;
}

.card-img-right{
  background-color:  white;
  display:inline-block;
  margin: 10px 10px;
  /* padding-left: 70%; */
    border-style: solid;
  border-radius: 5px;
  border-width: 5px;
  border-color:#2c3e50;
}
</style>