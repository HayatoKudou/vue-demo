import Router, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Todo from './components/Todo/Todo.vue'
import XLogin from './components/X/XLogin.vue'

const routes = [
    {
        path: '/',
        // name: 'Todo',
        component: Todo
    },
    {
        path: '/x-login',
        // name: 'X Login',
        component: XLogin
    }
]

const router = createRouter({
    history: createWebHistory("http://localhost:5173"),
    routes: routes satisfies RouteRecordRaw[],
  });
  
  export default router;