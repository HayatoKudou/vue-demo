<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>新しいTodoを作成</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <form @submit.prevent="createTodo">
        <div class="form-group">
          <label for="title">タイトル</label>
          <input 
            id="title" 
            v-model="todoData.title" 
            type="text" 
            class="form-control" 
            placeholder="Todoのタイトルを入力" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description">説明</label>
          <textarea 
            id="description" 
            v-model="todoData.description" 
            class="form-control" 
            placeholder="詳細な説明を入力"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="dueDate">期限日</label>
          <input 
            id="dueDate" 
            v-model="todoData.dueDate" 
            type="date" 
            class="form-control"
          />
        </div>
        
        
        <div class="form-check">
          <input 
            id="aiAnalysis" 
            v-model="todoData.isAiAnalysisEnabled" 
            type="checkbox" 
            class="form-check-input"
          />
          <label for="aiAnalysis" class="form-check-label">AI分析を使用する</label>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">作成</button>
          <button type="button" @click="closeModal" class="btn btn-secondary">キャンセル</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import { TodoPostData } from '../api/generated/models/TodoPostData';
import { TodoControllerService } from '../api/generated/services/TodoControllerService';

// フォーム用の拡張された型
interface TodoFormData extends TodoPostData {
  isAiAnalysisEnabled: boolean;
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'todo-created']);

const closeModal = () => {
  emit('update:modelValue', false);
};

const todoData = ref<TodoFormData>({
  title: '',
  description: '',
  dueDate: '',
  isAiAnalysisEnabled: false
});

const createTodo = async () => {
  try {
    // APIリクエスト用のデータを作成（isAiAnalysisEnabledも含む）
    const requestData = {
      title: todoData.value.title,
      description: todoData.value.description,
      dueDate: todoData.value.dueDate,
      isAiAnalysisEnabled: todoData.value.isAiAnalysisEnabled
    };
    
    const response = await TodoControllerService.post(requestData as any);
    console.log('Todo作成成功:', response);
    emit('todo-created', response);
    resetForm();
    closeModal();
  } catch (error) {
    console.error('Todo作成エラー:', error);
  }
};

const resetForm = () => {
  todoData.value = {
    title: '',
    description: '',
    dueDate: '',
    isAiAnalysisEnabled: false
  };
};

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    resetForm();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
}

form {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-check {
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

/* スマートフォン向け調整 */
@media (max-width: 576px) {
  .modal-content {
    width: 95%;
    max-width: none;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn {
    width: 100%;
  }
}
</style>

