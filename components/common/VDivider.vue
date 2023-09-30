<script setup lang="ts">
defineProps({
  vertical: { type: Boolean, default: false }
})
</script>

<template>
  <hr
    class="v-divider"
    :class="{ 'v-divider--vertical': vertical }"
  >
</template>

<style lang="scss" scoped>
.v-divider {
  max-width: 100%;
  max-height: 0;
  height: 0;
  width: 100%;
  border: solid $gray-900;
  border-width: medium 0 0;
  border-radius: 10px;
  display: block;
  flex: 1 1 0;
  margin: 0;

  &--vertical {
    display: inline-flex;
    margin: 0 -1px;
    max-height: 100%;
    min-height: 100%;
    max-width: 0;
    height: auto;
    width: 0;
    align-self: stretch;
    border-width: 0 medium 0 0;
  }
}
</style>
