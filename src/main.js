import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import { router, routes } from './router'
import store, { commonStore } from './store'
import request from '@/utils/axios'
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ElMessage } from 'element-plus'
let app = createApp(App)
// console.log('router:', router.getRoutes());
// app.use(ElementPlus, {
//   locale: zhCn
// });
app.use(router)
app.use(store)
routes.forEach(itm => {
  // console.log('cmp:', itm.name, itm.component);
  itm.name && app.component(itm.name, itm.component)
})

app.config.globalProperties.$http = request
// app.config.globalProperties.$router = router;
app.config.globalProperties.$commonStore = commonStore
app.config.globalProperties.$message = ElMessage

app.mount('#app')
window._app = app
