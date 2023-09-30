<script setup lang="ts">
</script>

<template>
  <div class="v-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$base-class: "v-card";

.#{$base-class} {
  background-color: $gray-800;

  border-radius: 15px;
  padding: 14px;

  display: flex;

  align-items: center;
  flex-direction: column;
  gap: 18px;
}
</style>
