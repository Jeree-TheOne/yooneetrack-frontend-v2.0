<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    required: true
  },
  size: {
    type: [ Number, String ],
    default: 40
  }
})

const size = computed(() => {
  return `${props.size}px`
})

const image = computed(() => {
  return import.meta.env.VITE_API_URL + props.path
})
</script>

<template>
  <img v-bind="$attrs" :srcset="image" class="v-image">
</template>

<style lang="scss" scoped>
.v-image {
  background-size: contain;
  display: block;
  background-repeat: no-repeat;
  width: v-bind(size);
  height: v-bind(size);

  border-radius: 999px;
}
</style>
