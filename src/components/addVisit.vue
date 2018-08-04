<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="name"
      label="Date"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Customer"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Pet"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Visit type"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Description"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
  import { EventBus } from '../main.js'

  export default {
    name: 'addVisit',
    data () {
      return {
        dialog: false
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
