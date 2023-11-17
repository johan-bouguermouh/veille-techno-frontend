<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import ListeComponent from '@/components/ListeComponent.vue'
import MultiSelectComponent from '@/components/multiSelectComponent.vue'
/** @define store de tasks de la todoliste */
import { useTaskStore, type TagInterface, type TaskInterface } from '@/stores/TaskStore.js'
import { ref, watch, onMounted } from 'vue'

const { getTasksSortedByColumn, Tasks, getTags } = useTaskStore()
const columns = ref([])
const filterTagControl = ref<TagInterface[] | null[]>([])

onMounted(() => {
  columns.value = getTasksSortedByColumn()
})

watch([Tasks, filterTagControl], () => {
  if (filterTagControl.value.length > 0) {
    columns.value = getTasksSortedByColumn().map((column: any) => {
      return {
        ...column,
        tasks: column.tasks.filter((task: TaskInterface) => {
          return filterTagControl.value.some((tag: TagInterface | any) => {
            return tag.idTag === task.tag?.idTag
          })
        })
      }
    })
    return
  }
  columns.value = getTasksSortedByColumn()
})

/** @define Handler qui met à jour le filtre de tag filterTagControl
 * @param value TagInterface[] | null
 * @depends filterTagControl
 * @returns void
 */
const controlerFilterTag = (value: TagInterface[] | null) => {
  if (value !== null) {
    filterTagControl.value = value
    return
  }
}
</script>

<template>
  <main>
    <div class="customState">
      <MultiSelectComponent
        :options="getTags()"
        label="Filtrer par Tags"
        :handleValue="controlerFilterTag"
        propsNameLabelList="tagName"
      />
    </div>
    <ListeComponent todoMListName="Ma todo liste" :columns="columns"></ListeComponent>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: calc(100vh - 90px);
  padding: 36px;
}
.customState {
  width: 200px;
}
</style>
