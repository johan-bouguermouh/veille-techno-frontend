<script setup lang="ts">
import type { TagInterface } from '@/stores/counter'
import { defineProps } from 'vue'
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{
  tag: TagInterface
}>()
//créate custom style for tag if tag.tagColor is define
const tagColorBackground = ref('transparent')
const tagColorBorder = ref('#00000033')
const tagColorText = ref('#000000DE')

onMounted(() => {
  tagColorBackground.value = props.tag.tagColor ? props.tag.tagColor + 33 : 'transparent'
  tagColorBorder.value = props.tag.tagColor ? props.tag.tagColor : '#00000033'
  tagColorText.value = props.tag.tagColor ? props.tag.tagColor : '#000000DE'
})
//console.log(props.tag)
//creat style for tag
const tagStyle = {
  backgroundColor: tagColorBackground.value,
  border: '2px solid ' + tagColorBorder.value,
  color: tagColorText.value
}

watch(props.tag, () => {
  console.log('Updated IN TAG COMPONENT')
})
</script>

<template>
  <div
    class="ticketTag"
    :style="{
      backgroundColor: tagStyle.backgroundColor,
      border: tagStyle.border,
      color: tagStyle.color
    }"
  >
    <span>{{ tag.tagName }}</span>
  </div>
</template>

<style scoped>
.ticketTag {
  background-color: v-bind('tagStyle.backgroundColor');
  border: v-bind('tagStyle.border');
  color: v-bind('tagStyle.color');
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
  color: v-bind('tagStyle.color');
  text-align: center;
  padding: 0;
  margin: 0;
}
</style>
