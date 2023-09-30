<script setup lang="ts">
const props = defineProps({
  color: { type: String, default: '#000000' },
  background: { type: String, default: '#ffffff' }
})

const styles = computed(() => {
  return {
    color: props.color,
    'background-color': props.background
  }
})
</script>

<template>
  <div class="v-tag" :style="styles">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.v-tag {
  font-size: 12px;
  width: fit-content;
  padding: 2px 8px;
  border-radius: 1000px;

  text-wrap: nowrap;
}
</style>
