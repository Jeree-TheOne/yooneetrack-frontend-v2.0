<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const localValue = ref(false)

watch(() => props.modelValue, newValue => {
  localValue.value = newValue
}, { immediate: true })

const emits = defineEmits([ 'update:modelValue', 'switch' ])

const update = () => {
  localValue.value = !localValue.value
  emits('update:modelValue', localValue.value)
  emits('switch', localValue.value)
}
</script>

<template>
  <label class="v-switch">
    <div
      class="v-switch__switch"
      :class="{'v-switch__switch--checked': localValue}"
      v-bind="$attrs"
    />
    <input
      class="v-switch__input"
      type="checkbox"
      @input="update"
    >
    <slot />
  </label>
</template>

<style lang="scss" scoped>
$base-class: 'v-switch';

.#{$base-class} {
  display: flex;
  gap: 16px;
  align-items: center;

  height: 40px;

  cursor: pointer;

  &__input {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__switch {
    position: relative;
    height: 24px;
    width: 40px;
    background-color: $gray-900;

    @include round;

    &::after {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(calc(-100% + 2px), -50%);
      background-color: $gray-700;

      @include round;
    }

    &--checked {
      background-color: $green-400;

      &::after {
        transform: translate(calc(0% - 2px), -50%);
      }
    }

    &:hover {
      background-color: $green-600;
    }
  }
}
</style>
