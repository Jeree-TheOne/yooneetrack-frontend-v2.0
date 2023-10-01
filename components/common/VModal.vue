<script setup lang="ts">
import { FADE } from '@/constants/animations'

const slots = useSlots()

const props = defineProps({
  title: { type: String, default: '' },
  close: { type: Boolean, default: false },
  show: { type: Boolean, default: false },
  fullscreen: { type: Boolean, default: false },
  headerContentClass: { type: [ String, Object ], default: '' },
  cardClass: { type: String, default: '' },
  cardWrapperClass: { type: String, default: '' },
  contentClass: { type: [ String, Object, Array ], default: '' },
  closeOnContentClick: { type: Boolean, default: false }
})

const localShow = ref(false)

const hasActivator = computed(() => {
  return !!slots.activator
})

watch(() => props.show, newValue => {
  localShow.value = newValue
}, { immediate: true })

const emits = defineEmits([ 'close' ])

const closeModal = () => {
  localShow.value = false
  emits('close')
}

// const customCloseModal = () => {
//   emits('custom-close')
// }
</script>

<template>
  <CommonVMenu
    class="v-modal"
    :class="[{
      'v-modal--fullscreen': fullscreen,
      'v-modal--absolute' : hasActivator && !fullscreen,
    }]"
    :transition="FADE"
    card-wrapper-class="v-modal__card"
    :card-class="cardClass"
    :close-on-content-click="closeOnContentClick"
    :overlay="fullscreen"
    v-bind="$attrs"
    :show="localShow"
    @toggle="closeModal"
  >
    <template
      v-if="slots.activator"
      #activator="{ attrs }"
    >
      <!-- @slot Активатор контента меню -->
      <slot
        name="activator"
        :attrs="attrs"
      />
    </template>
    <slot />
  </CommonVMenu>
</template>

<style lang="scss" scoped>

$base-class: '.v-modal';

#{$base-class} {
  &--fullscreen & {
    position: initial;
    width: 100vw;
    height: 100vh;
  }

  &--fullscreen {
    &:deep(.v-modal__card)  {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: fixed;
      overflow: visible;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    padding-left: 24px;
    padding-right: 24px;
  }

  &__content {
    padding: 0 16px;
  }

  &__title-wrapper {
    width: 100%;
    gap: 18px;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }

  &__content {
    scrollbar-gutter: stable both-edges;
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
  }
}
</style>
