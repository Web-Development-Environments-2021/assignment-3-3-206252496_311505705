<template>
  <div class="container">
          <br/>
      <br/>

    <h1 class="title">About</h1>
          <br/>
  <div>
      <b-card title="Hello!"  style="max-width: 62rem;">
        <b-card-text>We are Ori Ben-Artzy and Mor Zweig.</b-card-text>
        <b-card-text>We are 3rd year students at ”Ben-Gurion” University.</b-card-text>
        <b-card-text>Studing Software and Information Systems Engineering.</b-card-text>
          <br/>
        <b-card-text>You are welcome to look over our API:</b-card-text>
                <a
        target="_blank"
        href="https://app.swaggerhub.com/apis-docs/OriMor/SUPERLIGA_API/1.0.0"
        class="btn btn-primary"
        style="background-color:#D4CDF4; color: #7A6F9B; border-color:#7A6F9B"
        >Go to our API!</a>
        <br/>
        </b-card>
        <br/>
        <br/>

        <!-- ORI WEBSITE -->
       <b-card
        title="Ori's website"
        img-src="https://res.cloudinary.com/dwg8ravkv/image/upload/v1623664419/avi_hfuxiw.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; display: inline-block;"
        class="mb-2"
      >
        <b-card-text>
        The website presents the life of Avshalom Shohat.
        <center>
        <br/>
        <a
        target="_blank"
        href="https://web-development-environments-2021.github.io/206252496/"
        class="btn btn-primary"
        style="background-color:#D4CDF4; color: #7A6F9B; border-color:#7A6F9B"
        >Go to the website</a>
        </center>
        </b-card-text>
      </b-card>

    <!-- PACMAN -->
     <b-card
        title="Pacman"
        img-src="https://res.cloudinary.com/dwg8ravkv/image/upload/v1623665268/big_pac_tgt6lg.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; display: inline-block;"
        class="mb-2"
      >
        <b-card-text>
          We developed a Pacman game using JavaScript and HTML.
        <center>
         <br/>
        <a
        target="_blank"
        href=" https://web-development-environments-2021.github.io/Assignment2_311505705_206252496/"
        class="btn btn-primary"
        style="background-color:#D4CDF4; color: #7A6F9B; border-color:#7A6F9B; hight:15px"
        >Go to our pacman game</a>
        </center>
        </b-card-text>
      </b-card>
      <!-- MOR WEBSITE -->
       <b-card
        title="Mor's website"
        img-src="https://res.cloudinary.com/dwg8ravkv/image/upload/v1623664394/sabina_k1oj1m.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 21rem; display: inline-block;"
        class="mb-2"
      >
        <b-card-text>
          The website presents the life of Sabina Hoffman.
         <br/>
         <center>
        <br/>
        <a
        target="_blank"
        href=" https://web-development-environments-2021.github.io/311505705/"
        class="btn btn-primary"
        style="background-color:#D4CDF4; color: #7A6F9B; border-color:#7A6F9B"
        >Go to the website</a>
          </center>

        </b-card-text>
      </b-card>
  </div>
  </div>
</template>


<script>

export default {
    data() {
      return {
        show: false
      }
    }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
