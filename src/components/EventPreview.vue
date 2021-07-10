<template>
  <!-- <div class="game-preview">
  <b-card style="width: 226px; height:180px display: inline-block">
    <b-card-body>
      <b-card-title>Event {{isCount}}:</b-card-title>
      <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
      <b-card-text style="  text-align: left;">
      <li> date: {{ date }}</li>
      <li> time: {{ time }}</li>
      <li> gamemin: {{ gamemin }}</li>
      <li> event: {{ event }}</li>
      </b-card-text>
    </b-card-body>

  </b-card>
  </div> -->
  <div class="game-preview" style="width: 240px; height:180px; border-color:#2c3e50; ">
    <div class="game-title" style="color:  #907FA4;">
                <br/>
      <b>Event {{isCount}}:</b> 
    </div>
    <ul class="game-content" style="padding-top: 5%">
      <li> Date: {{ date }}</li>
      <li> Time: {{ time }}</li>
      <li> Game Minute: {{ gamemin }}</li>
      <li> Event: {{ event }}</li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "EventPreview",
  props: {
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      gamemin: {
        type: String,
        required: true
      },
      event: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
  }, 
    data() {
    return {
      isCount: this.count+1
    };
  },
  mounted(){
    console.log("Event preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  max-width: 20rem;
  width: 50px;
  height: 50px;
  position:fixed;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 5px;
  border-width: 5px;
  border-color:#2c3e50;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  #907FA4;
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
