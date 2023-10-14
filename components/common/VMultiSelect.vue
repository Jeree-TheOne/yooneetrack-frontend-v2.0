<script setup lang="ts">
const slots = useSlots()

const props = defineProps({
  items: { type: Array as PropType<any[]>, default: () => [] },
  values: { type: Array as PropType<any[]>, default: () => [] },
  itemText: { type: String, default: 'text' },
  itemValue: { type: String, default: 'value' }
})

const options = computed(() => {
  if (slots.option) return props.items.filter(item => !props.values.includes(item))
  return props.items.map(item => ({
    text: Object.prototype.hasOwnProperty.call(item, props.itemText) ? String(item[props.itemText]) : item,
    value: Object.prototype.hasOwnProperty.call(item, props.itemValue) ? item[props.itemValue] : item
  })).filter(item => !props.values.includes(item.value))
})

const emits = defineEmits([ 'change', 'update:show' ])

const optionClickHandler = (option: any) => {
  if (slots.option) return emits('change', [ ...props.values, option[props.itemValue] ])
  emits('change', [ ...props.values, option.value ])
}

const updateShow = (isShow: boolean) => {
  emits('update:show', isShow)
}
</script>

<template>
  <CommonVMenu
    class="v-multi-select"
    card-class="v-multi-select__card"
    v-bind="$attrs"
    @toggle="updateShow"
  >
    <template #activator="{ attrs }">
      <slot
        class="v-multi-select__activator"
        name="activator"
        :attrs="attrs"
      />
    </template>
    <div v-if="options.length" class="v-multi-select__options">
      <CommonVButton
        v-for="(option, index) in options"
        :key="index"
        class="v-multi-select__option"
        text
        @click="optionClickHandler(option)"
      >
        <slot name="option" :item="option">
          {{ option.text }}
        </slot>
      </CommonVButton>
    </div>
    <template v-else>
      <div class="v-multi-select__no-options">No more options available</div>
    </template>
  </CommonVMenu>
</template>

<style lang="scss" scoped>
.v-multi-select {
  width: fit-content;
  &:deep(*) & {
    &__card {
      margin-top: -10px;
      padding: 4px;
      border-radius: 8px;
      max-height: 240px;
      overflow-y: auto;
      width: fit-content;
      background-color: $gray-1000;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 4px
  }

  &__option {
    width: fit-content;
    min-height: 36px;
    width: 100%;
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

  &__no-options {
    padding: 8px;
    white-space: nowrap;
    color: $gray-600;
    background-color: transparent !important;
    @include caption-1;
  }
}
</style>
