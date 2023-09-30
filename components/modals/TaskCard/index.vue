<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import moment from 'moment'
import Task from '@/models/Task'
import Member from '@/models/Member'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

import TaskService from '@/services/taskService'

const props = defineProps({
  task: { type: Object as PropType<Task>, default: () => {} },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const localTask = ref({} as Task)

const creator = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value.authorId) as Member
})

const updater = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value.updaterId) as Member
})

const performer = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value.performerId) as Member
})

const columnName = computed(() => {
  return props.workspace.columns.find(column => column.id === localTask.value.columnId)?.name
})

const rowName = computed(() => {
  return props.workspace.rows.find(row => row.id === localTask.value.rowId)?.name
})

const taskTypeName = computed(() => {
  return props.workspace.taskTypes.find(taskType => taskType.id === localTask.value.taskTypeId)?.name
})

const deskName = computed(() => {
  return props.workspace.desks.find(desk => desk.id === localTask.value.deskId)?.name
})

const userName = (user: Member) => {
  if (!user) return 'Not assigned'
  return user.firstName && user.secondName ? `${user.firstName}  ${user.secondName}` : user.login
}

const columnChange = (columnId: string) => {
  localTask.value.columnId = columnId
}

const rowChange = (rowId: string) => {
  localTask.value.rowId = rowId
}

const deskChange = (deskId: string) => {
  localTask.value.deskId = deskId
}

const taskTypeChange = (taskTypeId: string) => {
  localTask.value.taskTypeId = taskTypeId
}

const performerChange = (memberId: string) => {
  localTask.value.performerId = memberId
}

watch(() => props.task, async newValue => {
  localTask.value = newValue

  if (Object.keys(localTask.value).length === 0) return

  if (localTask.value.id)
    localTask.value = await TaskService.select(localTask.value.id)
}, { immediate: true, deep: true })
</script>

<template>
  <CommonVModal
    class="task-card"
    card-class="task-card__card-class"
    fullscreen
    v-bind="$attrs"
  >
    <div class="task-card__content">
      <div class="task-card__main-block">
        <div class="task-card__left-section">
          <div v-if="creator" class="task-card__creator">Created by {{ userName(creator) }} {{ moment(localTask.createdAt).fromNow() }}</div>
          <div v-if="updater" class="task-card__creator">Updated by {{ userName(updater) }} {{ moment(localTask.updatedAt).fromNow() }}</div>
          <div class="task-card__title">{{ localTask.title }}</div>
          <div class="task-card__description">{{ localTask.description }}</div>
        </div>
        <CommonVDivider vertical />
        <div class="task-card__right-section">
          <div class="task-card__right-section-titles">
            <div class="task-card__right-section-title">Desk:</div>
            <div class="task-card__right-section-title">Task type:</div>
            <div class="task-card__right-section-title">Status:</div>
            <div class="task-card__right-section-title">Category:</div>
            <div class="task-card__right-section-title">Performer:</div>
            <div class="task-card__right-section-title">Tags:</div>
          </div>
          <div class="task-card__right-section-select">
            <CommonVSelect
              class="task-card__select"
              :value="localTask.deskId"
              :items="workspace.desks"
              item-text="name"
              item-value="id"
              @change="deskChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ deskName }}
                </CommonVButton>
              </template>
            </CommonVSelect>
            <CommonVSelect
              class="task-card__select"
              :value="localTask.taskTypeId"
              :items="workspace.taskTypes"
              item-text="name"
              item-value="id"
              @change="taskTypeChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ taskTypeName }}
                </CommonVButton>
              </template>
            </CommonVSelect>
            <CommonVSelect
              class="task-card__select"
              :value="localTask.columnId"
              :items="workspace.columns"
              item-text="name"
              item-value="id"
              @change="columnChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ columnName }}
                </CommonVButton>
              </template>
            </CommonVSelect>
            <CommonVSelect
              class="task-card__select"
              :value="localTask.rowId"
              :items="workspace.rows"
              item-text="name"
              item-value="id"
              @change="rowChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ rowName }}
                </CommonVButton>
              </template>
            </CommonVSelect>
            <CommonVSelect
              class="task-card__select"
              :value="localTask.performerId"
              :items="workspace.members"
              item-text="email"
              item-value="id"
              @change="performerChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ userName(performer) }}
                </CommonVButton>
              </template>
            </CommonVSelect>
            <CommonVSelect
              class="task-card__select"
              :value="localTask.performerId"
              :items="workspace.members"
              item-text="email"
              item-value="id"
              @change="performerChange"
            >
              <template #activator="{ attrs }">
                <CommonVButton
                  class="task-card__select-button"
                  v-bind="attrs"
                  text
                >
                  {{ userName(performer) }}
                </CommonVButton>
              </template>
            </CommonVSelect>
          <!-- TODO: TAGS -->
          </div>
        </div>
      </div>
    </div>
  </CommonVModal>
</template>

<style lang="scss" scoped>
$base-class: '.task-card';

#{$base-class} {

  &:deep(.task-card__card-class) {
    overflow: visible;
    max-width: 900px;
    max-height: 90%;
  }

  &__content {
    width: 100%;
    height: 100%;
  }

  &__main-block {
    display: flex;

    width: 100%;
    height: 100%;

    gap: 16px;
  }

  &__left-section {
    width: 120%;
  }

  &:deep(.task-card__select) &__select {
    width: 100%;
    justify-content: space-between;

    &-button {
      display: block;
      text-align: start;
      position: relative;

      height: 36px;

      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__right-section {
    height: 100%;
    display: flex;
    gap: 8px;
    width: 80%;

    &-titles,
    &-select {
      width: 100%;
      display: flex;
      flex-direction: column;

      height: 300px;

      gap: 16px;
    }

    &-title {
      display: flex;
      align-items: center;
      height: 36px;
    }
  }
}
</style>
