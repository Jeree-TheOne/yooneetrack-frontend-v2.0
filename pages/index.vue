<script setup lang="ts">
import StorageService from '@/services/storageService'
const router = useRouter()

onBeforeMount(() => {
  const token = StorageService.getItem('token')
  if (!token) router.push({ name: 'login' })
  return router.push({ name: 'personal' })
})
</script>
<template>
  <div />
</template>
