<template>
    <el-container id="layout" v-if="token">
        <el-header class="blog_header">
            <!-- <div class="blog_header"> -->
            <div class="header-left">
                <img class="blog_logo" src="@/assets/logo.png" />
                <span class="blog_info">课堂笔记</span>
            </div>
            <div class="header-right">
                <span class="user_info">你好 {{ userInfo.nick }} ,当前角色 {{ userInfo.roles }}</span>
                <el-button type="text" class="logout" @click="logout()">退出</el-button>
            </div>
            <!-- </div> -->
        </el-header>
        <el-container>
            <el-aside width="200px" class="left-nav">
                <LeftNav />
            </el-aside>
            <el-main class="main-content">
                <!-- <div class="content-main"> -->
                <el-tabs v-model="mainTabsActive" :closable="true" @tab-click="selectedTabHandle" @tab-remove="closeTab">
                    <el-tab-pane v-for="t in mainTabs" :key="t.path" :label="t.label" :name="t.path">
                        <component :is="t.name" :path="t.path" @openTab="openTab" @closeTab="closeTab"></component>
                    </el-tab-pane>
                </el-tabs>
                <!-- </div> -->
            </el-main>
        </el-container>
    </el-container>
    <Login v-else></Login>
</template>
<script>
import LeftNav from '@/components/LeftNav.vue';
import Login from '@/page/user/login.vue';
import { commonStore } from '@/store/common';
import { routes } from '@/router';
export default {
    name: 'App',
    components: {
        LeftNav,
        Login
    },
    data() {
        let store = commonStore();
        return {
            msg: '',
            store,
            userInfo: store.userInfo
        };
    },
    watch: {
        '$route.fullPath'(n) {
            console.log(n); // /BlogDetail?bid=wLuJcX8BJswWrqE8LJBd
            let tab = routes.find(item => item.path == n.split('?')[0]);
            console.log('watch tab ', tab);
            if (n !== '/Login' && this.store.mainTabs.length == 0 && tab) {
                this.store.mainTabs.push({
                    name: tab.name,
                    path: n,
                    label: '博客详情'
                });

                this.store.mainTabsActive = n;
            }
        }
    },
    methods: {
        openTab(tab) {
            console.log('openTab  ', tab);
            if (!this.store.mainTabs.find(item => item.path == tab.path)) {
                this.store.mainTabs.push(tab);
            }
            this.store.mainTabsActive = tab.path;
            this.$router.push(tab.path);
        },
        closeTab(tabUrl) {
            console.log('closeTab', tabUrl);
            let curIndex = this.store.mainTabs.findIndex(item => item.path === tabUrl);
            let nextActiveTab = this.store.mainTabs[curIndex + 1] || this.store.mainTabs[curIndex - 1];

            this.store.mainTabs.splice(curIndex, 1);
            if (nextActiveTab) {
                this.store.mainTabsActive = nextActiveTab.path;
                this.$router.push(nextActiveTab.path);
            } else {
                let tab = {
                    label: '博客浏览',
                    name: 'BlogListView',
                    path: 'BlogListView'
                };
                this.$router.push(tab.path);
            }
        },
        selectedTabHandle({ props }) {
            console.log('selectedTabHandle', props);
            this.store.mainTabsActive = props.name;
            this.$router.push(props.name);
        },
        logout: function () {
            this.store.$patch({
                mainTabs: [],
                mainTabsActive: '',
                token: ''
            });

            document.cookie = 'csom-token=; expires=' + new Date(0).toUTCString();
            this.$message.success('已安全退出登录, Bye bye ~');
            this.$router.push('/login');
        }
    },
    computed: {
        token() {
            let cookies = document.cookie.match(/csom-token=([^; ]*)(; |$)/);
            if (cookies && !this.store.token) {
                this.store.setToken(cookies[1]);
            }
            return this.store.token;
        },
        mainTabs() {
            return this.store.getMainTabs;
        },
        mainTabsActive() {
            return this.store.getMainTabsActive;
        }
    },
    mounted() {
        window.__vue = this;
        if (sessionStorage.getItem('store')) {
            this.store.$patch(JSON.parse(sessionStorage.getItem('store')));
            sessionStorage.removeItem('store');
        }

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem(
                'store',
                JSON.stringify({
                    token: this.store.token,
                    userInfo: this.store.userInfo,
                    mainTabs: this.store.mainTabs,
                    mainTabsActive: this.store.mainTabsActive
                })
            );
        });
    }
};
</script>
<style scoped>
body {
    margin: 0px;
    padding: 0px;
}
.blog_header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: rgb(17, 24, 39);
    color: aliceblue;
}
.header-left {
    width: 200px;
    display: flex;
    align-items: end;
}
.header-left .blog_logo {
    width: 45px;
}

.header-right {
    padding-top: 35px;
}
</style>
