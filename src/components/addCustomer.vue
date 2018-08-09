<template>
  <div class="container fluid">
    <router-link to="/allCustomers">Back to All Customers</router-link>
    <h1 class="text-lg-center text-xs-center">Add New user</h1>
    <div class="formAddUser">
      <v-text-field
        v-model="firstName"
        label="Please Enter First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Please Enter Last Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Please Enter E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Please Enter Phone"
        required
      ></v-text-field>
      <div class="pets">
        <h3>Add at least one pet</h3>
        <v-text-field
          v-model="petName"
          label="Please Enter Pet Name"
        ></v-text-field>
        <v-text-field
          v-model="petAge"
          label="Please Enter Pet Name"
          type="number"
          min="0"
        ></v-text-field>
        <v-flex xs12 sm6>
          <v-select
            v-model="speciesValue"
            :items="species"
            label="Species"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="genderValue"
            :items="genders"
            label="Gender"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="chippedValue"
            :items="chipped"
            label="Chipped"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="vaccinationValue"
            :items="vaccination"
            label="Vaccination"
          ></v-select>
        </v-flex>
      </div>
      <button @click="addCustomer">Submit</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'addCustomer',
    data () {
      return {
        firstName:'',
        lastName:'',
        email:'',
        phone: '',
        petName: '',
        petAge: 0,
        species: [],
        speciesValue: null,
        genders: [],
        genderValue: null,
        chipped: [
          {text: 'True', value:1},
          {text: 'False', value:0}
        ],
        chippedValue:null,
        vaccination:[
          {text: 'True', value:1},
          {text: 'False', value:0}
        ],
        vaccinationValue: null,

      }
    },
    mounted(){
      this.axios
        .get('http://petomatic.test/app/species')
        .then(response => (this.populateSpecies(response.data)));
      this.axios
        .get('http://petomatic.test/app/genders')
        .then(response => (this.populateGenders(response.data)));
    },
    methods:{
      addCustomer(){
        if(this.firstName !== '' && this.lastName !== '' && this.phone){
          if(this.petName !== '' && this.petAge !== 0 && this.speciesValue !== null && this.chippedValue !== null && this.vaccinationValue !== null) {
            var customer = {firstName: this.firstName, lastName: this.lastName, phone: this.phone, email: this.email};
            var pet = {name: this.petName, age: this.petAge, species_id: this.speciesValue, genders_id: this.genderValue, vaccination: this.vaccinationValue,chipped:this.chippedValue};
            var customer_pet = [];
            customer_pet.push(customer);
            customer_pet.push(pet);
            this.axios
              .post('http://petomatic.test/app/customers', customer_pet)
              .then( (response) => {
                if(response.data == 11){
                  this.$router.push('/allCustomers');
                }
              })
          }
        } else {
            console.log(response.data);
            event.preventDefault();
          }
      },
      populateSpecies(data){
        for(var i=0; i< data.length; i++){
          var text = data[i].title.charAt(0).toUpperCase() + data[i].title.slice(1);
          var species = {value: data[i].id, text: text};
          this.species.push(species);
        }
      },
      populateGenders(data){
        for(var i=0; i< data.length; i++){
          var text = data[i].title.charAt(0).toUpperCase() + data[i].title.slice(1);
          var gender = {value: data[i].id, text: text};
          this.genders.push(gender);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .formAddUser {
    width: 40%;
    margin: 0 auto;
    @media (max-width:750px) {
      width: 100%;
    }
  }
</style>
