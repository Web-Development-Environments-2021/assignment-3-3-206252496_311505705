<template>
<div>
  <div class="container" :key="componentKey">
    <br/>
    <br/>
    <h1 class="title">About</h1>
    <br/>
    <div>
      <!-- API -->
    <b-card title="Hello!"  class="api" >
      <b-card-text>We are Ori Ben-Artzy and Mor Zweig.</b-card-text>
      <b-card-text>We are 3rd year students at ”Ben-Gurion” University.</b-card-text>
      <b-card-text>Studing Software and Information Systems Engineering.</b-card-text>
      <br/>
      <b-card-text>You are welcome to look over our API:</b-card-text>
      <a
        target="_blank"
        href="https://app.swaggerhub.com/apis-docs/OriMor/SUPERLIGA_API/1.0.0"
        class="btn btn-primary"
        style="background-color:#907FA4; color: white; border-color:#7A6F9B"
        >Go to our API</a>
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
          style="background-color:#907FA4; color: white; border-color:#7A6F9B"
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
            style="background-color: #907FA4; color: white; border-color:#7A6F9B; hight:15px"
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
          style="background-color:#907FA4; color: white; border-color:#7A6F9B"
          >Go to the website</a>
          </center>
        </b-card-text>
      </b-card>
      </div>
      </div>
      <footer>
      <hr>
      <center>
        <h4 id="details">To contact us, please leave a message:</h4>
        <br/>
        <form action="mailto:orikiba@gmail.com" method="post" enctype="text/plain">
            E-mail Address:<br>
            <input type="text" name="Email "><br>
            Message:<br>
            <input type="text" name="Message " size="50"><br><br>
            <input id="buttonForm" type="submit" value="Send">
            <input id="buttonForm" type="reset" value="Reset">
          <br/>
          <br/>
        </form>
      </center>
		</footer>
  </div>
</template>


<script>

export default {
    data() {
      return {}
    },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.mb-2{
  width: 21rem;
   display: inline-block;
}
.api{
  width: 62rem;
}
#buttonForm{
	background-color: #8585ad;
	border: none;
	color: white;
	padding: 8px 16px;
	text-align: center;
	font-size: 17px;
	margin: 4px 2px;
	opacity: 0.6;
	transition: 0.3s;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;
	border-radius: 12px;
  }

#buttonForm:hover {opacity: 1}
</style>
