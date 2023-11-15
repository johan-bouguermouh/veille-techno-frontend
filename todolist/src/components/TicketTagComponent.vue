<script setup lang="ts">
import type { TagInterface } from '@/stores/counter'
import { defineProps } from 'vue'
const props = defineProps<{
  tag: TagInterface
}>()
//créate custom style for tag if tag.tagColor is define
const tagColorBackground = props.tag.tagColor ? props.tag.tagColor + 33 : 'transparent'
const tagColorBorder = props.tag.tagColor ? props.tag.tagColor : '#00000033'
const tagColorText = props.tag.tagColor ? props.tag.tagColor : '#000000DE'

//console.log(props.tag)
//creat style for tag
const tagStyle = {
  backgroundColor: tagColorBackground,
  border: '2px solid ' + tagColorBorder,
  color: tagColorText
}
</script>

<template>
  <div class="ticketTag">
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
