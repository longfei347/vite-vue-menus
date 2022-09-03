import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
/* const home = () => import("./pages/home.vue");
const login = () => import("./pages/login.vue");

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
]; */
// 引入 router
// 引入路由各页面配置
// import routes from './routes'
import Login from '@/pages/login.vue';
let routes = [];
const modules = import.meta.globEager('./pages/**/*.vue');

// const modules = import.meta.glob('./pages/**/*.vue');
// 循环进入路由
/* for (let i in modules) {
  let item = modules[i];
  const routePath = item.name.replace(/(.*\/)*([^.]+)./gi, '$2');
  routes.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    component: () => import(item.name) //.vue不能省略
  });
} */
Object.keys(modules).forEach(key => {
  const routePath = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  // console.log('route:', routePath);
  routes.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    component: modules[key].default //.vue不能省略
  });
});
routes.push({
  path: '/login',
  name: 'login',
  component: Login
});
routes.push({
  path: '/',
  redirect: '/home'
});
// 配置router对象
const router = createRouter({
  history: createWebHistory(),
  routes
});
export { routes, router };
