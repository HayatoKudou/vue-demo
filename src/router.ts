import Router, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Todo from './components/Todo.vue'

const routes = [
    {
        path: '/test',
        name: 'home',
        component: Todo
    }
]

const router = createRouter({
    history: createWebHistory("http://localhost:5173"),
    routes: routes satisfies RouteRecordRaw[],
  });
  
  export default router;