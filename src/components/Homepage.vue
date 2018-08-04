<template>
  <div class="homepage">
    <div class="visits_navigation">
      <h1>Welcome to Pet-erinar Office App</h1>
      <router-link to="/addVisit">
        <v-btn fab dark color="indigo">
          <v-icon dark>add</v-icon>
        </v-btn>
      </router-link>
      <!--<h1 v-if="allVisits[0].date == today">Here are todays apointments</h1>-->
      <template v-for="(item, index) in allVisits" v-if="item.date == today">

      </template>
    </div>
    <div class="visitsTable">
      <v-data-table
        :headers="headers"
        :items="allVisits"
        :search="search"
        :pagination.sync="pagination"
        :loading="loading"
        class="elevation-1"
        item-key="id"
      >

        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded" v-if="props.item.date !== today">
            <td >{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.firstName}} {{props.item.LastName}}</td>
            <td class="text-xs-left"> {{ props.item.petName }} </td>
            <td class="text-xs-left">{{ props.item.age }}</td>
            <td class="text-xs-left">{{ props.item.species }}</td>
            <td class="text-xs-left">{{ props.item.visit_type }}</td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>{{ props.item.longDescription }}</v-card-text>
          </v-card>
        </template>
      </v-data-table>

    </div>
  </div>
</template>

<script>
  import { EventBus } from '../main.js'
  import visitsModal from './addVisit'
  export default {
    name: 'Homepage',
    components: {
      visitsModal,
    },
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        search: '',
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
          { text: 'Visit Type', sortable: false, width: '10%'}
        ],
        allVisits: [],
      }
    },
    methods: {
    },
    computed:{
      today(){
          return Date.now();
      }
    },
    mounted(){
      this.axios
      .get('http://localhost:3005/visits')
      .then(response => (this.allVisits = response.data))
        .then(this.loading = false)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang='scss'>
.homepage {
  width: 100%;
  height: 100%;
  .visitsTable {
    width: 80%;
  }
}
</style>
