<script setup lang="ts">
import moment from 'moment'
import Task from '@/models/Task'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

import Member from '@/models/Member'

const props = defineProps({
  task: { type: Object as PropType<Task>, default: () => {} },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} },
  isEdit: { type: Boolean, default: false }
})

const creator = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value?.authorId) as Member
})

const updater = computed(() => {
  return props.workspace.members.find(member => member.id === localTask.value?.updaterId) as Member
})

const localTask = ref<Task>()

const filesUpdate = (files: File[]) => {
  console.log(files)
}

watch(() => props.task, newValue => {
  localTask.value = newValue
}, { immediate: true, deep: true })

watchEffect(() => {

})
</script>

<template>
  <div class="task-card-info">
    <template v-if="localTask">
      <div class="task-card-info__actions-date">
        <div v-if="creator" class="task-card-info__creator">Created by {{ userName(creator) }} {{ moment(localTask?.createdAt).fromNow() }}</div>
        <div v-if="updater" class="task-card-info__updater">Updated by {{ userName(updater) }} {{ moment(localTask?.updatedAt).fromNow() }}</div>
      </div>
      <TextEditable
        v-model="localTask.title"
        :is-edit="isEdit"
        underlined
        placeholder="Title"
        class="task-card-info__title"
      >
        {{ localTask.title }}
      </TextEditable>
      <TextareaEditable
        v-model="localTask.description"
        :is-edit="isEdit"
        rows="9"
        placeholder="Description"
        class="task-card-info__description"
        underlined
      >
        {{ localTask.description }}
      </TextareaEditable>
      <ModalsTaskCardFileUpload :files="localTask.files" @files-update="filesUpdate" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.task-card-info {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-width: 400px;

  &__actions-date {
    display: flex;
    flex-direction: column;
  }

  &__creator,
  &__updater {
    text-wrap: nowrap;
    color: $gray-500;

    @include caption-1;
  }

  &__title {
    @include h5;
  }

  &__description {
    color: $gray-400;
  }

  &__title,
  &__description {
    overflow-wrap: break-word;
  }
}
</style>
