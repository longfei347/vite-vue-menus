<template>
  <main class="main" v-if="token">
    <side />
    <el-container>
      <el-tabs type="card" @tab-remove="removeTab" @tab-click="clickTab" v-model="currentTabs" closable style="width: 100%">
        <el-tab-pane v-for="itm in tabs" :key="itm" :name="itm.path" :label="itm.label" :path="itm.path">
          <component :is="itm.name" :path="itm.path" @openTab="openTab"></component>
          <!-- <p>{{ itm.name }}</p> -->
        </el-tab-pane>
      </el-tabs>
    </el-container>
    <div class="userInfo">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <el-avatar :size="40" :src="avatar" /> -->
          <el-icon :size="16"><UserFilled /></el-icon>
          <span>{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </main>
  <router-view v-else></router-view>
</template>
<script>
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { commonStore } from './store'
import side from '@/components/side.vue'
import { UserFilled } from '@element-plus/icons-vue'
export default {
  name: 'app',
  components: {
    side,
    UserFilled
  },
  data() {
    return {
      store: commonStore(),
      username: commonStore().getUsername
    }
  },
  mounted() {
    window._a = this
  },
  methods: {
    removeTab(val) {
      let ind = this.tabs.findIndex(itm => itm.path === val)
      let next = this.tabs[ind + 1] || this.tabs[ind - 1]
      this.tabs.splice(ind, 1)
      if (next) {
        this.currentTabs = next.path
        this.$router.push(next.path)
      }
    },
    openTab(tab) {
      // console.log('tab:', tab);
      if (!this.tabs.find(itm => itm.path === tab.path)) {
        this.tabs.push(tab)
      }
      this.currentTabs = tab.path
      this.$route.path !== tab.path && this.$router.push(tab.path)
    },
    clickTab(v) {
      this.$router.push(v.paneName)
    },
    logout() {
      sessionStorage.setItem('token', '')
      commonStore().setToken('')
      commonStore().setCurrentTab('')
      this.$router.push('/login')
    }
  },
  watch: {
    // 可不用
    $route: {
      handler(val) {
        if (this.store.currentTab !== val.path) {
          let cur = this.store.menu.find(itm => itm.path === val.path)
          // console.log('🚀 ~ handler ~ cur:', cur)
          cur && this.openTab(cur)
        }
      },
      immediate: true
    }
  },
  provide() {
    return {
      removeTab: this.removeTab,
      openTab: this.openTab
    }
  },
  computed: {
    token() {
      return commonStore().getToken || sessionStorage.token
    },
    currentTabs: {
      get() {
        return commonStore().getCurrentTab
      },
      set(val) {
        commonStore().setCurrentTab(val)
      }
    },
    tabs: {
      get() {
        return commonStore().getTabs
      },
      set(val) {
        commonStore().setTabs(val)
      }
    }
  }
}
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-tabs__item {
  padding: 0 20px;
}
.el-tabs__nav-wrap::after {
  height: 1px;
}
.el-tabs__item.is-active {
  color: #409eff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.main {
  display: flex;
  position: relative;
  height: 100%;
  > .el-container {
    padding: 10px;
  }
  .userInfo {
    position: absolute;
    right: 20px;
    top: 22px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        padding: 0 8px;
      }
    }
  }
}
.el-pagination {
  margin-top: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
