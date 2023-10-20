<script setup lang="ts">
const router = useRouter()
const { getItem } = useStorage()

onBeforeMount(() => {
  const token = getItem('token')
})
</script>

<template>
  <NuxtLayout name="base">
    <div>Personal</div>
  </NuxtLayout>
</template>
