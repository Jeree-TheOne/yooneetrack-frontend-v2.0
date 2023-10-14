<script setup lang="ts">
// eslint-disable-next-line import/named
import { isEqual } from 'lodash'

const slots = useSlots()

const props = defineProps({
  value: { type: undefined as unknown as PropType<any>, default: undefined },
  items: { type: Array as PropType<any[]>, default: () => [] },
  itemText: { type: String, default: 'text' },
  itemValue: { type: String, default: 'value' }
})

const emits = defineEmits([ 'change', 'update:show' ])

const options = computed(() => {
  if (slots.option) return props.items
  return props.items.map(item => ({
    text: Object.prototype.hasOwnProperty.call(item, props.itemText) ? String(item[props.itemText]) : item,
    value: Object.prototype.hasOwnProperty.call(item, props.itemValue) ? item[props.itemValue] : item
  }))
})

const isOptionChecked = (option: any) => {
  if (slots.option) return option[props.itemValue] === props.value

  return isEqual(option.value, props.value)
}

const optionClickHandler = (option: any) => {
  if (isOptionChecked(option)) return
  if (slots.option) return emits('change', option[props.itemValue])
  emits('change', option.value)
}

const updateShow = (isShow: boolean) => {
  emits('update:show', isShow)
}
</script>

<template>
  <CommonVMenu
    class="v-select"
    card-class="v-select__card"
    v-bind="$attrs"
    @toggle="updateShow"
  >
    <template #activator="{ attrs }">
      <slot
        class="v-select__activator"
        name="activator"
        :attrs="attrs"
      />
    </template>

    <!-- TODO: Absolute positioning for options (overflow breaks everything) -->
    <div class="v-select__options">
      <CommonVButton
        v-for="(option, index) in options"
        :key="index"
        class="v-select__option"
        text
        @click="optionClickHandler(option)"
      >
        <slot name="option" :item="option">
          {{ option.text }}
        </slot>
        <CommonVIcon
          :size="16"
          class="v-select__option-check-icon"
          :class="{ 'v-select__option-check-icon--active': isOptionChecked(option) }"
          name="tickIcon"
        />
      </CommonVButton>
    </div>
  </CommonVMenu>
</template>

<style lang="scss" scoped>
.v-select {
  &:deep(*) & {
    &__card {
      width: 100%;
      margin-top: -10px;
      padding: 4px;
      border-radius: 8px;
      max-height: 240px;
      overflow-y: auto;
      background-color: $gray-1000;
    }

    &__option-check-icon {
      opacity: 0;
      transition-duration: 300ms;
      transition-property: opacity, background;

      &--active {
        opacity: 1;
      }
    }
  }

  &__options {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 4px
  }

  &__option {
    width: 100%;
    min-height: 36px;
    height: fit-content;
    padding: 8px 18px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    text-align: start;
    border-radius: 5px;
    align-items: center;

    transition-duration: 250ms;

    @include set-prop-states-values(background-color, $gray-1000, $gray-900);
  }
}
</style>
