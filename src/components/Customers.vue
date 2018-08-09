<template>
  <div class="Customers-wrapper">
    <h1>List of Customers</h1>
    <div class="customer-cards" >
      <template>
        <v-flex v-for="customer in allCustomers" :key="customer.id">
          <v-card class="customer-card">
            <v-card-media
              src="https://cdn.vuetifyjs.com/images/lists/ali.png"
              height="300px"
            >
              <v-layout
                column
                fill-height
              >
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">{{customer.firstName}} {{customer.lastName}}</div>
                </v-card-title>
              </v-layout>
            </v-card-media>

            <v-list two-line>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="indigo">phone</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{customer.phone}}</v-list-tile-title>
                  <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>

              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="indigo">mail</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{customer.email}}</v-list-tile-title>
                  <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>
              <template>
                <div v-for="pet in allPets" :key="customer.petId" v-if="customerHasPet(pet.customers_id, customer.id)" >
                 <div class="singlePet">
                   <p>Pet name: {{pet.name}}</p>
                   <p>Pet age: {{pet.age}}</p>
                 </div>
                </div>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../main.js'
  export default {
    name: 'Customers',
    data () {
        return{
          allCustomers: [],
          allPets: [],
        }
    },
    mounted(){
    this.axios
      .get('http://petomatic.test/app/customers')
      .then( (response) => {
        this.allCustomers = response.data;
      });
    this.axios
      .get('http://petomatic.test/app/pets')
      .then( (response) => {
        this.allPets = response.data;
      })
    },
    methods:{
      customerHasPet(petId, customerId){
        if(petId === customerId){
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.Customers-wrapper{
  width: 100%;
  .customer-cards{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5%;
    padding: 25px;
    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
    .customer-card {
      margin: 20px 0;
    }
  }
}
</style>
