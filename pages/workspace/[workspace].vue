<script setup lang="ts">
import { getOne } from '@/services/workspaceService'
import Workspace from '@/models/Workspace'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

const route = useRoute()
const router = useRouter()

const workspace = ref<Workspace>()

const workspaceAttrs = computed(() => {
  if (!workspace.value) return
  const { columns, rows, members, tags, taskTypes, desks } = workspace.value
  return {
    columns, rows, members, tags, taskTypes, desks
  } as WorkspaceAttrs
})

onMounted(async () => {
  workspace.value = await getOne(route.params.workspace as string)
  router.push({ name: 'workspace-workspace-desk', params: { ...route.params, desk: 'current' }, query: route.query })
})
</script>

<template>
  <div>
    <NuxtLayout v-if="workspace" :workspace="workspace.name" name="base">
      <RouterView :workspace="workspaceAttrs" />
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>
