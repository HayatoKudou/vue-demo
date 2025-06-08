import Router, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Todo from './components/Todo/Todo.vue'

const routes = [
    {
        path: '/x-login',
        name: 'home',
        component: Todo
    }
]

const router = createRouter({
    history: createWebHistory("http://localhost:5173"),
    routes: routes satisfies RouteRecordRaw[],
  });
  
  export default router;