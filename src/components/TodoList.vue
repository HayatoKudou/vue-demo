<template>
  <div class="todo-list">
    <div v-if="loading" class="loading">読み込み中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="todos.length === 0" class="empty-state">
      登録されたTodoはありません。
    </div>
    <table v-else class="todo-table">
      <thead>
        <tr>
          <th>状態</th>
          <th>タイトル</th>
          <th>説明</th>
          <th>期限日</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index" :class="{ 'completed': todo.completed }">
          <td class="status-cell">
            <input 
              type="checkbox" 
              :checked="todo.completed" 
              @change="toggleTodoStatus(todo, index)"
            />
          </td>
          <td class="title-cell">{{ todo.title }}</td>
          <td class="description-cell">{{ todo.description }}</td>
          <td class="date-cell">{{ formatDate(todo.dueDate) }}</td>
          <td class="actions-cell">
            <button class="action-btn edit-btn" @click="editTodo(todo, index)">編集</button>
            <button class="action-btn delete-btn" @click="deleteTodo(todo, index)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import { TodoControllerService } from '../api/generated/services/TodoControllerService';
import { TodoDTO } from '../api/generated/models/TodoDTO';

const loading = ref(true);
const error = ref<string | null>(null);
const todos = ref<TodoDTO[]>([]);

const fetchTodos = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    todos.value = await TodoControllerService.get();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'データの取得中にエラーが発生しました';
  } finally {
    loading.value = false;
  }
};

defineExpose({
  fetchTodos
});

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '未設定';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

// Todo状態の切り替え
const toggleTodoStatus = (todo: TodoDTO, index: number) => {
  // 実際にはここでAPIを呼び出してサーバー側のデータを更新する処理を追加
  // 現在はフロントエンドの表示のみ切り替え
  todo.completed = !todo.completed;
};

// Todo編集
const editTodo = (todo: TodoDTO, index: number) => {
  // 編集機能の実装（将来の機能）
  console.log('編集:', todo);
};

const deleteTodo = (todo: TodoDTO, index: number) => {
  console.log('削除:', todo);
  // 確認ダイアログを表示してから削除するなどの処理を追加
};

onMounted(fetchTodos);
</script>

<style scoped>
.todo-list {
  margin: 20px 0;
  width: 100%;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 20px 0;
}

.error {
  color: #dc3545;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

tr:hover {
  background-color: #f5f5f5;
}

tr.completed {
  background-color: #f0f8f0;
}

tr.completed .title-cell,
tr.completed .description-cell {
  text-decoration: line-through;
  color: #6c757d;
}

.status-cell {
  width: 60px;
  text-align: center;
}

.title-cell {
  font-weight: 500;
}

.description-cell {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-cell {
  width: 120px;
  white-space: nowrap;
}

.actions-cell {
  width: 150px;
  white-space: nowrap;
}

.action-btn {
  padding: 4px 8px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.edit-btn {
  background-color: #4dabf7;
  color: white;
}

.delete-btn {
  background-color: #fa5252;
  color: white;
}

.action-btn:hover {
  opacity: 0.9;
}
</style> 