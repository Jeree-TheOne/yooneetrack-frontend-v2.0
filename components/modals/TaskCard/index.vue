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
          <ModalsTaskCardSelectors
            v-model:task="localTask"
            :workspace="workspace"
          />
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

  }
}
</style>
