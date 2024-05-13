<template>
  <el-row class="tac">
    <el-col>
      <h5 class="mb-2">安全管理平台</h5>
      <div>
        <el-button @click="doFold">
          <el-icon v-if="isCollapse"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </el-button>
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        :collapse="isCollapse"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <template v-for="itm in menu" :key="itm">
          <template v-if="itm.children">
            <el-sub-menu>
              <template #title>
                <el-icon><Document /></el-icon>
                <span>{{ itm.label }}</span>
              </template>
              <el-menu-item v-for="sub in itm.children" :index="sub.path" :route="sub" :key="sub.path" @click="clickTab(sub)">
                <el-icon><Menu /></el-icon>
                <span>{{ sub.label }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <el-menu-item v-else :index="itm.path" :route="itm" @click="clickTab(itm)">
            <el-icon><component :is="itm.icon"></component></el-icon>
            <span>{{ itm.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { HomeFilled, List, Reading, Document, Menu, Location, Setting, Expand, Fold } from '@element-plus/icons-vue'
import { commonStore } from '@/store'
export default {
  name: 'side',
  components: {
    HomeFilled,
    List,
    Reading,
    Document,
    Menu,
    Location,
    Expand,
    Fold,
    Setting
  },
  data() {
    let filterMenu = ['/', '/login']
    let menu = this.$router.options.routes
      .filter(itm => !filterMenu.includes(itm.path))
      .map(itm => ({
        name: itm.name,
        label: itm.label,
        icon: itm.icon,
        path: itm.path
      }))
    commonStore().setMenu(menu)
    return {
      isCollapse: false,
      menu
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    doFold() {
      this.isCollapse = !this.isCollapse
    },
    clickTab(tab) {
      // console.log('tab:', tab)
      let store = commonStore()
      let tabs = store.getTabs
      if (!tabs.find(itm => itm.path === tab.path)) {
        tabs.push(tab)
        store.setTabs(tabs)
      }
      store.setCurrentTab(tab.path)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  border-right: 0;
}
.tac {
  background-color: #545c64;
}
</style>
