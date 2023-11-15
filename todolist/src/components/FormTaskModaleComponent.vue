//Component for modal form to add new task or edit existing task
<script setup lang="ts">
import { defineProps } from 'vue'
import { useCounterStore, type TaskInterface } from '@/stores/counter'
import { ref, watch, onMounted } from 'vue'
import { computed } from 'vue'

let isFirstUpdate = true
const props = defineProps<{
  isOpen: boolean
  idState: number
  selectedTask?: TaskInterface | undefined
  handleIsOpen: (value: boolean) => void
}>()

const { addTask, countTasks, findStateById, getTags, getStates } = useCounterStore()

//console.log(props.selectedTask)
const thisTask = ref<TaskInterface>({
  idTask: 0,
  taskName: '',
  description: '',
  taskIsDone: false, // add this
  order: 0, // add this
  tag: {
    idTag: 0,
    tagName: '',
    tagColor: ''
  },
  state: {
    idState: 0,
    stateName: ''
  }
})

console.log(thisTask.value)
const tags = ref(getTags())
const states = ref(getStates())
const title = computed(() => {
  return props.selectedTask ? 'Modifier la tâche' : 'Ajouter une tâche'
})

const closeModale = ($event: any) => {
  if ($event.composedPath()[0].className === 'wrappe-modal-form-task') {
    isFirstUpdate = true
    props.handleIsOpen(false)
  }
}

onMounted(() => {
  thisTask.value = props.selectedTask
    ? props.selectedTask
    : {
        idTask: countTasks() + 1,
        order: countTasks() + 1,
        taskName: '',
        description: '',
        state: findStateById(props.idState),
        taskIsDone: false
      }
})

watch(props, (e) => {
  const { isOpen, idState, selectedTask, handleIsOpen } = e
  console.log(e)
})
</script>
// @submit.prevent="addTask(thisTask)"
<template>
  <div v-if="isOpen" class="wrappe-modal-form-task" @click="closeModale($event)">
    <div>
      <h1>{{ title }}</h1>
      <hr />
      <form class="form-task" action="">
        <div>
          <fieldset>
            <legend>Titre du ticket</legend>
            <input name="taskName" type="text" v-model="thisTask.taskName" />
          </fieldset>
          <fieldset>
            <legend>Description</legend>
            <textarea v-model="thisTask.description"></textarea>
          </fieldset>
          <fieldset>
            <legend>Choisir un tag</legend>
            <select name="tag">
              <option value="0">Choisir un tag</option>
              <option
                v-for="tag in tags"
                :key="tag.idTag"
                :value="tag.idTag"
                :selected="tag.idTag === thisTask?.tag?.idTag"
              >
                {{ tag.tagName }}
              </option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Changer l'état</legend>
            <select name="state">
              <option value="0">Choisir un état</option>
              <option
                v-for="state in states"
                :key="state.idState"
                :value="state.idState"
                :selected="state.idState === thisTask?.state?.idState"
              >
                {{ state.stateName }}
              </option>
            </select>
          </fieldset>
        </div>
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

.form-task {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
}

.form-task > div {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
}

fieldset {
  border: 0.5px solid #00000033;
  border-radius: 4px;
  color: #000000ed;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
}
fieldset legend {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0 4px;
  margin: 0;
}

fieldset input,
textarea {
  width: 100%;
  padding: 4px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  color: #000000ed;
}

button[type='submit'] {
  justify-self: flex-end;
  align-self: flex-end;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 15px;
  border: none;
  background-color: #640bad;
  color: #ffffff;
  min-width: 90px;
  min-height: 44px;
}
button[type='submit']:hover {
  background-color: #640badcc;
  cursor: pointer;
  box-shadow: 0px 3px 10px 0px #00000033;
}
</style>
