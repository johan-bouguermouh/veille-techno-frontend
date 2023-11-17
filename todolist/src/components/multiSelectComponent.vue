<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  options: any[]
  handleValue: (value: any[]) => void
  label: string
  propsNameLabelList: string
}>()

const multiselectRef = ref<HTMLElement | null>(null)
const listIsOpen = ref(false)
const value = ref([])

const openList = () => {
  listIsOpen.value = !listIsOpen.value
}

watch(value, () => {
  props.handleValue(value.value)
})
const handleClickOutside = (event: any) => {
  if (event.target.alt === 'open list') {
    listIsOpen.value = true
  } else if (multiselectRef.value && !multiselectRef.value.contains(event.target)) {
    console.log(event.target)
    listIsOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="wrapper-multiselect" ref="multiselectRef">
    <label class="typo__label">{{ label }}</label>
    <div class="input-multiselect">
      <label for="open-close-list" class="inputn-mutliselect-fields">
        <span vIf="value.length" v-for="item in value" :key="item[propsNameLabelList]">
          {{ item[propsNameLabelList] }},
        </span>
      </label>
      <button id="open-close-list" class="open-list" type="button" @click="openList">
        <img
          v-if="!listIsOpen"
          src="@/assets/iconSVG/chevron-down.svg"
          width="16"
          height="16"
          alt="open list"
        />
        <img
          v-else
          src="@/assets/iconSVG/chevron-up-outline.svg"
          width="16"
          height="16"
          alt="close list"
        />
      </button>
    </div>
    <div v-if="listIsOpen" class="wrapper-list">
      <ul>
        <li v-for="option in options" :key="option.name">
          <label>
            <input type="checkbox" class="MultiSelected-checkbox" :value="option" v-model="value" />
            {{ option[propsNameLabelList] }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper-multiselect {
  position: relative;
  width: 100%;
}

.wrapper-multiselect > label {
  display: block;
  margin-bottom: 0;
  height: 24px;
}
.input-multiselect {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  border: 1px solid #00000033;
  border-radius: 4px;
  background-color: white;
}

.input-multiselect button {
  height: 100%;
  width: 44px;
  border: none;
  background-color: transparent;
}
.inputn-mutliselect-fields {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
}

.inputn-mutliselect-fields span {
  display: block;
  margin: 4px;
}

.input-multiselect .inputn-mutliselect-fields .multiselect {
  width: 100%;
}

.wrapper-list {
  position: absolute;
  top: 68px;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #ffffffbf;
  backdrop-filter: blur(5px);
  border-radius: 4px;
  box-shadow: 0px 3px 10px 0px #00000033;
}

.wrapper-list ul {
  list-style: none;
  padding: 4px 8px;
  margin: 0;
}

.wrapper-list ul li {
  padding: 4px 8px;
  margin: 0;
}

.wrapper-list ul li label {
  display: block;
  margin-bottom: 0;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.wrapper-list ul li label input {
  margin-right: 8px;
  width: 21px;
  height: 21px;
  border-radius: 4;
}

.wrapper-list ul li label input:checked {
  background-color: #00000033;
}

.wrapper-list ul li:hover {
  background-color: #00000010;
}
</style>
