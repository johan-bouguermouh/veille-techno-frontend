<script setup lang="ts">
import ticketTagComponent from './ticketTagComponent.vue'
const props = defineProps<{
  todoMListName: string
  ListTasks: any[]
  columns: any[]
}>()
/** On verifie si les props sont bien passées une fois ressue par le store */
console.log(props.ListTasks[0])
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ todoMListName }}</h1>
    <div class="wrapper-column">
      <div v-for="column in columns" :key="column.columnId">
        <h3>{{ column?.columnName }}</h3>
        <ul class="ulListTasks">
          <li v-for="task in column.tasks" :key="task.idTask">
            <h5>{{ task?.taskName }}</h5>
            <div class="customState">
              <ticketTagComponent :tag="task?.tag"></ticketTagComponent>
            </div>
          </li>
          <li class="buttonAddTask">
            <img
              alt="Ajouter un tâche"
              src="@/assets/iconSVG/add-outline.svg"
              width="20"
              height="20"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
.greetings {
  background-color: #ffffffb9;
  border-radius: 8px;
  box-shadow: 0px 3px 10px 0px #00000033;
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.wrapper-column {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 12px;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}
.wrapper-column > div {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.ulListTasks {
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  background-color: #f6f3fc;
  border-radius: 4px;
  box-shadow:
    inset 6px 6px 12px #dddbe3,
    inset -6px -6px 12px #ffffff;
  padding: 8px;
  text-decoration: none;
  overflow-y: scroll;
}

.ulListTasks li {
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.ulListTasks li:not(.buttonAddTask) {
  background-color: #ffffffb9;
  justify-content: space-between;
  box-shadow: 0px 3px 10px 0px #00000033;
}

.buttonAddTask {
  justify-content: center;
  border: 3px dashed #6b26a494;
  border-radius: 4px 6px 4px 4px;
  transition: 300ms;
}

.buttonAddTask:hover {
  background-color: #6b26a4;
  box-shadow: 0px 3px 10px 0px #00000033;
  cursor: pointer;
}

.ulListTasks li h5 {
  font-size: 16px;
  font-weight: bold;
}

.ulListTasks li h5:hover {
  cursor: pointer;
  text-decoration: underline;
}

.customState {
  display: flex;
  gap: 12px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
