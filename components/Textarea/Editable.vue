<script setup lang="ts">
defineProps({
  isEdit: { type: Boolean, default: false }
})
</script>

<template>
  <div
    v-if="!isEdit"
    class="text-editable"
  >
    <slot />
  </div>
  <CommonVTextarea
    v-else
    class="text-editable"
    v-bind="$attrs"
  />
</template>

<style lang="scss" scoped>
.textarea-editable{}
</style>
