<template>
  <el-row class="menu" :class="theme">
    <el-col>
      <h4 class="title">
        <img :src="logo" alt="" class="logo" />
        <span v-if="!isCollapse">安全管理平台</span>
      </h4>
      <div>
        <el-button @click="doFold">
          <el-icon v-if="isCollapse"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </el-button>
      </div>
      <!--background-color="#545c64"-->
      <el-menu
        active-text-color="#ffd04b"
        :style="`width: ${isCollapse ? '70px' : '200px'}`"
        :collapse-transition="false"
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
import logo from '@/assets/logo2.png'
export default {
  name: 'side',
  props: ['theme'],
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
    let filterMenu = ['/', '/login', '/loginRemote']
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
      logo,
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
.menu {
  .el-menu {
    border-right: 0;
    .el-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .title {
    display: flex;
    align-items: center;
    padding-left: 12px;
    .logo {
      width: 60px;
      // background-color: rgba(255, 255, 255, 0.8);
      // background-color: #545c64;
    }
  }
}
.menu.primary {
  background-color: var(--el-color-primary-light-3);
  .el-menu {
    background-color: var(--el-color-primary-light-3);
  }
}
.menu.success {
  background-color: var(--el-color-success-light-3);
  .el-menu {
    background-color: var(--el-color-success-light-3);
  }
}
.menu.warning {
  background-color: var(--el-color-warning-light-3);
  .el-menu {
    background-color: var(--el-color-warning-light-3);
  }
}
.menu.danger {
  background-color: var(--el-color-danger-light-3);
  .el-menu {
    background-color: var(--el-color-danger-light-3);
  }
}
.menu.purple {
  background-color: purple;
  .el-menu {
    background-color: purple;
  }
}
</style>
