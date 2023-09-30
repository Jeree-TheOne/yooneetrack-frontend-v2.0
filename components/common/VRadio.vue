<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [ String, Boolean ],
    default: ''
  },
  value: {
    type: [ String, Boolean ],
    required: true
  },
  size: {
    type: [ Number, String ],
    default: 24
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const emits = defineEmits([ 'change' ])

const checkboxSize = computed(() => {
  return props.size + 'px'
})
</script>

<template>
  <label
    class="v-radio"
    :class="{'v-radio--disabled': disabled}"
  >
    <input
      class="v-radio__input"
      type="radio"
      v-bind="$attrs"
      :checked="isChecked"
      :disabled="disabled"
      @change="emits('change', props.value)"
    >
    <div class="v-radio__checkmark" />
    <slot />
  </label>
</template>

<style lang="scss" scoped>
$base-class: 'v-radio';
$radio-size: v-bind(size);

.#{$base-class} {
  display: flex;
  gap: 8px;
  padding: 8px;
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

  &__input:checked ~ &__checkmark {
    &::after {
      background-color: $green-400;
      display: block;
    }
  }

  &__checkmark {
    position: relative;
    border: 2px solid;
    height: v-bind(checkboxSize);
    width: v-bind(checkboxSize);
    transition-duration: 50ms;

    @include round;

    &::after {
      content: "";
      width: calc(v-bind(checkboxSize) / 2);
      height: calc(v-bind(checkboxSize) / 2);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
      transition-duration: 300ms;

      @include round;
    }
  }

  &:hover &__checkmark::after {
    transition-duration: 300ms;
    background-color: $green-600;
  }

  @include set-prop-states-values(color, $gray-400, $green-600);

  &--disabled {
    cursor: no-drop;
    color: $gray-600 !important;

    & .#{$base-class}__checkmark::after {
      background-color: $gray-600 !important;
    }
  }
}
</style>
