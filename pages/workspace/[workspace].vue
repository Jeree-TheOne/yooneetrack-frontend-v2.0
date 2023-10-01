<script setup lang="ts">
import WorkspaceService from '@/services/workspaceService'
import Workspace from '@/models/Workspace'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

const route = useRoute()
const router = useRouter()

const workspace = ref(null as unknown as Workspace)

const workspaceAttrs = computed(() => {
  const { columns, rows, members, tags, taskTypes, desks } = workspace.value
  return {
    columns, rows, members, tags, taskTypes, desks
  } as WorkspaceAttrs
})

onMounted(async () => {
  workspace.value = await WorkspaceService.getOne(route.params.workspace as string)
  router.push({ name: 'workspace-workspace-desk', params: { ...route.params, desk: 'current' } })
})
</script>

<template>
  <NuxtLayout v-if="workspace" :workspace="workspace.name" name="base">
    <RouterView :workspace="workspaceAttrs" />
  </NuxtLayout>
</template>

<style scoped>

</style>
