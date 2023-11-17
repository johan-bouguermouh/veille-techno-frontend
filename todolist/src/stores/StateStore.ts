import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface StateInterface {
  idState: number
  stateName: string
}

export const useStateStore = defineStore(
  'State',
  () => {
    const States = ref<Array<StateInterface>>([
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

    /**
     * @define Récupère un state par son id
     * @param {number} idState
     * @returns {StateInteface}
     */
    function findStateById(idState: number | string): StateInterface {
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
    function findStateByName(stateName: string): StateInterface {
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
     * @define Récupérer tout les states existants
     * @returns {Array<StateInteface>}
     * @memberof useCounterStore
     * @example
     * getStates()
     * // return States
     */
    function getStates(): Array<StateInterface> {
      return States.value
    }

    return {
      States,
      findStateById,
      findStateByName,
      getStates
    }
  },
  {
    persist: true
  }
)
