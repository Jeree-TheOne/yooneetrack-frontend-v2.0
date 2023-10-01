<script setup lang="ts">
import WorkspaceAttrs from '@/models/WorkspaceAttrs'
import Desk from '@/models/Desk'
import Task from '@/models/Task'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const search = ref('')

const selectedDesk = ref({} as Desk)

const deskChange = (newDeskId: string) => {
  selectedDesk.value = props.workspace.desks.find(desk => desk.id === newDeskId) as Desk
  router.replace(`/workspace/${route.params.workspace}/${selectedDesk.value.id}`)
}

const localTask = ref({} as Task)
const isTaskModalOpen = ref(false)

const addTask = ({ columnId, rowId }: {columnId: string, rowId: string}) => {
  toggleTaskModal()
  localTask.value.columnId = columnId
  localTask.value.rowId = rowId
}

const openTask = (taskId: string) => {
  toggleTaskModal()
  setTaskIdQuery(taskId)
  localTask.value.id = taskId
}

const toggleTaskModal = () => {
  isTaskModalOpen.value = !isTaskModalOpen.value
}

const closeTaskModal = (value: boolean) => {
  toggleTaskModal()
  setTaskIdQuery()
  localTask.value = {} as Task
  if (value) router.go(0)
}

const setTaskIdQuery = (taskId?: string) => {
  if (!taskId) return router.replace(route.path)
  router.replace({ query: { ...route.query, taskId } })
}

onMounted(() => {
  selectedDesk.value = props.workspace.desks.find(desk => desk.isCurrent) ?? selectedDesk.value
  const taskId = route.query.taskId
  if (taskId) openTask(taskId as string)
})
</script>

<template>
  <div class="workspace">
    <div class="workspace__actions-panel">
      <CommonVSelect
        left
        :value="selectedDesk.id"
        :items="workspace.desks"
        item-text="name"
        item-value="id"
        @change="deskChange"
      >
        <template #activator="{ attrs }">
          <CommonVButton underlined class="workspace__select-desk" v-bind="attrs">
            <span class="workspace__select-desk-name">{{ selectedDesk.name }}</span>
            <CommonVIcon :size="16" name="expandDownIcon" />
          </CommonVButton>
        </template>
      </CommonVSelect>
      <CommonVInput v-model="search" placeholder="Search" underlined class="workspace__search" />
      <CommonVButton
        icon="settingsIcon"
        :to="{ name: 'workspace-workspace-settings', params: { workspace: route.params.workspace } }"
        :size="32"
        class="workspace__settings-button"
        @click.stop
      />
    </div>
    <CustomDesk
      v-if="selectedDesk.id"
      :id="selectedDesk.id"
      :search="search"
      v-bind="workspace"
      @add-task="addTask"
      @open-task="openTask"
    />
    <ModalsTaskCard
      :task="localTask"
      :workspace="workspace"
      :show="isTaskModalOpen"
      @close="closeTaskModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.workspace {
  height: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__search {
    width: 100%;
    min-width: 250px;

    @include set-prop-states-values(border-color, $gray-700, $green-600);
  }

  &__select-desk {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 8px;

    width: fit-content;
    max-width: 300px;

    height: 40px;
    padding: 10px 14px;

    @include set-prop-states-values(color, $green-600, $green-400);
    @include set-prop-states-values(border-color, $gray-700, $green-400);

    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__actions-panel {
    display: flex;
    gap: 16px;

    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
  }

  &__settings-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 4px;

    @include set-prop-states-values(color, $gray-600, $green-400)
  }
}
</style>
