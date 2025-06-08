<template>
    <div class="todo-container">
        <div class="todo-header">
            <h1>Todo</h1>
            <button 
                class="create-btn" 
                @click="openCreateModal"
            >
                新しいTodoを作成
            </button>
        </div>
        
        <TodoList ref="todoListRef" />
        
        <TodoCreateForm 
            v-model="isCreateModalOpen"
            @todo-created="handleTodoCreated"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from './TodoList.vue';
import TodoCreateForm from './TodoCreateForm.vue';

const isCreateModalOpen = ref(false);
const todoListRef = ref(null);

const openCreateModal = () => {
    isCreateModalOpen.value = true;
};

const handleTodoCreated = (newTodo) => {
    if (todoListRef.value) {
        todoListRef.value.fetchTodos();
    }
};
</script>

<style scoped>
.todo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.create-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.create-btn:hover {
    opacity: 0.9;
}
</style>