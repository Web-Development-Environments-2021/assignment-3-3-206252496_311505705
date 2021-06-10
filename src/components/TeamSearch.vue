<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
        <h5 class="card-title" style="text-align: center">{{ team_name }}</h5>
    </div>
    <center>
    <a
        target="_blank"
        :href="`https://www.pokemon.com/us/pokedex/`"
        class="btn btn-primary"
        >Go to teams page</a
      >
    <img
      :src= "team_logo"
      class="card-img-bottom"
      style="height: 100px; width: auto; text-align: center"
    />
    </center>

  </div>
</template>


<script>
// import Pokemon from "pokemon-images";

export default {
  name: "TeamSearch",
  props: {
      team_name: {
        type: String,
        required: true
      },
      team_logo: {
        type: String,
        required: true
      },
      team_id: {
        type: Number,
        required: true
      },
  },
   data() {
    return {
          
    };
   },
};
</script>

<style>
.card {
  width: 12rem;
  display: inline-block;
  margin: 6px;
}
</style>