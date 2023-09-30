<script setup lang="ts">
// eslint-disable-next-line import/named
import { isEqual } from 'lodash'
import SelectOption from '@/models/SelectOption'

const props = defineProps({
  value: { type: undefined as unknown as PropType<any>, default: undefined },
  items: { type: Array as PropType<any[]>, default: () => [] },
  itemText: { type: String, default: 'text' },
  itemValue: { type: String, default: 'value' },
  placeholder: { type: String, default: '' }
})

const emits = defineEmits([ 'change', 'update:show' ])

const options = computed(() => {
  return props.items.map(item => ({
    text: Object.prototype.hasOwnProperty.call(item, props.itemText) ? String(item[props.itemText]) : item,
    value: Object.prototype.hasOwnProperty.call(item, props.itemValue) ? item[props.itemValue] : item
  }))
})

const formattedPlaceholder = computed(() => {
  return capitalizeFirstLetter(props.placeholder)
})

const isOptionChecked = (option: SelectOption) => {
  return isEqual(option.value, props.value)
}

const optionClickHandler = (option: SelectOption) => {
  if (isOptionChecked(option)) return

  emits('change', option.value)
}

const updateShow = (isShow: boolean) => {
  emits('update:show', isShow)
}
</script>

<template>
  <div class="v-select__container">
    <div v-if="placeholder">{{ formattedPlaceholder }}</div>
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

      <div class="v-select__options">
        <CommonVButton
          v-for="(option, index) in options"
          :key="index"
          class="v-select__option"
          text
          @click="optionClickHandler(option)"
        >
          {{ option.text }}

          <CommonVIcon
            :size="16"
            class="v-select__option-check-icon"
            :class="{ 'v-select__option-check-icon--active': isOptionChecked(option) }"
            name="tickIcon"
          />
        </CommonVButton>
      </div>
    </CommonVMenu>
  </div>
</template>

<style lang="scss" scoped>
.v-select {
  &:deep(*) & {
    &__card {
      margin-top: -10px;
      padding: 4px;
      border-radius: 8px;
      max-height: 240px;
      overflow-y: auto;
      width: fit-content;
      background-color: $gray-800;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;

    align-items: flex-start;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 4px
  }

  &__option {
    min-width: 230px;
    height: 36px;
    width: 100%;
    padding: 8px 18px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    text-align: start;
    border-radius: 5px;
    align-items: center;

    transition-duration: 250ms;

    @include set-prop-states-values(background-color, $gray-800, $gray-700);

  }

  &__option:hover &__option-check-icon {
    opacity: 1;
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
</style>
