<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DeskService from '@/services/deskService'

import Column from '@/models/Column'
import Row from '@/models/Row'
import Task from '@/models/Task'

const attrs = useAttrs()

const props = defineProps({
  id: { type: String, required: true },
  search: { type: String, default: '' }
})

const columns = computed(() => {
  return attrs.columns as Column[]
})

const rows = computed(() => {
  return attrs.rows as Row[]
})

const tasks = ref([] as Task[])

const init = async () => {
  const desk = await DeskService.select(props.id) // TODO: seaprate desk data and tasks at endpoint
  tasks.value = desk.tasks
}
// TODO: Add more filter + interface for this shit
const filteredTasks = (rowId: string) => {
  return tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchLower.value) ||
    task.description?.toLowerCase().includes(searchLower.value)
  ).filter(task => task.rowId === rowId)
}

const searchLower = computed(() => {
  return props.search.toLowerCase()
})

watch(() => props.id, () => {
  init()
}, { immediate: true })
</script>

<template>
  <div class="desk">
    <div class="desk-columns">
      <div
        v-for="column in columns"
        :key="column.id"
        class="desk-column"
      >
        {{ column.name }}
      </div>
    </div>
    <CustomDeskRow
      v-for="row in rows"
      :key="row.id"
      :row="row"
      v-bind="$attrs"
      :tasks="filteredTasks(row.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.desk {
  padding: 16px 0;
  overflow-y: auto;
  height: calc(100vh - 150px);
  &-columns {
    display: flex;
  }

  &-column {
    padding: 6px 18px;
    min-width: 180px;
    width: 100%;
    border-left: 1px solid $gray-700;

    &:first-child {
      border-left:  none;
    }
  }

}
</style>
