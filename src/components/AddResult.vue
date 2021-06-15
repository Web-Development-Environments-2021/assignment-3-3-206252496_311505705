<template>
  <div class="container">
    <h3 class="title">Add Result To Match:</h3>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <!-- Match id -->
        <b-form-group
        id="input-group-match_id"
        label-cols-sm="3"
        label="Match id:"
        label-for="match_id">
        <b-form-input
          id="match_id"
          v-model="$v.form.match_id.$model"
          type="text"
          :state="validateState('match_id')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.match_id.required">
          Match id name is required
        </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.match_id.valid">
         Match id is not exist
        </b-form-invalid-feedback>
        </b-form-group>
      
      <!-- Result -->
      <b-form-group
        id="input-group-result"
        label-cols-sm="3"
        label="Result:"
        label-for="result">
        <b-form-input
          id="result"
          v-model="$v.form.result.$model"
          type="text"
          :state="validateState('result')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.result.required">
          Result is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.result.valid">
         Format "2-0" is required 
        </b-form-invalid-feedback>
      </b-form-group>


      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px; background-color:#907FA4; color: white; border-color:#7A6F9B"
        class="ml-5 w-75"
        id="subtitle"
        >Add Result</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Result failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "addResult",
  data() {
    return {
      matches_id : [],
      form: {
        match_id: "",
        result: ""
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      match_id: {
        required,
          valid: function(value) {
          const containsNumber = (this.matches_id.includes(parseInt(value)))
          return containsNumber
      },
      },
      result: {
        required,
          valid: function(value) {
          const containsNumber = /^[0-9]{1}\-[0-9]{1}$/.test(value)
          return containsNumber
      },
      }
    }
  },
  mounted() {
    // console.log("mounted");
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async addResult() {
      try {
        const response = await this.axios.put(
          `http://localhost:3000/league/addResult`,
          {
            match_id: parseInt(this.form.match_id),
            result: this.form.result
          }
        );
          this.$root.toast("New Result", "New result was added successfully", "success");

      } catch (error) {
        console.log("error in add Result")
        console.log(error);
      }
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$root.toast("New Result", "One or more of the fields are incorrect","danger");
        return;
      }
      this.addResult();
    },
    onReset() {
      this.form = {
        match_id: "",
        result: ""
        };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async allMatches() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/league/getAllMatches`,
        );
        //future games
          const future = response.data;
          this.future = [];
          this.future.push(...future);

          this.matches_id = [];
          response.data.forEach(element => {
          this.matches_id.push(element.match_id);
            }
          );     
      } catch (error) {
        console.log("error in geting games in add result")
        console.log(error);
      }
    },   
  },
    mounted(){
    this.allMatches(); 
  },
};

</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}


#subtitle{
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

#subtitle:hover {opacity: 1}
</style>
