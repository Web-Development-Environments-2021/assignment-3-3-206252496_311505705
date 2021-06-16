<template>
  <div>    
    <br/>
    <div class="container">
      <h1 class="title">League Management Page</h1>
    </div>
    <hr>
    <center>
      <br/>
      <h4 style="padding: 0px 20px;"> What would you like to do:</h4>
      <b-button @click="ToEvent()" style="background: #907FA4" >Add Event</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <b-button  @click="ToResult()" style="background: #907FA4" >Add Result</b-button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <b-button  @click="ToMatch()" style="background: #907FA4" >Add Match</b-button>
    </center>
    <br/>
    <div v-if="toShow == `match`">
      <AddMatchPreview></AddMatchPreview>
    </div>
    <div v-if="toShow == `event`">
      <AddEvent></AddEvent>
    </div>
    <div v-if="toShow == `result`">
      <AddResult></AddResult>
    </div>
    <hr>
    <br/>
    <h3 style="padding: 0px 20px;"> All League Matches</h3>
    <br/>
    <div v-if="future.length != 0">
          <mdb-datatable 
          :data="data"
          striped
          bordered
          fixed
          />
    <br/>
    <br/>
    </div>
  </div>
</template>


<script>
  import { mdbDatatable } from 'mdbvue';
  import AddMatchPreview from "../components/AddMatchPreview";
  import AddEvent from "../components/AddEvent";
  import AddResult from "../components/AddResult";
export default {
  name: "LeagueManagePage",
  components: {
    AddEvent,
    AddMatchPreview,
    mdbDatatable,
    AddResult
  },
 data() {
    return {
      future:[],
      toShow: "",
      data: {
      columns: [
            {
              label: 'match_id ⇅',
              field: 'match_id',
              sort: 'asc'
            },
            {
              label: 'hometeam ⇅',
              field: 'hometeam',
              sort: 'asc'
            },
            {
              label: 'awayteam ⇅',
              field: 'awayteam',
              sort: 'asc'
            },
            {
              label: 'date ⇅',
              field: 'date',
              sort: 'asc'
            },
            {
              label: 'time ⇅',
              field: 'time',
              sort: 'asc'
            },
            {
              label: 'stadium ⇅',
              field: 'stadium',
              sort: 'asc'
            },
            {
              label: 'result ⇅',
              field: 'result',
              sort: 'asc'
            },
           
          ],
          rows: []
      }
    };
  },
  methods: {
  async allMatches() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/league/getAllMatches`,
        );
        //future games
          const future = response.data;
          this.future = [];
          this.future.push(...future);

          this.data.rows = [];
          response.data.forEach(element => {
            if (element.result == undefined ||  element.result == null || element.result == "undefined"){
              element.result = "future game"
            }
            let newdate = element.date.split("/")
            let date = newdate[2]+"-"+newdate[1]+"-"+newdate[0]
            const rows = {
            match_id: element.match_id,
            hometeam: element.hometeam,
            awayteam: element.awayteam,
            date: date,
            time: element.time,
            stadium: element.stadium,
            result: element.result
            }
            this.data.rows.push(rows);
          });       
      } catch (error) {
        console.log("error in geting future games")
        console.log(error);
      }
    },   
   ToEvent() {
    this.toShow="event"
    },
   ToResult() {
    this.toShow="result"
    },
   ToMatch() {
    this.toShow="match"
    },
  },
  mounted(){
    console.log("games page mounted");
    this.allMatches(); 
  },
}
</script>

<style scoped>
#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>