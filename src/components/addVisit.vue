<template>
  <div class="form-wrapper">
    <h1 class="newVisit">Add New Visit</h1>
    <v-form  @submit="submitForm" class="form">
      <!--DATE-->
      <v-flex class="datePicker">
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" :min="todaysDate" @input="$refs.menu.save(date)"></v-date-picker>
        </v-menu>
      </v-flex>
      <!--CUSTOMER SEARCH-->
      <v-flex>
        <v-autocomplete
          :loading="loading"
          :items="allCustomersNames"
          :search-input.sync="search"
          v-model="selectedName"
          cache-items
          hide-no-data
          hide-details
          label="Search Customers"
        ></v-autocomplete>
      </v-flex>
      <!--PET-->
      <v-flex xs12 sm6>
        <v-select
          v-model="petId"
          :items="allPets"
          label="Pet"
        ></v-select>
      </v-flex>
      <!--VISIT TYPE-->
      <v-flex xs12 sm6>
        <v-select
          v-model="visitType"
          :items="valuesVisitType"
          label="VisitType"
        ></v-select>
      </v-flex>
      <!--LONG DESCRIPTION-->
      <v-flex >
        <v-textarea
          name="input-7-1"
          label="Visit Description"
          v-model="longDescription"
          hint="Visit Details"
        ></v-textarea>
      </v-flex>
      <v-btn color="error" class="logout" @click="submitForm">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>

  export default {
    name: 'addVisit',
    data () {
      return {
        date:null,
        menu: false,
        loading: false,
        items: [],
        search: null,
        selectedName: null,
        visitType: null,
        allVisitTypes: null,
        customerId: null,
        allCustomers: null,
        allCustomersNames: [],
        petId: null,
        allPetsId: [],
        allPetsNames: [],
        itemsVisitType: [],
        valuesVisitType: [],
        longDescription: '',
        allPets: [],
        dialog: false
      }
    },
    methods:{
      populateVisitTypes(data){
        for(var i=0; i< data.length; i++){
          var text = data[i].title.charAt(0).toUpperCase() + data[i].title.slice(1);
          var visit = {value: data[i].id, text: text};
          this.valuesVisitType.push(visit);
        }
      },
      populateCustomerNames(data){
        for(var i=0; i<data.length;i++){
          this.allCustomersNames.push(data[i].firstName + ' ' + data[i].lastName);
        }
      },
      populatePets(data){
        this.allPets = [];
        for(var i=0;i<data.length;i++){
          var pet = {value: data[i].id , text: data[i].name};
          this.allPets.push(pet);
        }
      },
      submitForm(event){
        newVisit = [];
        if(this.date !== '' && this.customerId !== '' && this.petId){
          var newVisit = {date: this.date, customers_id: this.customerId, pets_id: this.petId, visit_type_id: this.visitType, longDescription: this.longDescription};
          console.log(newVisit);
          this.axios
            .post('http://petomatic.test/app/visits', newVisit)
            .then( (response) => {
              if(response.data == 1) {
                this.$router.push('/');
              }
            })
        } else {
          event.preventDefault();
        }
      }
    },
    watch: {
      search (val) {
        val && val !== this.selectedName && this.querySelections(val)
      },
      selectedName(){
        for(var i=0;i<this.allCustomers.length;i++) {
          if (this.selectedName === (this.allCustomers[i].firstName + " " + this.allCustomers[i].lastName)) {
            this.customerId = this.allCustomers[i].id;
            this.axios
              .post('http://petomatic.test/app/petsNames', this.allCustomers[i].id)
              .then(response => (this.populatePets(response.data)));
          }
        }
      }
    },
    computed:{
      todaysDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<10){
          month = "0" + month;
        }
        var day = date.getDate();
        if (day < 10){
          day = "0" + day;
        }
        return  year + "-" + month + "-" + day;
      }
    },
    mounted(){
      this.axios
        .get('http://petomatic.test/app/visit_type')
          .then(response => (this.populateVisitTypes(response.data)));
      this.axios
        .get('http://petomatic.test/app/customers')
          .then(response => (this.allCustomers = response.data))
      this.axios
        .get('http://petomatic.test/app/customers')
          .then(response => (this.populateCustomerNames(response.data)))
    }
  }
</script>

<style scoped lang="scss">
  .form-wrapper{
    width: 100%;
    .newVisit {
      text-align: center;
      margin: 20px auto;
    }
    .form {
      width: 45%;
      padding: 5%;
      border: 1px solid #4286f4;
      margin: 0 auto;
      .logout{
        display: block;
        margin: 15px auto;
      }
    }
  }
</style>
