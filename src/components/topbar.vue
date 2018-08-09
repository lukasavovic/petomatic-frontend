<template>
    <div class="topbar">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color=""
            text-color="#545c64">

            <el-menu-item id="logo">
                <i>P</i>
                <span>etomatic</span>
            </el-menu-item>
        </el-menu>
        <div class="searchbar">
            <h1>searchbar</h1>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../main.js'

export default {
  name: 'topbar',
  data () {
    return {
        isCollapse: false
    }
  },
  mounted(){
    EventBus.$on('toggle', isCollapse => {
        this.isCollapse = isCollapse;
    });
  }
}
</script>

<style scoped lang="scss">
.topbar {
    display: flex;
   .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 15vw;
    }
    .searchbar {
        padding-left: 10px;
    }
    .el-menu-item {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
            font-size: 24px;
            font-weight: 800;
            padding-right: 2px;
            color:#167acc;
            font-style: oblique;
            img{
                max-width: 20px;
                padding-right: 10px;
            }
        }

        span {
            font-size: 1.4em;
        }
    }
    #logo {
        &:hover {
            background-color:none !important;
        }
        &:focus {
            background-color:none !important;
        }

    }
}
</style>
