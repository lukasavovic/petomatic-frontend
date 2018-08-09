<template>
  <div>
    <h1>ALL USERS</h1>
    <div class="addNew">
      <router-link to="/addUser">
        <v-btn color="error" fab med dark>
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
    </div>
    <div class="user-card" v-for="user in allUsers" :key="user.id">
      <div class="user-avatar">
      </div>
      <div class="user-info">
        <p class="name">{{user.firstName}} {{user.lastName}}</p>
        <p class="email">{{user.email}}</p>
        <p class=""></p>
      </div>
      <div class="user-buttons">
        <v-btn outline color="indigo" @click="routerPush(user.id)">View Profile</v-btn>
        <!--<button>Edit</button>-->
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'topbar',
    data () {
      return {
        allUsers: [],
      }
    },
    mounted(){
      this.axios
        .get('http://petomatic.test/app/users/')
          .then(response => (this.allUsers = response.data));
    },
    methods:{
      routerPush(id){
        this.$router.push('/userProfile/' + id);
      }
    }
  }
</script>

<style scoped lang="scss">
.user-card {
  border: 3px solid gold;
  margin: 20px;
  padding: 15px;
}
</style>
