<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  text: { type: [ String, Number ], default: '' },
  titleClass: { type: String, default: '' },
  textClass: { type: [ String, Array ], default: '' }
})
</script>

<template>
  <div class="v-text-view">
    <div
      class="v-text-view__title"
      :class="titleClass"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div
      class="v-text-view__text"
      :class="textClass"
    >
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-text-view {
  display: flex;

  align-items: center;
  gap: 8px;

  &__title {
    @include body-2;
  }

  &__text {
    @include body-1;
  }
}
</style>
