<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: [ Number, String ],
    default: 24
  }
})

const emits = defineEmits([ 'update:modelValue' ])

const update = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.checked
  emits('update:modelValue', value)
}

const checkboxSize = computed(() => {
  return props.size + 'px'
})
</script>

<template>
  <label
    class="v-checkbox"
    :class="{'v-checkbox--disabled': disabled}"
  >
    <div class="v-checkbox__checkbox">
      <CommonVIcon
        v-if="modelValue"
        name="tickIcon"
        class="v-checkbox__checkmark"
      />
    </div>
    <input
      type="checkbox"
      class="v-checkbox__input"
      :disabled="disabled"
      v-bind="$attrs"
      @input="update"
    >
    <slot />
  </label>
</template>

<style lang="scss" scoped>
$base-class: 'v-checkbox';

.#{$base-class} {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 8px;

  white-space: nowrap;

  cursor: pointer;
  &__input {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: v-bind(checkboxSize);
    min-width: v-bind(checkboxSize);
    height: v-bind(checkboxSize);
    width: v-bind(checkboxSize);
    border: 2px solid;
    border-radius: 6px;

    border-color: currentColor;
  }

  &__checkmark {
    min-height: v-bind(checkboxSize);
    min-width: v-bind(checkboxSize);
    color: $green-400;
  }

  &:hover &__checkmark {
    color: $green-600;
  }

  @include set-prop-states-values(color, $gray-400, $green-600);

  &--disabled {
    cursor: no-drop;
    color: $gray-600 !important;

    & .#{$base-class}__checkmark {
      color: $gray-600 !important;
    }
  }
}
</style>
