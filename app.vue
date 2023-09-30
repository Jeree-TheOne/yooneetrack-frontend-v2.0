<script setup lang="ts">
import '@/interceptors/axios'
const { $listen } = useNuxtApp()
$listen('theme-change', value => {
  // console.log(value)
})
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss">
:root {
  // @if v-bind(theme) {
  // }
}
</style>
