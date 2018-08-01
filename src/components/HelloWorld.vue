<template>
    <el-table
      :data="visits"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="customers_id"
        label="Customers Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pet_id"
        label="Pet Id">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      visits: []
    }
  },
  mounted(){
    this.axios
      .get('http://localhost:3200/')
      .then(response => (this.visits = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
