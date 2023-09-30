<script setup lang="ts">
import StorageService from '@/services/storageService'
const router = useRouter()

onBeforeMount(() => {
  const token = StorageService.getItem('token')
})
</script>

<template>
  <NuxtLayout name="base">
    <div>Personal</div>
  </NuxtLayout>
</template>
