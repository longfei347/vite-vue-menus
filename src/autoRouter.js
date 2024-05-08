import { createRouter, createWebHashHistory } from 'vue-router';
// pages中的页面，主路由
const layouts = import.meta.globEager('./pages/*.vue');
console.log('🚀 ~ import.meta.globEager:', import.meta.globEager);
// pages中的页面，子路由
const views = import.meta.globEager('./pages/**/*.vue');

// console.log('ll:', views);
function getAllRoutes() {
  const routes = [];
  Object.entries(views).forEach(([file, module]) => {
    // 通过文件路径+模块，形成路由
    // const route = getRouteByModule(file, module)
    const name = file.split('/').pop()?.split('.')[0];
    let path = file.slice(7, -4);
    // console.log('path:', path);
    // 构造route
    const route = {
      path: path,
      name: name,
      component: module.default
    };
    // 在页面中自定义路由优先于自动路由
    routes.push(Object.assign(route, module.default?.route));
  });
  return routes;
}
function getRoutes() {
  // 空数组，用于存放结果
  const layoutRoutes = [];
  Object.entries(layouts).forEach(([file, module]) => {
    // 通过文件路径+模块，形成路由
    const route = getRouteByModule(file, module);
    // 将子路由也加进来
    route.children = getChildrenRoutes(route);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}
// 遍历子路由
function getChildrenRoutes(layoutRoute) {
  // 空数组，用于存放结果
  const children = [];
  Object.entries(views).forEach(([file, module]) => {
    // 找到是views路径的，加入到子路由中
    if (file.includes(`./pages/${layoutRoute.name}`)) {
      const route = getRouteByModule(file, module);
      route.path = route.path.replace(/\//, '');
      children.push(route);
    }
  });
  return children;
}
// 文件名转路由
function getRouteByModule(file, module) {
  // ../layouts/xxx.vue 从路径中拿到xxx
  const name = file.split('/').pop()?.split('.')[0];
  // 构造route
  const route = {
    path: `/${name}`,
    name: name,
    component: module.default
  };
  // 在页面中自定义路由优先于自动路由
  return Object.assign(route, module.default?.route);
}

let router = createRouter({
  history: createWebHashHistory(),
  // routes: getRoutes()
  routes: getAllRoutes('.')
});
export default router;
