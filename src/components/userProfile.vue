<template>
  <div>
    <h2>User Profile</h2>
    <div class="user-profile">
      <h4>First Name:</h4>
      <h3>{{user.firstName}}</h3>
      <h4>Last Name:</h4>
      <h3>{{user.lastName}}</h3>
      <h4>E-mail:</h4>
      <h3>{{user.email}}</h3>
    </div>
    <div class="user-pets"></div>
  </div>
</template>

<script>

  export default {
    name: 'userProfile',
    data () {
      return {
        user: {},
      }
    },
    mounted(){
      this.axios
        .get('http://petomatic.test/app/users/' + this.$route.params.id)
        .then(response => (this.user = response.data));
    },
    methods:{
    }
  }
</script>

<style scoped lang="scss">

</style>
