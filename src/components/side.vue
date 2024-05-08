<template>
  <el-row class="tac">
    <!-- <el-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col> -->
    <el-col>
      <h5 class="mb-2">菜单列表</h5>
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
    return {
      isCollapse: false,
      menu: [
        {
          name: 'home',
          label: '主页',
          icon: 'HomeFilled',
          path: '/home'
        },
        {
          name: 'news',
          label: '新闻列表',
          icon: 'List',
          path: '/news'
        },
        {
          name: 'news-detail',
          label: '新闻详情',
          icon: 'Reading',
          path: '/news-detail'
        },
        {
          name: 'kilo',
          label: '摄像头列表',
          icon: 'Reading',
          path: '/kilo'
        },
        {
          name: 'user',
          label: '用户列表',
          icon: 'Reading',
          path: '/user'
        },
        {
          name: 'prod',
          label: '产品',
          children: [
            {
              name: 'todo',
              label: '待办',
              path: '/todo'
            },
            {
              name: 'demo',
              label: 'demo',
              path: '/demo'
            },
            {
              name: 'prod1',
              label: '产品1',
              path: '/prod1'
            }
          ]
        }
      ]
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
      console.log('tab:', tab)
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
