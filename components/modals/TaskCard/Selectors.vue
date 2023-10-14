<script setup lang="ts">
import Task from '@/models/Task'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

import Member from '@/models/Member'

const props = defineProps({
  task: { type: Object as PropType<Task>, default: () => {} },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const emits = defineEmits([ 'update:task' ])

const localTask = ref<Task>()

const performer = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value?.performerId) as Member
})

const columnName = computed(() => {
  return props.workspace.columns.find(column => column.id === localTask.value?.columnId)?.name
})

const rowName = computed(() => {
  return props.workspace.rows.find(row => row.id === localTask.value?.rowId)?.name
})

const taskTypeName = computed(() => {
  return props.workspace.taskTypes.find(taskType => taskType.id === localTask.value?.taskTypeId)?.name
})

const deskName = computed(() => {
  return props.workspace.desks.find(desk => desk.id === localTask.value?.deskId)?.name
})

const tags = computed(() => {
  if (!props.task.tags) return []
  return props.workspace.tags.filter(tag => props.task.tags.includes(tag.id))
})

const columnChange = (columnId: string) => {
  emits('update:task', { ...props.task, columnId })
}

const rowChange = (rowId: string) => {
  emits('update:task', { ...props.task, rowId })
}

const deskChange = (deskId: string) => {
  emits('update:task', { ...props.task, deskId })
}

const taskTypeChange = (taskTypeId: string) => {
  emits('update:task', { ...props.task, taskTypeId })
}

const performerChange = (performerId: string) => {
  emits('update:task', { ...props.task, performerId })
}

const tagsChange = (tags: string) => {
  emits('update:task', { ...props.task, tags })
}

const removeTags = () => {
  emits('update:task', { ...props.task, tags: [] })
}

const performerName = (performer: Member) => {
  if (!performer) return 'Not assigned'
  return userName(performer)
}

watch(() => props.task, newValue => {
  localTask.value = newValue
}, { immediate: true, deep: true })
</script>

<template>
  <CommonVCard class="selectors">
    <div class="selectors__title">Desk:</div>
    <CommonVSelect
      right
      :value="task.deskId"
      :items="workspace.desks"
      item-text="name"
      item-value="id"
      @change="deskChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          class="selectors__select"
          v-bind="attrs"
          text
        >
          {{ deskName }}
        </CommonVButton>
      </template>
    </CommonVSelect>
    <div class="selectors__title">Task type:</div>
    <CommonVSelect
      right
      :value="task.taskTypeId"
      :items="workspace.taskTypes"
      item-text="name"
      item-value="id"
      @change="taskTypeChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          class="selectors__select"

          v-bind="attrs"
          text
        >
          {{ taskTypeName }}
        </CommonVButton>
      </template>
    </CommonVSelect>
    <div class="selectors__title">Status:</div>
    <CommonVSelect
      right
      :value="task.columnId"
      :items="workspace.columns"
      item-text="name"
      item-value="id"
      @change="columnChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          class="selectors__select"
          v-bind="attrs"
          text
        >
          {{ columnName }}
        </CommonVButton>
      </template>
    </CommonVSelect>
    <div class="selectors__title">Category:</div>
    <CommonVSelect
      right
      :value="task.rowId"
      :items="workspace.rows"
      item-text="name"
      item-value="id"
      @change="rowChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          class="selectors__select"
          v-bind="attrs"
          text
        >
          {{ rowName }}
        </CommonVButton>
      </template>
    </CommonVSelect>
    <div class="selectors__title">Performer:</div>
    <CommonVSelect
      right
      :value="task.performerId"
      :items="workspace.members"
      item-value="id"
      @change="performerChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          class="selectors__select"
          v-bind="attrs"
          text
        >
          {{ performerName(performer) }}
        </CommonVButton>
      </template>
      <template #option="{ item }">
        <div class="selectors__performer">
          <CommonVImage :path="item.avatar" />
          <div class="selectors__performer-info">
            <div>{{ userName(item) }}</div>
            <div class="selectors__performer-email">{{ item.email }}</div>
          </div>
        </div>
      </template>
    </CommonVSelect>
    <div class="selectors__title">Tags:</div>
    <CommonVMultiSelect
      right
      :values="task.tags"
      :items="workspace.tags"
      item-text="name"
      item-value="id"
      @change="tagsChange"
    >
      <template #activator="{ attrs }">
        <CommonVButton
          v-bind="attrs"
          text
        >
          <template v-if="tags.length">
            Selected tags: {{ tags.length }}
            <CommonVButton icon="crossIcon" :size="14" @click.stop="removeTags" />
          </template>
          <template v-else>
            Choose tags
          </template>
        </CommonVButton>
      </template>
    </CommonVMultiSelect>
  </CommonVCard>
</template>

<style lang="scss" scoped>
.selectors {
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  background-color: $gray-900;
  padding: 14px 22px;

  &__titles,
  &__selects {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    overflow: hidden;
    justify-content: space-between;
  }

  &__select {
    display: block;
    width: 100%;
    max-width: 280px;
    text-align: start;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__multi-select {
    border-radius: 10px;
    justify-content: flex-start;

    width: fit-content;
    height: fit-content;
    max-width: 200px;

    transition-duration: 300ms;

    &-items {
      display: flex;
      gap: 8px;
      width: 100%;
      flex-wrap: wrap;
      // overflow-y: auto;
    }

    &-item {
      width: fit-content;
    }

    &-remove {
      @include set-prop-states-values(color, $gray-1000, $gray-700);
    }

    &:hover {
      background-color: $gray-800;
      transition-duration: 300ms;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    height: 40px;
  }

  &__performer {
    display: flex;
    gap: 8px;

    align-items: center;

    height: 44px;

    &-info {
      display: flex;
      flex-direction: column;
    }

    &-email {
      color: $gray-500;
      @include caption-1;
    }
  }
}
</style>
