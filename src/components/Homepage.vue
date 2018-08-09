<template>
  <div class="homepage">
    <div class="visits_navigation">
      <h1 class="text-lg-center">Welcome to Pet-erinar Office App</h1>
      <router-link to="/addVisit">
        <v-btn dark color="blue darken-3" class="buttonAddVisit">
            Add New visit
        </v-btn>
      </router-link>
      <!--<h1 v-if="allVisits[0].date == today">Here are todays apointments</h1>-->
      <template v-for="(item, index) in dateFilter" v-if="item.date == today">

      </template>
    </div>
    <div class="visitsTable">
      <v-data-table
        :headers="headers"
        :items="dateFilter"
        :search="search"
        :pagination.sync="pagination"
        :loading="loading"
        class="elevation-1"
        item-key="id"
      >

        <template slot="items" slot-scope="props">
          <tr>
            <td >{{ props.item.date }}</td>
            <td class="text-xs-left customerLink" @click="routerPush(props.item.customerId)">{{ props.item.firstName}} {{props.item.LastName}}</td>
            <td class="text-xs-left"> {{ props.item.petName }} </td>
            <td class="text-xs-left">{{ props.item.age }}</td>
            <td class="text-xs-left">{{ props.item.species }}</td>
            <td class="text-xs-left">{{ props.item.visit_type }}</td>
            <td class="justify-center layout px-0">
              <v-icon medium @click="props.expanded = !props.expanded" >keyboard_arrow_down</v-icon>
              <v-icon medium @click="editVisit(props.item.id)">edit</v-icon>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>{{ props.item.longDescription }}</v-card-text>
          </v-card>
        </template>
      </v-data-table>
      <div class="calendars">
        <h3>Date Filter</h3>
        <v-flex class="datePicker">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="dateFrom"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <v-text-field
              slot="activator"
              v-model="dateFrom"
              label="From"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateFrom" :max="dateTo" @input="$refs.menu.save(dateFrom)"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex class="datePicker">
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="dateTo"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <v-text-field
              slot="activator"
              v-model="dateTo"
              label="To"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateTo" :min="dateFrom" @input="$refs.menu2.save(dateTo)"></v-date-picker>

          </v-menu>
        </v-flex>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Homepage',
    components: {

    },
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        search: '',
        dateFrom: null,
        dateTo: null,
        menu: false,
        menu2: false,
        pagination: {
          page: 1,
          rowsPerPage: 10,
          totalItems: 0,
          sortBy: 'date',
          descending: true
        },
        selected: [],
        headers: [
          { text: 'Date', value: 'date', width: '20%'},
          { text: 'Customer', sortable: false, width: '25%'},
          { text: 'Pet', sortable: false, width: '25%'},
          { text: 'Age', sortable: false, width: '10%'},
          { text: 'Species', sortable: false, width: '10%'},
          { text: 'Visit Type', sortable: false, width: '5%'},
          { text: 'Actions', sortable: false, width: '5%'}
        ],
        allVisits: [],
      }
    },
    methods: {
      log(){
        this.axios
          .get('http://petomatic.test/app/login')
          .then(response => (console.log(response)))
          .then(this.loading = false)
      },
      editVisit(id){
        this.$router.push('/editVisit/' + id)
      },
      dateConversion(date){
          return new Date(date).getTime()
      },
      routerPush(id){
        this.$router.push('/app/customers/' + id);
      }
    },
    computed:{
      today(){
          return Date.now();
      },
      dateFilter(){
          if (this.dateFrom){
            return this.allVisits.filter(visit => this.dateConversion(visit.date) > this.dateConversion(this.dateFrom))
          } else {
            return this.allVisits
          }
      },
    },
    mounted(){
      this.axios
        .get('http://petomatic.test/app/')
        .then(response => (this.allVisits = response.data))
        .then(this.loading = false)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.homepage {
  width: 100%;
  height: 100%;
  .visits_navigation {
    h1{
      padding-left: 1%;
      font-size: 3em;
    }
    .buttonAddVisit {
      margin: 25px 5px;
    }
  }
  .datePicker {
  margin: 20% 0;
  }
  .visitsTable {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-gap: 1%;
    .customerLink {
      &:hover {
        color: royalblue;
        cursor: pointer;
        font-weight: bolder;
        transition: 0.2s all ease;
      }
    }
  }
}
</style>
