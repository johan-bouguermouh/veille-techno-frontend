//Component for modal form to add new task or edit existing task
<script setup lang="ts">
import { defineProps } from 'vue'
import { useCounterStore, type TaskInterface } from '@/stores/counter'
import { ref } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  idState: number
  selectedTask: TaskInterface
}>()

const { addTask, countTasks, findStateById } = useCounterStore()
const thisTask: TaskInterface = props.selectedTask
  ? props.selectedTask
  : {
      idTask: countTasks() + 1,
      order: countTasks() + 1,
      taskName: '',
      description: '',
      state: findStateById(props.idState),
      taskIsDone: false
    }

const title = computed(() => {
  return props.selectedTask ? 'Modifier la tâche' : 'Ajouter une tâche'
})
</script>
// @submit.prevent="addTask(thisTask)"
<template>
  <div v-if="isOpen" class="wrappe-modal-form-task">
    <div>
      <h1>{{ title }}</h1>
      <hr />
      <form class="form-task" action="">
        <input type="text" v-model="thisTask.taskName" />
        <textarea v-model="thisTask.description"></textarea>
        <button type="submit">Valider</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrappe-modal-form-task {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(5px);
}
.wrappe-modal-form-task > div {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 10px 0px #00000033;
  padding: 12px;
  height: 50vh;
  width: 50vw;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
