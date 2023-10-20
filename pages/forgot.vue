<script setup lang="ts">
const router = useRouter()
const { getItem } = useStorage()

onMounted(() => {
  const token = getItem('token')
  // console.log(history)
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
