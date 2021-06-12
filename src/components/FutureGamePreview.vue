<template>
  <div class="game-preview">
    <div :title="title" class="game-title">
      <b>{{title}}</b> 
    </div>
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> stadium: {{ stadium }}</li>
    </ul>
    <a
        target="_blank"
        @click="addToFavorite"
        class="btn btn-primary"
        >Add to fatorites</a
      >
  </div>
</template>


<script>
export default {
  name: "FutureGamePreview",
  props: {
      title: {
        type: String,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      stadium: {
        type: String,
        required: true
      },
      match_id: {
        type: Number,
        required: true
      }
  }, 
  methods: {
    async addToFavorite() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/favoritematches",
          {
            match_id: this.match_id,
          }
        );
        this.$root.toast("Favorites", "Game was added successfully", "success");

      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    },
  },
  mounted(){
    console.log("Future game preview mounted")
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
