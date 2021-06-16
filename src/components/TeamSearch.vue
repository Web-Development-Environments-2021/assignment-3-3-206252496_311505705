<template>
  <div>
    <b-card style="width: 300px; height:250px; display: inline-block">
      <div class="card-body">
          <h5 class="card-title" style="text-align: center">{{ team_name }}</h5>
      </div>
      <center>
        <img
          :src= "team_logo"
          class="card-img-bottom"
          style="height: 100px; width: auto; text-align: center"
        />
        <br/>
        <router-link :to="{name:`teams`, params:{team_id:parseInt(team_id), team_name:team_name}}">Go to team's page</router-link>
      </center>
    </b-card>
  </div>
</template>


<script>
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
        type: String,
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