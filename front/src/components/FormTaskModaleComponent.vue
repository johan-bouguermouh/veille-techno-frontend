//Component for modal form to add new task or edit existing task
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTaskStore, type TaskInterface } from '@/stores/TaskStore.js'
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { type TagInterface, useTagStore } from '@/stores/TagStore'
import { type StateInterface, useStateStore } from '@/stores/StateStore'
import ModalComponent from './common/ModalComponent.vue'

const props = defineProps<{
  isOpen: boolean
  idState: number
  selectedTask?: TaskInterface | undefined
  handleIsOpen: (value: boolean) => void
}>()

const { addTask, countTasks, isIdTaskValid, deleteTask } = useTaskStore()
const { findStateById, getStates } = useStateStore()
const { getTags, findTagById } = useTagStore()

/** Référence de la tâche mise à jour par les formulaire */
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

const tags = ref<TagInterface[]>(getTags())
const states = ref<StateInterface[]>(getStates())
const title = computed(() => {
  return props.selectedTask ? 'Modifier la tâche' : 'Ajouter une tâche'
})

/** Facilite la mise à jours de la référance thisTask
 * @param $event
 * @returns void
 */
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

/** Permet de mettre à jour la référence thisTask selon l'input
 * @param $event
 * @returns void
 */
const updateSelect = ($event: any) => {
  switch ($event.target.name) {
    case 'state':
      thisTask.value.state = findStateById($event.target.value)
      break
    case 'tag':
      if ($event.target.value !== '0') {
        thisTask.value.tag = findTagById($event.target.value)
      }
      break
    default:
      break
  }
}
</script>

<template>
  <ModalComponent
    :isOpen="isOpen"
    :handleIsOpen="handleIsOpen"
    :title="title"
    :closeModaleProps="['outside', 'exit']"
  >
    <template #default>
      <form class="form-task">
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
            <select name="tag" @input="($event) => updateSelect($event)">
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
            <select name="state" @input="($event) => updateSelect($event)">
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
      </form>
    </template>
    <template #footer>
      <div class="footer-modal-form-task">
        <button
          class="button-delete"
          v-if="isIdTaskValid(thisTask.idTask)"
          @click="
            ($event) => {
              deleteTask(thisTask.idTask)
              handleIsOpen(false)
            }
          "
          type="button"
        >
          Supprimer
        </button>
        <button
          v-else
          type="button"
          class="button-submit"
          @click="
            ($event) => {
              addTask(thisTask)
              handleIsOpen(false)
            }
          "
        >
          Ajouter
        </button>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
.form-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
}

.form-task > .main-modal-form-task {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  box-sizing: border-box;
}

.button-delete {
  background-color: #e63946;
  color: #ffffff;
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

.footer-modal-form-task {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
}

button:not(.button-close) {
  justify-self: flex-end;
  align-self: flex-end;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 15px;
  border: none;
  min-width: 90px;
  min-height: 44px;
}
.button-close {
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: #000000ed;
  padding: 4px;
  border-radius: 20px;
  cursor: pointer;
}
.button-submit {
  background-color: #640bad;
  color: #ffffff;
}
.button-simple:not([type='submit']) {
  background-color: #a3a3a3;
  color: #000000ed;
  border: 1px solid #00000033;
  margin-right: 12px;
}

button:not(.button-close):hover {
  filter: brightness(1.1);
  cursor: pointer;
  box-shadow: 0px 3px 10px 0px #00000033;
}
.button-close:hover img {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
