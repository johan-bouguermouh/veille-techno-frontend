<script setup lang="ts">
import type { TagInterface } from '@/stores/TagStore'
import { defineProps } from 'vue'
import { ref, onMounted, onBeforeUpdate } from 'vue'

const ticketTagRef = ref(null)
const props = defineProps<{
  tag: TagInterface
}>()

onMounted(() => {
  if (ticketTagRef.value) {
    ticketTagRef.value.style.backgroundColor = props.tag.tagColor
      ? props.tag.tagColor + 33
      : 'transparent'
    ticketTagRef.value.style.color = props.tag.tagColor ? props.tag.tagColor : '#000000DE'
  }
})

onBeforeUpdate(() => {
  if (ticketTagRef.value) {
    ticketTagRef.value.style.backgroundColor = props.tag.tagColor
      ? props.tag.tagColor + 33
      : 'transparent'
    ticketTagRef.value.style.color = props.tag.tagColor ? props.tag.tagColor : '#000000DE'
  } else {
    console.log('ticketTagRef.value is null')
    console.log(ticketTagRef)
  }
})
</script>

<template>
  <div class="ticketTag" ref="ticketTagRef">
    <span>{{ tag.tagName }}</span>
  </div>
</template>

<style scoped>
.ticketTag {
  border-radius: 4px;
  padding: 4px;
  min-width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ticketTag span {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  padding: 0;
  margin: 0;
}
</style>
