<script setup lang="ts">
const router = useRouter()
const { getItem } = useStorage()

onBeforeMount(() => {
  const token = getItem('token')
  if (!token) router.push({ name: 'login' })
  return router.push({ name: 'personal' })
})
</script>
<template>
  <div />
</template>
