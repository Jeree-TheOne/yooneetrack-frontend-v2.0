<script setup lang="ts">
import jwtDecode from 'jwt-decode'
import User from '@/models/User'

const router = useRouter()
const { getItem } = useStorage()

const user = ref<User>({
  login: 'username',
  avatar: 'images/avatar.png'
} as User)

const updateUser = () => {
  const token = getItem('token')
  if (!token) return router.push({ name: 'login' })
  user.value = jwtDecode(token)
}

provide('user', user)

onBeforeMount(() => {
  nextTick(() => {
    updateUser()
  })
})
</script>

<template>
  <div class="base-layout">
    <div class="base-layout__main-content">
      <LayoutsHeader v-bind="$attrs" class="base-layout__header" />
      <slot />
    </div>
    <LayoutsSidebar v-bind="$attrs" class="base-layout__sidebar" />
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  position: relative;
  height: 100%;
  width: 100%;

  &__main-content {
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  &__header {
    padding-left: 70px;
  }

  &__sidebar {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
