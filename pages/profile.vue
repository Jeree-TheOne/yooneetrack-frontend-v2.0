<script setup lang="ts">
import StorageService from '@/services/storageService'
const router = useRouter()

onMounted(() => {
  const token = StorageService.getItem('token')
})

const gotoLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <div>
    <h1>Registration</h1>
    <button @click="gotoLogin">Click me!</button>
  </div>
</template>
