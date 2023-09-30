<script setup lang="ts">
import StorageService from '@/services/storageService'
const router = useRouter()

onMounted(() => {
  const token = StorageService.getItem('token')
  console.log(history)
})

const gotoLogin = () => {
  router.push({ name: 'login' })
}

</script>

<template>
  <div>
    <h1>Forgot something? Fuck u go back</h1>
    <button @click="gotoLogin">Click me!</button>
  </div>
</template>
