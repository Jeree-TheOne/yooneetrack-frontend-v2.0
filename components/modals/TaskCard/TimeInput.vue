<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Number, default: 0 }
})

const emits = defineEmits([ 'update:modelValue' ])
const localTime = ref<string>('')

const updateValue = debounce((value: string) => {
  emits('update:modelValue', fromTimeToNumber(value))
}, 1000)

watch(() => props.modelValue, () => {
  localTime.value = fromNumberToTime(props.modelValue)
})
</script>

<template>
  <CommonVInput
    v-bind="$attrs"
    class="time-input"
    underlined
    :model-value="localTime"
    @update:model-value="updateValue"
  />
</template>

<style lang="scss" scoped>
.time-input {
  height: 40px;
}
</style>
