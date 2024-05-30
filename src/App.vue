<template>
  <el-config-provider :locale="zh">
    <main class="main" :class="theme" v-if="token">
      <side :theme="theme" />
      <el-container>
        <el-tabs type="card" @tab-remove="removeTab" @tab-click="clickTab" v-model="currentTabs" closable
          style="width: 100%">
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
            <el-icon :size="16">
              <UserFilled />
            </el-icon>
            <span>{{ username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                切换主题
                <el-radio-group v-model="theme" class="themes">
                  <el-radio label="primary">淡蓝</el-radio>
                  <el-radio label="success">绿色</el-radio>
                  <el-radio label="warning">橙色</el-radio>
                  <el-radio label="danger">红色</el-radio>
                  <el-radio label="info">灰色</el-radio>
                  <el-radio label="purple">紫色</el-radio>
                  <el-radio label="">默认</el-radio>
                </el-radio-group>
              </el-dropdown-item>
              <el-dropdown-item>
                <span title="请退出登录后重新登陆">切换环境</span>
                <el-radio-group v-model="env" style="margin-left: 8px;">
                  <el-radio label="local" disabled>本地</el-radio>
                  <el-radio label="prod" disabled>远程</el-radio>
                </el-radio-group>
              </el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </main>
    <router-view v-else></router-view>
  </el-config-provider>
</template>
<script>
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { commonStore } from './store'
import side from '@/components/side.vue'
import { UserFilled } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from '@/utils/axios'
export default {
  name: 'app',
  components: {
    side,
    UserFilled
  },
  data() {
    let store = commonStore()
    return {
      store,
      zh: zhCn,
      theme: store.theme,
      env: store.env,
      username: store.getUsername
    }
  },
  mounted() {
    window._a = this
    this.$http = axios
    // this.theme = this.store.theme
    // axios.defaults.baseURL = this.store.env === 'local' ? '/api/' : '/api-prod/'
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
          cur && this.openTab(cur)
        }
      },
      immediate: true
    },
    theme(n) {
      this.store.setTheme(n)
    },
    env(n) {
      this.store.setEnv(n)
    },
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
  &.primary,
  .el-table .el-table__inner-wrapper {
    background-color: var(--el-color-primary-light-8);
  }
  &.success {
    background-color: var(--el-color-success-light-8);
  }
  &.warning {
    background-color: var(--el-color-warning-light-8);
  }
  &.danger {
    background-color: var(--el-color-danger-light-8);
  }
  &.info {
    background-color: var(--el-color-info-light-9);
  }
  &.purple {
    background-color: #f2d6f2;
  }
  >.el-container {
    height: 100%;
    padding: 10px;
    >.el-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__header {
        position: sticky;
        top: 0;
        border-color: #999;
        .el-tabs__nav {
          border-color: #999;
        }
        .el-tabs__item {
          padding: 0 20px;
          border-color: #999;
        }
        .el-tabs__nav-wrap::after {
          height: 1px;
        }
        .el-tabs__item.is-active {
          color: #409eff;
        }
      }
      .el-tabs__content {
        flex: 1;
        overflow: auto;
      }
    }
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
.themes {
  margin-left: 8px;
  width: 150px;
  .el-radio {
    margin-right: 0;
    &:nth-child(1) {
      background-color: var(--el-color-primary-light-3);
    }
    &:nth-child(2) {
      background-color: var(--el-color-success-light-3);
    }
    &:nth-child(3) {
      background-color: var(--el-color-warning-light-3);
    }
    &:nth-child(4) {
      background-color: var(--el-color-danger-light-3);
    }
    &:nth-child(5) {
      background-color: var(--el-color-info);
    }
    &:nth-child(6) {
      background-color: purple;
    }
  }
}
</style>
