<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  href: { type: String, default: null },
  to: { type: [ String, Object ] as PropType<RouteLocationRaw>, default: null },
  text: { type: Boolean, default: false },
  icon: { type: String, default: '' }, // TODO: Add icons enum
  disabled: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  underlined: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

const classes = computed(() => {
  const baseClass = 'v-button'

  return {
    [`${baseClass}--text`]: props.href || props.text || props.to,
    [`${baseClass}--icon`]: props.icon,
    [`${baseClass}--disabled`]: props.disabled,
    [`${baseClass}--filled`]: props.filled,
    [`${baseClass}--outlined`]: props.outlined,
    [`${baseClass}--underlined`]: props.underlined,
    [`${baseClass}--error`]: props.error
  }
})
</script>

<template>
  <a
    v-if="href"
    class="v-button"
    v-bind="$attrs"
    :href="href"
    :disabled="disabled"
  >
    <slot>
      <CommonVIcon v-if="icon" v-bind="$attrs" :name="icon" />
    </slot>
  </a>
  <RouterLink
    v-else-if="to"
    class="v-button"
    v-bind="$attrs"
    :class="classes"
    :to="to"
    :disabled="disabled"
  >
    <slot>
      <CommonVIcon v-if="icon" v-bind="$attrs" :name="icon" />
    </slot>
  </RouterLink>
  <button
    v-else
    class="v-button"
    v-bind="$attrs"
    :class="classes"
    :disabled="disabled"
  >
    <slot>
      <CommonVIcon v-if="icon" v-bind="$attrs" :name="icon" />
    </slot>
  </button>
</template>

<style lang="scss" scoped>
$base-class: "v-button";

.#{$base-class} {
  height:40px;
  width: fit-content;
  padding: 8px 14px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  white-space: nowrap;

  border-radius: 8px;

  cursor: pointer;

  &--filled {
    color: $gray-800;

    @include set-prop-states-values(background, $green-600, $green-500, $green-600);
    @include focus-visible;

    // Error state
    &.#{$base-class}--error {
      color: $gray-0;
      @include set-prop-states-values(background, $error, $error-light, $error);
    }

    // Disabled state
    &.#{$base-class}--disabled {
      background: $gray-600 !important;
    }
  }

  &--outlined,
  &--underlined {
    background: transparent;
    border: 2px solid;

    @include set-prop-states-values(color, $green-600, $torquoise-600, $green-600);
    @include set-prop-states-values(border-color, $green-600, $torquoise-600, $green-600);

    @include focus-visible;

    // Error state
    &.#{$base-class}--error {
      @include set-prop-states-values(border-color, $error, $error-light, $error);
      @include set-prop-states-values(color, $error, $error-light, $error);
    }

    // Disabled state
    &.#{$base-class}--disabled {
      border-color: $gray-600 !important;
      color: $gray-600 !important;
    }
  }

  &--underlined {
    border-width: 0 0 2px 0;
    border-radius: 0;
  }

  &--text,
  &--icon {
    background: transparent;

    @include set-prop-states-values(color, $green-600, $torquoise-600, $green-600);

    @include focus-visible(currentColor);
    @include round;

    // Error state
    &.#{$base-class}--error {
      @include set-prop-states-values(color, $error, $error-light, $error);
    }

    // Disabled state
    &.#{$base-class}--disabled {
      color: $gray-600 !important;
    }
  }

  &--icon {
    height: fit-content;
    padding: 8px;
  }

  &--disabled {
    cursor: no-drop;
    box-shadow: none;
  }
}
</style>
