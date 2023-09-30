<script setup lang="ts">
import Task from '@/models/Task'
import Tag from '@/models/Tag'
import Member from '@/models/Member'
import TaskType from '@/models/TaskType'

const attrs = useAttrs()

const tags = computed(() => attrs.tags as Tag[])
const taskTags = computed(() => tags.value.filter((tag: Tag) => props.task.tags.includes(tag.id)))

const members = computed(() => attrs.members as Member[])
const performer = computed(() => members.value.find(member => member.id === props.task.performerId))

const taskTypes = computed(() => attrs.taskTypes as TaskType[])
const taskTaskType = computed(() => {
  const taskType = taskTypes.value.find(taskType => taskType.id === props.task.taskTypeId)
  return capitalizeFirstLetter(taskType?.name)
})

const completed = computed(() => {
  if (!props.task.initialAssessment || Number(props.task.initialAssessment) < props.task.spentTime) return '0%'
  return (props.task.spentTime / props.task.initialAssessment * 100) + '%'
})

const description = computed(() => props.task.description && props.task.description !== 'null' ? props.task.description : 'Нет описания')

const assessment = computed(() => {
  if (!props.task.initialAssessment) return '?'
  return fromNumberToTime(props.task.initialAssessment)
})

const styles = computed(() => {
  if (!props.task.initialAssessment) return {}
  if (Number(props.task.initialAssessment) < props.task.spentTime) {
    return {
      'background-color': '$error'
    }
  }
  return {}
})

const props = defineProps({
  task: { type: Object as PropType<Task>, default: () => {} }
})
</script>

<template>
  <div v-if="task.id" class="task-card">
    <div class="task-card__header">
      <div class="task-card__title">{{ capitalizeFirstLetter(task.title) }}</div>
      <div class="task-card__task-type">{{ taskTaskType }}</div>
      <CommonVTag v-for="tag in taskTags" :key="tag.id" class="task-card__tag" :color="tag.color" :background="tag.background">{{ capitalizeFirstLetter(tag.name) }}</CommonVTag>
    </div>
    <div class="task-card__body">
      {{ description }}
    </div>
    <div class="task-card__footer">
      <div class="task-card__performer">
        <CommonVImage v-if="performer" class="task-card__performer-avatar" :path="performer.avatar" />
        <CommonVIcon v-else class="task-card__performer-icon" :size="30" name="unknownIcon" />
        <div>{{ performer ?? 'Not assigned' }}</div>
      </div>
      <div class="task-card__spend">
        <div class="task-card__circle" :style="styles" />
        <div class="task-card__assessment-time">{{ assessment }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.task-card {
  border-radius: 12px;
  border: 1px solid $gray-700;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  cursor: pointer;

  @include set-prop-states-values(background-color, $gray-1000, $gray-800);

  &__header {
    display: flex;
    flex-wrap: nowrap;
    gap: 2px 12px;
    align-items: center;

    overflow: hidden;
  }

  &__tag {
    font-weight: $font-weight-medium;
  }

  &__title {
    font-weight: 600;
  }

  &__title,
  &__task-type {
    white-space: nowrap;
  }

  &__body {
    color: $gray-500;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    @include caption-1;
  }

  &__footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 30px;
  }

  &__performer {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &-avatar {
      min-width: 32px;
      display: flex;
      width: 100%;
      height: 100%;
    }

    &-icon {
      padding: 4px;
      background-color: $gray-900;

      @include round;
    }
  }

  &__spend {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid $gray-600;
    background: conic-gradient(
      $green-600 v-bind(completed),
      transparent v-bind(completed)
    );
  }

  &__assessment-time {
    font-size: 12px;
  }

}
</style>
