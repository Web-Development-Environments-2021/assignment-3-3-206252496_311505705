<template>
  <div class="game-preview">
    <div class="game-title">
      <b>Event {{count}}:</b> 
    </div>
    <ul class="game-content">
      <li> date: {{ date }}</li>
      <li> time: {{ time }}</li>
      <li> gamemin: {{ gamemin }}</li>
      <li> event: {{ event }}</li>
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
  //   data() {
  //   return {
  //     count: 0
  //   };
  // },
  mounted(){
    console.log("Event preview mounted")
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
