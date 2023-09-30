<script lang="ts" setup>
import { AnimationName, AnimationTransitions } from '@/models/animation'
import { DEFAULT_ANIMATION_NAME } from '@/constants/animations'

import animationService from '@/services/animationService'

let overlayAnimation: AnimationTransitions

const props = defineProps({
  zIndex: {
    type: [ String, Number ],
    default: 0
  },
  opacity: {
    type: Number,
    default: 0.38
  },
  transitionDuration: {
    type: [ String, Number ],
    default: 250
  },
  transition: {
    type: String as PropType<AnimationName>,
    default: DEFAULT_ANIMATION_NAME
  },
  show: {
    type: Boolean,
    default: false
  }
})

const styles = computed(() => {
  return {
    'z-index': props.zIndex,
    opacity: props.opacity
  }
})

const enter = (element: HTMLElement, done: Function) => {
  overlayAnimation.enter({ targets: element, done })
}
const leave = (element: HTMLElement, done: Function) => {
  overlayAnimation.leave({ targets: element, done })
}

onMounted(() => {
  overlayAnimation = animationService(
    props.transition,
    {
      duration: props.transitionDuration
    }
  )
})
</script>

<template>
  <transition
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="show"
      class="v-overlay"
      :style="styles"
      v-bind="$attrs"
    />
  </transition>
</template>

<style lang="scss" scoped>
.v-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.38);
}
</style>
