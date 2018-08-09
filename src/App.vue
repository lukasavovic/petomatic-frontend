<template>
  <v-app id="inspire">
    <div class="login" v-if="!loggedIn">
      <h2>Welcome to Pet-erinar Office</h2>
      <p>Please log in first</p>
      <template>
        <v-form>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-form>
        <v-btn
          class="loginButton"
          @click="logIn"
        >Log In
        </v-btn>
      </template>
    </div>
    <div v-if="loggedIn">
      <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
        red
      >
        <v-list dense>
          <template v-for="item in items">
            <v-layout
              v-if="item.heading"
              :key="item.heading"
              row
              align-center
              color="red lighten-1"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                @click="routerPush(child.path)"
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-4"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down"><router-link to="/">  Pet-erinar </router-link></span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <img
              src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
            <router-view></router-view>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    email: '',
    password: '',
    loggedIn: true,
    dialog: false,
    drawer: null,
    items: [
      {
        icon: 'keyboard_arrow_up people',
        'icon-alt': 'keyboard_arrow_down people',
        text: 'Users',
        model: false,
        children: [
          {  text: 'View Profile', path: '/userProfile'},
          {  text: 'Edit Profile', path: '/editProfile'},
          {  text: 'Add User', path: '/addUser'},
          {  text: 'View All Users', path: '/allUsers'}
        ]
      },
      {
        icon: 'keyboard_arrow_up today',
        'icon-alt': 'keyboard_arrow_down today',
        text: 'Visits',
        model: false,
        children: [
          {  text: 'View All Visits',  path: '/'},
          {  text: 'Add Visit',  path: '/addVisit'},
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Customers',
        model: false,
        children: [
          { text: 'View All Customers', path: '/allCustomers'},
          { text: 'Add Customers', path: '/addCustomer'},
        ]
      },
      {
        icon: 'log', text: 'Log Out'
      }

    ]
  }),
  props: {
    source: String
  },
  methods: {
    routerPush(route) {
      this.$router.push({path:route});
    },
    logIn(){
      var user = {};
      user.email = this.email;
      user.password = this.password;
      user =  JSON.stringify(user);
      console.log('%c' + user, 'background: #161616; color: #ffff44');
      this.axios.post('http://localhost:3005/app/login', user)
        .then( (response) => {
          if(response.data === 1) {
            this.loggedIn = true;
            console.log('%c' + this.loggedIn, 'background: #161616; color: red');
          } else {
            this.loggedIn = false;
            console.log('%c' + response.data, 'background: #161616; color: #ffff44');
          }
        })
    },
  },
  mounted(){
  }
}

</script>

<style lang="scss">
.addButton {
  margin-top: 20vh;
  right: 20vh;
}
.login {
  text-align: center;
  width: 50%;
  max-width: 600px;
  border: 2px solid darkgray;
  border-radius: 20px;
  padding: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  @media screen and (max-width: 850px) {
    width: 85%;
    /*p {*/
      /*display: none;*/
    /*}*/
  }
  input {
    width: 80%;
  }
  .loginButton {
    display: block;
    margin: 10px auto;
  }
}
a{
  text-decoration: none !important;
}
</style>
