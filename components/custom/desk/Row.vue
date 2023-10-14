<script setup lang="ts">
import Task from '@/models/Task'
import Column from '@/models/Column'
import Row from '@/models/Row'

const props = defineProps({
  tasks: { type: Array as PropType<Task[]>, default: () => [] },
  row: { type: Object as PropType<Row>, default: () => {} },
  columns: { type: Array as PropType<Column[]>, default: () => [] }
})

const emits = defineEmits([ 'addTask', 'openTask' ])

const tasksInColumn = (columnId: string) => {
  return props.tasks.filter(task => task.columnId === columnId)
}

const openAddTaskModal = (columnId: string) => {
  emits('addTask', { columnId, rowId: props.row.id })
}

const openTaskModal = (taskId: string) => {
  emits('openTask', taskId)
}
</script>

<template>
  <div class="desk-row">
    <div class="desk-row__header">
      <div class="desk-row__name">{{ row.name }}</div>
      <div class="desk-row__count">Tasks count: {{ tasks.length }}</div>
    </div>
    <div class="desk-row__columns">
      <div v-for="column in columns" :key="column.id" class="desk-row__column">
        <CustomDeskTaskCard v-for="task in tasksInColumn(column.id)" v-bind="$attrs" :key="task.id" :task="task" @click="openTaskModal(task.id)" />
        <CommonVButton
          :size="24"
          icon="plusIcon"
          class="desk-row__add-card"
          @click="openAddTaskModal(column.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desk-row {
  width: max(fit-content, 100%);

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 44px;
    width: 100%;

    margin-bottom: 4px;
  }

  &__name {
    position: absolute;
    left: 18px;
    font-size: 18px;

    @include h5;
  }

  &__count {
    position: absolute;
    right: 18px;
    font-size: 12px;
    color: $gray-600;
  }

  &__columns {
    display: flex;
  }

  &__column {
    padding: 6px 18px;
    min-width: 180px;
    width: 100%;
    border-left: 1px solid $gray-700;

    display: flex;
    flex-direction: column;
    gap: 16px;

    &:first-child {
      border-left:  none;
    }
  }

  &__add-card {
    @include set-prop-states-values(color, $gray-500, $green-400);
  }
}
</style>
