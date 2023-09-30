<script setup lang="ts">
import { capitalizeFirstLetter } from '@/utils/formatters'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 40
  }
})

const icon = computed(() => defineAsyncComponent(() => import(`@/components/icons/${capitalizeFirstLetter(props.name)}.vue`)))

const style = computed(() => {
  return {
    '--size': props.size + 'px'
  }
})
</script>

<template>
  <component :is="icon" :style="style" class="v-icon" />
</template>

<style scoped lang="scss">
$base-class: 'v-icon';

.#{$base-class} {
  width: var(--size);
  height: var(--size);
}
</style>
