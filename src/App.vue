<template>
  <main class="main" v-if="token">
    <side />
    <el-container>
      <header>
        <el-tabs type="card" @tab-remove="removeTab" @tab-click="clickTab" v-model="currentTabs" closable>
          <el-tab-pane v-for="itm in tabs" :key="itm" :name="itm.path" :label="itm.label" :path="itm.path">
            <component :is="itm.name" :path="itm.path" @openTab="openTab"></component>
            <!-- <p>{{ itm.name }}</p> -->
          </el-tab-pane>
        </el-tabs>
      </header>
      <!-- <router-view /> -->
    </el-container>
  </main>
  <router-view v-else></router-view>

  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import * as routers from 'vue-router';
import { commonStore } from './store';
import side from './components/side.vue';
// import {RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue';
// console.log('router:', routers);
window._router = routers.useRouter();
export default {
  name: 'app',
  components: {
    side
  },
  data() {
    return {
      currentTabs1: 'tab1',
      tabs1: [
        {
          name: 'tab1',
          label: 'page1',
          path: '/tab1'
        },
        {
          name: 'tab2',
          label: 'page2',
          path: '/tab2'
        },
        {
          name: 'tab3',
          label: 'page3',
          path: '/tab3'
        }
      ]
    };
  },
  mounted() {
    window._a = this;
  },
  methods: {
    removeTab(val) {
      // console.log('val:', val);
      let ind = this.tabs.findIndex(itm => itm.path === val);
      let next = this.tabs[ind + 1] || this.tabs[ind - 1];
      this.tabs.splice(ind, 1);
      if (next) {
        this.currentTabs = next.path;
      }
    },
    openTab(tab) {
      // console.log('tab:', tab);
      if (!this.tabs.find(itm => itm.path === tab.path)) {
        this.tabs.push(tab);
      }
      this.currentTabs = tab.path;
      this.$router.push(tab.path);
    },
    clickTab(v) {
      this.$router.push(v.paneName);
    }
  },
  watch: {
    token(token) {
      // console.log('token:', token);
    }
  },
  computed: {
    token() {
      return commonStore().getToken || sessionStorage.token;
    },
    currentTabs: {
      get() {
        return commonStore().getCurrentTab;
      },
      set(val) {
        commonStore().setCurrentTab(val);
      }
    },
    tabs: {
      get() {
        return commonStore().getTabs;
      },
      set(val) {
        commonStore().setTabs(val);
      }
    }
  }
};
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
  .el-container {
    padding: 0 10px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
