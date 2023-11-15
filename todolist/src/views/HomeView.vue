<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import ListeComponent from '@/components/ListeComponent.vue'
/** @define store de tasks de la todoliste */
import { useCounterStore } from '@/stores/counter'
import { ref, watch, onMounted } from 'vue'

const { getTasksSortedByColumn, Tasks } = useCounterStore()
//console.log(getTasksSortedByColumn())
const columns = ref([])

//console/log task on changement de task
onMounted(() => {
  //console.log('Mounted IN HOME VIEW')
  columns.value = getTasksSortedByColumn()
})

// si Task change on force le refrech de la vue
watch(Tasks, () => {
  console.log('watch IN HOME VIEW =>', Tasks)
  columns.value = getTasksSortedByColumn()
})
</script>

<template>
  <main>
    <ListeComponent todoMListName="Ma todo liste" :columns="columns"></ListeComponent>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: calc(100vh - 90px);
  padding: 36px;
}
</style>
