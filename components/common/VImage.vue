<script setup lang="ts">
const props = defineProps({
  path: { type: String, required: true },
  size: { type: [ Number, String ], default: 40 },
  rawSrc: { type: Boolean, default: false }
})

const size = computed(() => {
  return `${props.size}px`
})

const image = computed(() => {
  return !props.rawSrc ? import.meta.env.VITE_API_URL + props.path : props.path
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
