import { createRouter, createWebHistory } from 'vue-router'
// 自动路由配置
let routes = []
const modules = import.meta.glob('./pages/**/*.vue', { eager: true, import: 'default' })

// const modules = import.meta.glob('./pages/**/*.vue');
// 循环进入路由
/* for (let i in modules) {
  let item = modules[i];
  const routePath = item.name.replace(/(.*\/)*([^.]+)./gi, '$2');
  routes.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    component: () => import(item.name) //.vue不能省略,懒加载
  });
} */
Object.keys(modules).forEach(key => {
  const routePath = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
  // console.log('route:', routePath, modules[key])
  routes.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    label: modules[key].label, // 菜单标题
    icon: modules[key].icon, // 菜单图标
    component: modules[key]
  })
})

routes.push({
  path: '/',
  redirect: '/home'
})
// 配置router对象
const router = createRouter({
  history: createWebHistory(),
  routes
})
export { routes, router }
