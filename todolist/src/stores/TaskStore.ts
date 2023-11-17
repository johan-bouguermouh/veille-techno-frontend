import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTagStore, type TagInterface } from './TagStore'

const { Tags } = useTagStore()

export interface StateInterface {
  idState: number
  stateName: string
}
export interface StateInteface {
  idState: number
  stateName: string
}

export interface TaskInterface {
  idTask: number
  taskName: string
  description: string
  taskIsDone: boolean
  state: StateInteface
  tag?: TagInterface | undefined
  order: number
}

export const useTaskStore = defineStore(
  'Task',
  () => {
    const States = ref<Array<StateInteface>>([
      {
        idState: 1,
        stateName: 'A faire'
      },
      {
        idState: 2,
        stateName: 'En cours'
      },
      {
        idState: 3,
        stateName: 'Terminé'
      }
    ])
    const Tasks = ref<Array<TaskInterface>>([
      {
        taskName: "Tâche d'exemple en court",
        idTask: 1,
        description: 'Ceci est une description',
        taskIsDone: false,
        tag: Tags[0],
        order: 1,
        state: States.value[1]
      },
      {
        taskName: 'Tâche terminée',
        idTask: 2,
        description: 'Ceci est une description',
        taskIsDone: true,
        tag: Tags[1],
        order: 2,
        state: States.value[2]
      },
      {
        taskName: 'Tâche custom',
        idTask: 3,
        description: 'Ceci est une description',
        taskIsDone: false,
        tag: Tags[2],
        order: 3,
        state: States.value[0]
      }
    ])

    /**
     * @define Récupère toutes les tâches triées par colonne
     * @returns {Array<any>}
     */
    function getTasksSortedByColumn() {
      // for each colomn get tasks sorted by order
      const tasksSortedByColumn: any = []
      States.value.forEach((state, index) => {
        tasksSortedByColumn.push({
          columnName: state.stateName,
          columnId: index + 1,
          tasks: Tasks.value
            .filter((task) => task.state.idState === state.idState)
            .sort((a, b) => a.order - b.order)
        })
      })
      return tasksSortedByColumn
    }

    /**
     * @description Récupère toutes les tâches par order
     * @returns {Array<TaskInterface>}
     * @memberof useCounterStore
     * @example
     * getTasks()
     * // return Tasks
     */
    function getTasks(): Array<TaskInterface> {
      return Tasks.value.sort((a, b) => a.order - b.order)
    }

    /**
     * @description Récupère une tâche par son id
     * @param {number} idTask
     * @returns {TaskInterface}
     * @memberof useCounterStore
     * @example
     * getTask(1)
     */
    function getTask(idTask: number): any {
      const thisTask: any = Tasks.value.find((task) => task.idTask === idTask)
      return thisTask
    }

    /**
     * @description Récupère par Tags
     * @param {number} idTag
     * @returns {Array<TaskInterface>}
     * @memberof useCounterStore
     * @example
     * getTasksByTag(1)
     */
    function getTasksByTag(idTag: number): Array<TaskInterface> {
      return Tasks.value.filter((task) => task.tag?.idTag === idTag)
    }

    /**
     * @description Ajoute une task au tableau
     * @param {TaskInterface} task
     * @memberof useCounterStore
     * @example
     * addTask({
     * taskName: 'Tâche custom',
     * description: 'Ceci est une description',
     * taskIsDone: false,
     * tag: Tags[2],
     */
    function addTask(task: TaskInterface): void {
      Tasks.value.push(task)
    }

    /**
     * @define Modifie une task du tableau
     * @param {TaskInterface} task
     * @memberof useCounterStore
     * @example
     * updateTask({
     * taskName: 'Tâche custom',
     * description: 'Ceci est une description',
     * taskIsDone: false,
     * tag: Tags[2],
     * idTask: 1,
     * order: 1,
     * state: States[0]
     * })
     * // return void
     */
    function updateTask(task: TaskInterface): void {
      console.log('task on store =>', task)
      const index = Tasks.value.findIndex((task) => task.idTask === task.idTask)
      Tasks.value[index] = task

      console.log(Tasks)
    }

    /**
     * @description Supprime une task du tableau
     * @param {number} idTask
     * @memberof useCounterStore
     * @example
     * deleteTask(1)
     */
    function deleteTask(idTask: number): void {
      const index = Tasks.value.findIndex((task) => task.idTask === idTask)
      Tasks.value.splice(index, 1)
    }

    /**
     * @description Modifie l'id d'un tag sur une task
     * @param {number} idTask
     * @param {number} idTag
     * @memberof useCounterStore
     * @example
     * updateTaskTag(1, 2)
     */
    function updateTaskTag(idTask: number, idTag: number): void {
      const index = Tasks.value.findIndex((task) => task.idTask === idTask)
      Tasks.value[index].tag = Tags.find((tag) => tag.idTag === idTag)
    }

    /**
     * @description Modifie l'ordre d'une task
     * @param {number} idTask
     * @param {number} order
     * @memberof useCounterStore
     * @example
     * updateTaskOrder(1, 2)
     */
    function updateTaskOrder(idTask: number, order: number): void {
      const index = Tasks.value.findIndex((task) => task.idTask === idTask)
      Tasks.value[index].order = order
    }

    /**
     * @define Récupère un state par son id
     * @param {number} idState
     * @returns {StateInteface}
     */
    function findStateById(idState: number | string): StateInteface {
      if (idState) {
        if (typeof idState === 'string') {
          idState = parseInt(idState)
        }
        const stateFinded = States.value.find((state) => state.idState === idState)
        if (stateFinded) {
          return stateFinded
        } else {
          return States.value[2]
        }
      } else {
        return States.value[2]
      }
    }

    /**
     * @define Trouver un state par son nom
     * @param {string} stateName
     * @returns {StateInteface}
     * @memberof useCounterStore
     * @example
     * findStateByName('A faire')
     * // return States[0]
     */
    function findStateByName(stateName: string): StateInteface {
      if (stateName) {
        const stateFinded = States.value.find((state) => state.stateName === stateName)
        if (stateFinded) {
          return stateFinded
        } else {
          return States.value[0]
        }
      } else {
        return States.value[0]
      }
    }

    /**
     * @description Compte le nombre de tâches
     * @returns {number}
     * @memberof useCounterStore
     * @example
     * countTasks()
     * // return 3
     */
    function countTasks(): number {
      return Tasks.value.length
    }

    /**
     * @define Récupérer tout les states existants
     * @returns {Array<StateInteface>}
     * @memberof useCounterStore
     * @example
     * getStates()
     * // return States
     */
    function getStates(): Array<StateInteface> {
      return States.value
    }

    /**
     * @define Défini si une idTask est présente dans le tableau
     * @param {number} idTask
     * @returns {boolean}
     * @memberof useCounterStore
     * @example
     * isIdTaskValid(1)
     * // return true
     */
    function isIdTaskValid(idTask: number): boolean {
      return Tasks.value.some((task) => task.idTask === idTask)
    }

    return {
      Tasks,
      getTasksSortedByColumn,
      getTasks,
      getTask,
      getTasksByTag,
      addTask,
      updateTask,
      deleteTask,
      updateTaskTag,
      updateTaskOrder,
      countTasks,
      findStateById,
      findStateByName,
      getStates,
      isIdTaskValid
    }
  },
  {
    persist: true
  }
)
