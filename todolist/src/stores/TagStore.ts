import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface TagInterface {
  tagName: string
  idTag: number
  tagColor?: string
}

export const useTagStore = defineStore(
  'Tag',
  () => {
    const Tags = ref<Array<TagInterface>>([
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
    ])

    /**
     * @define Récupérer tout les tags existants
     * @returns {Array<TagInterface>}
     * @memberof useCounterStore
     * @example
     * getTags()
     * // return Tags
     */
    function getTags(): Array<TagInterface> {
      return Tags.value
    }

    /**
     * @define Récupère un tag par son id
     * @param {number} idTag
     * @returns {TagInterface}
     * @memberof useCounterStore
     * @example
     * findTagById(1)
     * // return Tags[0]
     */
    function findTagById(idTag: number | string): TagInterface {
      //si c'est une string on la parse en number
      if (typeof idTag === 'string') {
        idTag = parseInt(idTag)
      }
      const tagsFinded = Tags.value.find((tag) => tag.idTag == idTag)
      console.log('tagsFinded =>', tagsFinded)
      if (tagsFinded) {
        return tagsFinded
      } else {
        return Tags.value[0]
      }
    }

    return {
      Tags,
      getTags,
      findTagById
    }
  },
  {
    persist: true
  }
)
