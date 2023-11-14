import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface TagInterface {
  tagName: string
  idTag: number
  tagColor?: string
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
  tag?: TagInterface
  order: number
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const States: Array<StateInteface> = [
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
  ]
  const Tags: Array<TagInterface> = [
    {
      idTag: 1,
      tagName: 'mineur',
      tagColor: '#fb5607'
    },
    {
      idTag: 2,
      tagName: 'moyen',
      tagColor: '#ff006e'
    },
    {
      idTag: 3,
      tagName: 'haut',
      tagColor: '#8338ec'
    }
  ]
  const Tasks: Array<TaskInterface> = [
    {
      taskName: "Tâche d'exemple en court",
      idTask: 1,
      description: 'Ceci est une description',
      taskIsDone: false,
      tag: Tags[0],
      order: 1,
      state: States[1]
    },
    {
      taskName: 'Tâche terminée',
      idTask: 2,
      description: 'Ceci est une description',
      taskIsDone: true,
      tag: Tags[1],
      order: 2,
      state: States[2]
    },
    {
      taskName: 'Tâche custom',
      idTask: 3,
      description: 'Ceci est une description',
      taskIsDone: false,
      tag: Tags[2],
      order: 3,
      state: States[0]
    }
  ]

  function getTasksSortedByColumn() {
    // for each colomn get tasks sorted by order
    const tasksSortedByColumn: any = []
    States.forEach((state, index) => {
      tasksSortedByColumn.push({
        columnName: state.stateName,
        columnId: index + 1,
        tasks: Tasks.filter((task) => task.state.idState === state.idState).sort(
          (a, b) => a.order - b.order
        )
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
    // return Tasks
    return Tasks.sort((a, b) => a.order - b.order)
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
    const thisTask: any = Tasks.find((task) => task.idTask === idTask)
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
    return Tasks.filter((task) => task.tag?.idTag === idTag)
  }

  /**
   * @description Ajoute une task au tableau
   * @param {string} taskName
   * @param {string} description
   * @param {boolean} taskIsDone
   * @param {number} idTag
   * @memberof useCounterStore
   * @example
   * addTask({
   * taskName: 'Tâche custom',
   * description: 'Ceci est une description',
   * taskIsDone: false,
   * tag: Tags[2],
   */
  function addTask(
    taskName: string,
    description: string,
    taskIsDone?: boolean,
    idTag?: number,
    idState?: number
  ): void {
    const task: TaskInterface = {
      taskName,
      description,
      taskIsDone: taskIsDone || false,
      tag: idTag ? Tags.find((tag) => tag.idTag === idTag) : undefined,
      idTask: Tasks.length + 1,
      order: Tasks.length + 1,
      state: idState ? findStateById(idState) : States[0]
    }

    Tasks.push(task)
  }

  /**
   * @description Supprime une task du tableau
   * @param {number} idTask
   * @memberof useCounterStore
   * @example
   * deleteTask(1)
   */
  function deleteTask(idTask: number): void {
    const index = Tasks.findIndex((task) => task.idTask === idTask)
    Tasks.splice(index, 1)
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
    const index = Tasks.findIndex((task) => task.idTask === idTask)
    Tasks[index].tag = Tags.find((tag) => tag.idTag === idTag)
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
    const index = Tasks.findIndex((task) => task.idTask === idTask)
    Tasks[index].order = order
  }

  /**
   * @define Récupère un state par son id
   * @param {number} idState
   * @returns {StateInteface}
   */
  function findStateById(idState: number): StateInteface {
    if (idState) {
      const stateFinded = States.find((state) => state.idState === idState)
      if (stateFinded) {
        return stateFinded
      } else {
        return States[0]
      }
    } else {
      return States[0]
    }
  }

  return {
    count,
    doubleCount,
    getTasksSortedByColumn,
    getTasks,
    getTask,
    getTasksByTag,
    addTask,
    deleteTask,
    updateTaskTag,
    updateTaskOrder
  }
})
