<script setup lang="ts">
import { AnimationName, AnimationTransitions } from '@/models/animation'
import { SLIDE_DOWN } from '@/constants/animations'

import animationService from '@/services/animationService'

let contentAnimation: AnimationTransitions

const enter = (element: HTMLElement, done: Function) => {
  contentAnimation.enter({ targets: element, done })
}

const leave = (element: HTMLElement, done: Function) => {
  contentAnimation.leave({ targets: element, done })
}

const slots = useSlots()

const localShow = ref(false)

const props = defineProps({
  closeOnClick: { type: Boolean, default: true },
  closeOnContentClick: { type: Boolean, default: true },
  transition: { type: String as PropType<AnimationName>, default: SLIDE_DOWN },
  transitionDuration: { type: Number, default: 250 },
  disabled: { type: Boolean, default: false },
  left: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
  right: { type: Boolean, default: false },
  top: { type: Boolean, default: false },
  cardClass: { type: [ String, Array ] as PropType<string | string[]>, default: '' },
  cardWrapperClass: { type: [ String, Array ] as PropType<string | string[]>, default: '' },
  show: { type: Boolean, default: false },
  offsetX: { type: [ String, Number ], default: 0 },
  offsetY: { type: [ String, Number ], default: 0 },
  overlay: { type: Boolean, default: false },
  zIndex: { type: Number, default: 3 }
})

const toggleContentShow = () => {
  localShow.value = !localShow.value
  emits('toggle', localShow.value)
}

watch(() => props.show, newShow => {
  localShow.value = newShow
}, { immediate: true })

const contentClickHandler = () => {
  if (props.closeOnContentClick) toggleContentShow()
}

const clickOutsideContentHandler = () => {
  if (localShow.value && props.closeOnClick) toggleContentShow()
}

const activatorHandler = () => {
  toggleContentShow()
}

const innerAttrs = useAttrs()

const attrs = computed(() => {
  return { ...innerAttrs, onClick: activatorHandler }
})

const emits = defineEmits([ 'overlay-click', 'toggle' ])

const hasActivator = computed(() => {
  return !!slots.activator
})

const isOverlayShow = computed(() => {
  return localShow.value && props.overlay
})

const contentWrapperClasses = computed(() => {
  const baseClass = 'v-menu__content-wrapper'

  const cardWrapperClass = Array.isArray(props.cardWrapperClass)
    ? props.cardWrapperClass.reduce((classObject, value) => ({ ...classObject, [value]: value }), {})
    : { [props.cardWrapperClass]: props.cardWrapperClass }

  return {
    [`${baseClass}--left`]: hasActivator && props.left,
    [`${baseClass}--bottom`]: hasActivator && props.bottom,
    [`${baseClass}--right`]: hasActivator && props.right,
    [`${baseClass}--top`]: hasActivator && props.top,
    ...cardWrapperClass
  }
})

const styles = computed(() => {
  return {
    'margin-left': `${props.offsetX}px`,
    'margin-right': `${-props.offsetX}px`,
    'margin-top': `${props.offsetY}px`,
    'margin-bottom': `${-props.offsetY}px`,
    'z-index': props.zIndex + 1
  }
})

onMounted(() => {
  contentAnimation = animationService(
    props.transition,
    {
      duration: props.transitionDuration
    }
  )
})
</script>

<template>
  <div
    class="v-menu"
    :style="hasActivator ? '' : styles"
  >
    <slot name="activator" :attrs="attrs" />
    <transition
      @enter="enter"
      @leave="leave"
    >
      <div
        v-if="localShow"
        :class="contentWrapperClasses"
        class="v-menu__content-wrapper"
      >
        <CommonVCard
          v-click-outside="clickOutsideContentHandler"
          class="v-menu__content"
          :class="cardClass"
          @click="contentClickHandler"
        >
          <slot />
        </CommonVCard>
      </div>
    </transition>

    <CommonVOverlay
      :show="isOverlayShow"
      :z-index="zIndex"
    />
  </div>
</template>

<style lang="scss" scoped>

.v-menu {
  position: relative;

  &__content-wrapper {
    width: fit-content;
    height: fit-content;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 4;

    &--left {
      left: 0;
    }

    &--bottom {
      top: 100%;
    }

    &--right {
      right: 0;
    }

    &--top {
      bottom: 100%;
    }
  }

  &__content {
    transform-origin: center;
    overflow: auto;
    height: fit-content;
  }
}
</style>
