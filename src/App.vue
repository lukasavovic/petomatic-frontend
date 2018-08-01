<template>
  <div id="app">
    <topbar></topbar>
    <div class="main-content">
      <sidebarNav class="sidebar"></sidebarNav>
      <router-view/>
    </div>
  </div>
</template>

<script>
import sidebarNav from '@/components/sidebarNav'
import topbar from '@/components/topbar'

export default {
  name: 'App',
  components: {
    sidebarNav,
    topbar
  }
}
</script>

<style>
#app {

}
.main-content {
  display: flex;
}
</style>
