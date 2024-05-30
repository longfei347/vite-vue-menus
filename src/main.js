import { createApp } from 'vue'
import App from './App.vue'
import { router, routes } from './router'
import store, { commonStore } from './store'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
let app = createApp(App)
app.use(router)
app.use(store)
routes.forEach(itm => {
  itm.name && app.component(itm.name, itm.component)
})

// app.config.globalProperties.$http = request
// app.config.globalProperties.$router = router;
app.config.globalProperties.$commonStore = commonStore
app.config.globalProperties.$message = ElMessage

app.mount('#app')
window._app = app
