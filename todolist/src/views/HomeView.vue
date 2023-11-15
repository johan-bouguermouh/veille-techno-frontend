<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import ListeComponent from '@/components/ListeComponent.vue'
/** @define store de tasks de la todoliste */
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue'

const { getTasks, getTasksSortedByColumn } = useCounterStore()
//console.log(getTasksSortedByColumn())
const taskList = ref(getTasks())
const columns = ref(getTasksSortedByColumn())
</script>

<template>
  <main>
    <ListeComponent
      todoMListName="Ma todo liste"
      :ListTasks="taskList"
      :columns="columns"
    ></ListeComponent>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: calc(100vh - 90px);
  padding: 36px;
}
</style>
