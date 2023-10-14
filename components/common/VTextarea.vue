<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
  block: { type: Boolean, default: false },
  underlined: { type: Boolean, default: false },
  autoGrow: { type: Boolean, default: false },
  rows: { type: [ String, Number ], default: 3 },
  noResize: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  error: { type: Boolean, default: false }
})

const slots = useSlots()

const emits = defineEmits([ 'update:modelValue' ])

const inputHandler = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)

  resize()
}

const vTextarea = ref<HTMLTextAreaElement>()

const resize = async () => {
  if (!vTextarea.value) return
  if (!props.autoGrow) return

  await nextTick()

  vTextarea.value.style.height = 'auto'

  const computedStyle = window.getComputedStyle(vTextarea.value)
  const paddingTop = computedStyle.getPropertyValue('padding-top')
  const paddingBottom = computedStyle.getPropertyValue('padding-bottom')

  vTextarea.value.style.height = `calc(${vTextarea.value.scrollHeight}px - ${paddingTop} - ${paddingBottom})`
}

const classes = computed(() => {
  const baseClass = 'v-textarea'

  return {
    [`${baseClass}--block`]: props.block,
    [`${baseClass}--underlined`]: props.underlined,
    [`${baseClass}--no-resize`]: props.noResize || props.autoGrow,
    [`${baseClass}--error`]: props.error
  }
})

watch(() => props.modelValue, () => {
  resize()
}, { immediate: true })
</script>

<template>
  <label class="v-textarea">
    <div
      :class="classes"
      class="v-textarea__textarea-wrapper"
    >
      <textarea
        ref="vTextarea"
        class="v-textarea__textarea"
        :value="modelValue"
        :rows="autoGrow ? rows : undefined"
        :style="{ 'min-height': `${rows}em` }"
        v-bind="$attrs"
        @input="inputHandler"
      />

      <div
        v-if="slots['prepend-inside']"
        class="v-textarea__prepend-inside"
      >
        <slot name="prepend-inside" />
      </div>

      <div
        v-if="slots['append-inside']"
        class="v-textarea__append-inside"
      >
        <slot name="append-inside" />
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.v-textarea {
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  &__textarea-wrapper {
    height: 100%;
    border-radius: 8px;
    background: transparent;
    border: 2px solid;
    display: flex;
    gap: 12px;
    cursor: text;

    @include set-prop-states-values(border-color, $gray-1000, $torquoise-600, $green-600);
  }

  &__textarea {
    margin: 0;
    width: 100%;
    box-sizing: content-box;
    outline: none;
    color: $gray-0;
    caret-color: $green-600;
    resize: vertical;
    background: transparent;
    border: none;

    &::placeholder {
      color: $gray-600;
    }
  }

  &__prepend-inside {
    order: -10;
  }

  &__prepend-inside,
  &__append-inside {
    display: flex;
    align-items: center;
    width: fit-content;
    flex-shrink: 0;
  }

  &__error-message {
    color: $error;
  }

  &--block {
    width: 100%;
  }

  &--underlined {
    padding: 10px;
    border-width: 0 0 2px 0;
    border-radius: 0;
  }

  &--auto-grow &__textarea {
    overflow-y: hidden;
  }

  &--no-resize &__textarea {
    resize: none;
  }

  &--error &__textarea-wrapper {
    @include set-prop-states-values(border-color, $error);
  }
}
</style>
