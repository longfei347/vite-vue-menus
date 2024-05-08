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
import side from './components/side.vue'
import { UserFilled } from '@element-plus/icons-vue'
export default {
  name: 'app',
  components: {
    side,
    UserFilled
  },
  data() {
    return {
      username: commonStore().getUsername
    }
  },
  mounted() {
    window._a = this
    const common = commonStore()
    // console.log('🚀 ~ mounted ~ common:', common)
    // 5种方式修改值
    // 1 common.username=xx
    // 2 this.$patch({'username', 'xx'})
    // 3 this.$patch(state => {state.username = 'xx'})
    // 4 this.$state ={username: 'xx',age:'18'}
    // 5 common.setUsername('xx') // actions异步函数
    // 6 common.$reset()
    // common.$subscribe((mutation, state) => {
    //   console.log('mutation:', mutation)
    //   console.log('state:', state)
    // })
    // common.$onAction(({name,store,args,after,onError}) => {
    //   console.log('name:', name)
    //   console.log('store:', store)
    //   console.log('args:', args)
    //   console.log('after:', after)
    //   console.log('onError:', onError)
    //
    // }
    // 懒加载方法
    /* const observer=new IntersectionObserver((entries)=>{
      if (entries[0].intersectionRatio > 0) {
        el.src=bingding.modelValue
        observer.unobserve(el)
      }
    })
    observer.observe(el) */
  },
  methods: {
    removeTab(val) {
      // console.log('val:', val);
      let ind = this.tabs.findIndex(itm => itm.path === val)
      let next = this.tabs[ind + 1] || this.tabs[ind - 1]
      this.tabs.splice(ind, 1)
      if (next) {
        this.currentTabs = next.path
      }
    },
    openTab(tab) {
      // console.log('tab:', tab);
      if (!this.tabs.find(itm => itm.path === tab.path)) {
        this.tabs.push(tab)
      }
      this.currentTabs = tab.path
      this.$router.push(tab.path)
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
    token(token) {
      // console.log('token:', token);
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  display: flex;
  position: relative;
  .el-container {
    padding: 0 10px;
  }
  .userInfo {
    position: absolute;
    right: 20px;
    top: 5px;
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
