import { createPinia } from 'pinia';

const store = createPinia();

import { defineStore } from 'pinia';

export const commonStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      username: '张三',
      tabs: [],
      currentTab: '',
      token: ''
    };
  },
  getters: {
    getUsername: state => state.username,
    getTabs: state => state.tabs,
    getToken: state => state.token,
    getCurrentTab: state => state.currentTab
  },
  actions: {
    setUsername(name) {
      this.username = name;
    },
    setTabs(tabs) {
      this.tabs = tabs;
    },
    setCurrentTab(tab) {
      this.currentTab = tab;
    },
    setToken(token) {
      this.token = token;
    }
  }
});

export default store;
