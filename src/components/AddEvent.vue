<template>
  <div class="container">
    <h3 class="title">Add Event To Match:</h3>
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
      
      <!-- Date -->
      <b-form-group
        id="input-group-date"
        label-cols-sm="3"
        label="Date:"
        label-for="date">
        <b-form-input
          id="date"
          v-model="$v.form.date.$model"
          type="text"
          :state="validateState('date')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.date.required">
          Date is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.date.valid">
         Format "12/02/2021" is required 
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Time -->
      <b-form-group
        id="input-group-time"
        label-cols-sm="3"
        label="Time of the match:"
        label-for="time">
        <b-form-input
          id="time"
          v-model="$v.form.time.$model"
          type="text"
          :state="validateState('time')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.time.required">
          Time is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.time.valid">
        Format "18:00" is required 
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Game minute -->
        <b-form-group
        id="input-group-gamemin"
        label-cols-sm="3"
        label="Match minute:"
        label-for="gamemin">
        <b-form-input
          id="gamemin"
          v-model="$v.form.gamemin.$model"
          type="text"
          :state="validateState('gamemin')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.gamemin.required">
          Game minute is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.gamemin.between">
          Match minute must be between 1-90 
        </b-form-invalid-feedback>
        </b-form-group>

      <!-- Event -->
        <b-form-group
        id="input-group-event"
        label-cols-sm="3"
        label="Event description:"
        label-for="event">
        <b-form-input
          id="event"
          v-model="$v.form.event.$model"
          type="text"
          :state="validateState('event')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.event.required">
          Event description is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.event.alpha">
          Event must be letters only
        </b-form-invalid-feedback>
        </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px; background-color:#907FA4; color: white; border-color:#7A6F9B"
        class="ml-5 w-75"
        id="subtitle"
        >Add Event</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Event failed: {{ form.submitError }}
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
  email,
  between
} from "vuelidate/lib/validators";

export default {
  name: "AddEvent",
  data() {
    return {
      matches_id : [],
      form: {
        match_id: "",
        date: "",
        time: "",
        gamemin: "",
        event: "",
        submitError: undefined
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
      date: {
        required,
          valid: function(value) {
          const containsNumber = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)
          return containsNumber
      },
      },
      time: {
        required,
          valid: function(value) {
          const containsNumber = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
          return containsNumber
      },
        
      },
      gamemin: {
        required,
        between: between(1, 90)
      },
      event: {
        required,
        alpha
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
    async addEvent() {
      try {
        const response = await this.axios.post(
          `http://localhost:3000/league/addEvent`,
          {
            match_id: parseInt(this.form.match_id),
            date: this.form.date,
            time: this.form.time,
            gamemin: this.form.gamemin,
            event: this.form.event
          }
        );
          this.$root.toast("New Event", "New Event was added successfully", "success");

      } catch (error) {
        console.log("error in add event")
        console.log(error);
      }
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$root.toast("Register", "One or more of the fields are incorrect","danger");
        return;
      }
      this.addEvent();
    },
    onReset() {
      this.form = {
        match_id: "",
        date: "",
        time: "",
        gamemin: "",
        event: ""
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
    }
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
