<template>
  <div class="allUsers">
    <h1 class="text-lg-center">ALL USERS</h1>
    <div class="addNew">
      <router-link to="/addUser">
        <v-btn color="error" class="logout">
          Add New User
        </v-btn>
      </router-link>
    </div>
    <div class="user-cards">
      <div class="user-card" v-for="user in allUsers" :key="user.id">
        <div class="user-avatar">
          <img src="../assets/profile.jpg" alt="">
        </div>
        <div class="user-info">
          <p class="name">{{user.firstName}} {{user.lastName}}</p>
          <p class="email">{{user.email}}</p>
          <p class=""></p>
        </div>
        <div class="user-buttons">
          <v-btn outline color="indigo" @click="routerPush(user.id)">View Profile</v-btn>
        </div>
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
  .allUsers{
    width: 100%;
    .user-cards{
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
      .user-card {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        max-width: 100%;
        border: 3px solid #4286f4;
        margin: 20px;
        padding: 15px;
        .user-avatar{
          padding: 10px;
          img{
            width: 100px;
          }
        }
        .name {
          font-weight: bold;
          font-size: 2em;
        }
      }
    }
  }
</style>
