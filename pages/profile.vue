<script setup lang="ts">
const router = useRouter()
const { getItem } = useStorage()

onMounted(() => {
  const token = getItem('token')
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
