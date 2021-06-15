<template>
  <div class="container">
    <h3 class="title">Add Match To League:</h3>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
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

      <!-- Host team -->
        <b-form-group
        id="input-group-hostteam"
        label-cols-sm="3"
        label="Host team name:"
        label-for="hostteam">
        <b-form-input
          id="hostteam"
          v-model="$v.form.hostteam.$model"
          type="text"
          :state="validateState('hostteam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.hostteam.required">
          Host team name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.hostteam.alpha">
           Host team must be letters only
        </b-form-invalid-feedback>
        </b-form-group>

      <!-- Guest team -->
        <b-form-group
        id="input-group-guestteam"
        label-cols-sm="3"
        label="Guest team name:"
        label-for="guestteam">
        <b-form-input
          id="guestteam"
          v-model="$v.form.guestteam.$model"
          type="text"
          :state="validateState('guestteam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.guestteam.required">
          Guest team name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.guestteam.alpha">
          Guest team must be letters only
        </b-form-invalid-feedback>
        </b-form-group>

      <!-- Stadium -->
        <b-form-group
        id="input-group-stadium"
        label-cols-sm="3"
        label="Stadium name:"
        label-for="stadium">
        <b-form-input
          id="stadium"
          v-model="$v.form.stadium.$model"
          type="text"
          :state="validateState('stadium')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.stadium.required">
          Stadium name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.stadium.alpha">
          Stadium must be letters only
        </b-form-invalid-feedback>
        </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px; background-color:#907FA4; color: white; border-color:#7A6F9B"
        class="ml-5 w-75"
        id="subtitle"
        >Add Match</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Match failed: {{ form.submitError }}
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
  name: "AddMatchPreview",
  data() {
    return {
      form: {
        date: "",
        time: "",
        hostteam: "",
        guestteam: "",
        stadium: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
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
      hostteam: {
        required,
        alpha
      },
      guestteam: {
        required,
        alpha
      },
      stadium: {
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
    async addMatch() {
      try {

        const response = await this.axios.post(
          `http://localhost:3000/league/addMatch`,
          {
            date: this.form.date,
            time: this.form.time,
            hometeam: this.form.hostteam,
            awayteam: this.form.guestteam,
            stadium: this.form.stadium
          }
        );
          this.$root.toast("New Match", "New match was added successfully", "success");

      } catch (error) {
        console.log("error in add Match")
        console.log(error);
      }
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$root.toast("New Match", "One or more of the fields are incorrect","danger");
        return;
      }
      this.addMatch();
    },
    onReset() {
      this.form = {
        date: "",
        time: "",
        hostteam: "",
        guestteam: "",
        stadium: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
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
