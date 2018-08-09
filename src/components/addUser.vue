<template>
  <div class="container fluid">
    <router-link to="/allUsers">Back to All Users</router-link>
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
        v-model="password"
        label="Please Enter Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="repeatPassword"
        label="Repeat Password"
        required
      ></v-text-field>
      <button @click="addUser">Submit</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'addUser',
    data () {
      return {
        firstName:'',
        lastName:'',
        email:'',
        password: '',
        repeatPassword:'',
      }
    },
    mounted(){

    },
    methods:{
      addUser(){
        if(this.firstName !== '' && this.lastName !== '' && this.password && this.repeatPassword !== ''){
          if(this.password === this.repeatPassword){
            var user = {firstName: this.firstName, lastName: this.lastName, password: this.password, email: this.email};
          }else {
            return false
          }
          console.log(user);
          this.axios
            .post('http://petomatic.test/app/users', user)
            .then( (response) => {
              if(response.data == 1) {
                this.$router.push('/allUsers');
              }
            })
        } else {
          console.log(response.data);
          event.preventDefault();
        }
      }
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
