<script setup lang="ts">
import Task from '@/models/Task'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

import { selectTask } from '@/services/taskService'

const props = defineProps({
  task: { type: Object as PropType<Task>, default: () => {} },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const localTask = ref<Task>()

watch(() => props.task, async newValue => {
  localTask.value = newValue

  if (Object.keys(localTask.value).length === 0) return

  if (localTask.value.id)
    localTask.value = await selectTask(localTask.value.id)
}, { immediate: true, deep: true })
</script>

<template>
  <CommonVModal
    v-if="localTask"
    class="task-card"
    card-class="task-card__card-class"
    fullscreen
    v-bind="$attrs"
  >
    <div class="task-card__content">
      <div class="task-card__main-block">
        <div class="task-card__left-section">
          <ModalsTaskCardInfo
            v-model:task="localTask"
            :workspace="workspace"
          />
          <ModalsTaskCardAddSpentTime class="task-card__add-spent-time" />
          <ModalsTaskCardWall :workspace="workspace" :task-id="localTask.id" />
        </div>
        <div class="task-card__right-section">
          <ModalsTaskCardSelectors
            v-model:task="localTask"
            :workspace="workspace"
          />
          <ModalsTaskCardTimeInput
            v-model="localTask.initialAssessment"
            class="task-card__assessment"
            placeholder="Time assessment"
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
    max-width: 100%;
    max-height: 100%;
    padding: 16px 24px;
    overflow: auto;

    border-radius: 5px;
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow: visible;

    display: flex;
    flex-direction: column;
  }

  &__main-block {
    display: flex;

    width: 100%;
    height: 100%;

    gap: 16px;
  }

  &__wall-block {

  }

  &__left-section {
    display: flex;
    flex-direction: column;
    min-width: 500px;
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
    max-width: 300px;
  }

  &__assessment {
    margin-top: 6px;
  }

  &__add-spent-time {
    justify-content: end;
  }
}
</style>
