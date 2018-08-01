<template>
    <div class="sidebarNav">
        <el-menu 
            default-active="2" 
            class="el-menu-vertical-demo" 
            :collapse="isCollapse"
            background-color=""
            text-color="#545c64">

            <div class="togglebutton" @click="toogleCollapse"> 
                <p>
                    <i class="fas fa-arrow-circle-left" v-if="!isCollapse"></i>
                    <i class="fas fa-arrow-circle-right" v-if="isCollapse"></i>
                </p>
            </div>
            <el-submenu index="1">
                <template slot="title">
                    <i class="fas fa-users"></i>
                    <span slot="title">Users</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1"><a href="#">View All</a></el-menu-item>
                    <el-menu-item index="1-1"><a href="#">Add New</a></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        <el-submenu index="2">
                <template slot="title">
                    <i class="fas fa-user-tag"></i>
                    <span slot="title">Customers</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1"><a href="#">View All</a></el-menu-item>
                    <el-menu-item index="2-1"><a href="#">Add New</a></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="fas fa-calendar"></i>
                    <span slot="title">Visits</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1"><a href="#">View All</a></el-menu-item>
                    <el-menu-item index="2-1"><a href="#">Add New</a></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item>
                <i class="fas fa-sign-in-alt"></i>
                <span slot="title">Log Out</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { EventBus } from '../main.js'

export default {
    name: 'sidebarNav',
    data () {
        return {
            isCollapse: false
        }
    },
    methods: {
        toogleCollapse() {
            this.isCollapse = !this.isCollapse
            EventBus.$emit('toggle', this.isCollapse);
        },    
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang='scss'>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 15vw;
    min-height: 400px;
  }
  .togglebutton:hover{
      cursor: pointer;
  }
  .togglebutton {
      display: flex;
      justify-content: flex-end;
  }
  .togglebutton p {
      margin-right: 20px;
  }
  .sidebarNav{
    .fas {
        padding-right: 5px;
         color: #8998f0;
    }
  }
</style>
