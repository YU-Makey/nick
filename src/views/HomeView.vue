<template>
  <div>
    <div class="common-layout">
      
      <el-container>
        <el-aside width="200px">
          <h2>面经</h2>
          <el-menu router
        active-text-color="#ffd04b"
        background-color="#303a46"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
            <el-menu-item index="1-1">数据面板</el-menu-item>
            <el-menu-item index="list">面经管理</el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <div style="display: flex; justify-content: space-between; height: 50px;">
            <div>
              刷新
            </div>
            <div>
              <span>{{ name }}</span>
              <!-- <span :icon="SwitchButton"></span> -->
              <el-icon @click="tui">
                <SwitchButton />
              </el-icon>
            </div>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { SwitchButton } from '@element-plus/icons-vue'
const route = useRoute();
const router = useRouter();
const name=localStorage.getItem('name')
const tui=()=>{
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-aside{
  height: 100vh;
  background: #303a46;
}
h2{
  color: #fff;
  text-align: center;

}
</style>