import { createPinia, defineStore } from 'pinia'

const store = createPinia()

export const commonStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      username: '张三',
      tabs: [],
      menu: [],
      currentTab: '',
      theme: '',
      token: ''
    }
  },
  // computed修饰一些值
  getters: {
    getUsername: state => state.username,
    getTabs: state => state.tabs,
    getToken: state => state.token,
    getMenu: state => state.menu,
    getCurrentTab: state => state.currentTab
  },
  // methods可以同步,异步,提交state
  actions: {
    setUsername(name) {
      this.username = name
    },
    setMenu(menu) {
      this.menu = menu
    },
    setTabs(tabs) {
      this.tabs = tabs
    },
    setCurrentTab(tab) {
      this.currentTab = tab
    },
    setToken(token) {
      this.token = token
    },
    setTheme(theme) {
      this.theme = theme
    }
  }
})
// 自定义持久化插件

const piniaPlugin = options => {
  const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getStorage = key => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
  }
  return context => {
    const { store } = context
    const data = getStorage(`${options?.key || 'long'}-${store.$id}`)
    store.$subscribe(() => {
      setStorage(`${options?.key || 'long'}-${store.$id}`, toRaw(store.$state))
    })
    return {
      ...data
    }
  }
}
store.use(
  piniaPlugin({
    key: 'long'
  })
)
export default store
