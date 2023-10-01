<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Placeholder' // TODO: Add translation
  },
  underlined: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([ 'update:modelValue' ])

const input = (e: Event) => {
  const target = (e.target as HTMLInputElement)
  const value = target.value
  emits('update:modelValue', value)
}

const isClearable = computed(() => {
  return props.clearable && props.modelValue
})

const clear = () => {
  if (!isClearable) return

  emits('update:modelValue', '')
}

const classes = computed(() => {
  const baseClass = 'v-input'

  return {
    [`${baseClass}--underlined`]: props.underlined,
    [`${baseClass}--disabled`]: props.disabled,
    [`${baseClass}--error`]: props.error
  }
})
</script>

<template>
  <label
    class="v-input"
    :class="classes"
  >
    <slot name="prepend-data" />
    <input
      class="v-input__input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
      @input="input"
    >
    <slot name="append-data" />
    <CommonVButton
      v-if="isClearable"
      icon="crossIcon"
      :size="16"
      class="v-input__clear-button"
      @click="clear"
    >
      <slot name="clear" />
    </CommonVButton>

  </label>
</template>

<style scoped lang="scss">
$base-class: "v-input";

.#{$base-class} {
  display: flex;
  gap: 8px;
  height: 50px;
  width: max(120px, 100%);

  align-items: center;
  justify-content: center;

  outline: none;
  border: 2px solid;
  border-radius: 12px;

  padding: 8px 18px 8px 10px;

  color: $gray-300;

  @include set-prop-states-values(border-color, $gray-1000, $torquoise-600, $green-600);

  &__input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    color: inherit;

    caret-color: $green-600;

    &::placeholder {
      color: $gray-600;
    }
  }

  &__clear-button {
    @include set-prop-states-values(color, $gray-300, $torquoise-600, $green-600);
  }

  &--underlined {
    height: 40px;
    border-top: none;
    border-left: none;
    border-right: none;

    border-radius: 0;

    padding: 10px;
  }

  &--error {
    @include set-prop-states-values(border-color, $error, $error-light, $error);

    & .#{$base-class}__clear-button {
      @include set-prop-states-values(color, $gray-300, $error-light, $error);
    }

    & .#{$base-class}__input {
      caret-color: $error;
    }
  }

  &--disabled {
    border-color: $gray-700 !important;
    color: $gray-500;

    & .#{$base-class}__clear-button {
      display: none;
    }
  }
}
</style>
