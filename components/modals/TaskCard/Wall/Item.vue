<script setup lang="ts">
import moment from 'moment'
import { SPENT_TIME, COMMENT } from '@/constants/Wall'
import { UPDATABLE_FIELDS, TITLE, DESCRIPTION, INITIAL_ASSESSMENT, TAGS, FILES } from '@/constants/History'
import { WallItem } from '@/models/Wall'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'
import { UpdatableFields } from '@/models/Wall/History'
import CommonVTag from '@/components/common/VTag.vue'

const props = defineProps({
  item: { type: Object as PropType<WallItem>, default: () => {} },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const author = computed(() => {
  return props.workspace.members.find(member => member.id === props.item.userId)
})

const fieldValues = (field: UpdatableFields, value: string) => {
  if (field === TITLE || field === DESCRIPTION || field === INITIAL_ASSESSMENT) return value
  if (field === TAGS) {
    const tags = value.split(',').map(id => props.workspace.tags.find(tag => tag.id === id))
    return tags.map(tag => tag?.name).join(', ')
  }
  if (field === FILES) return ''
  const item = props.workspace[UPDATABLE_FIELDS[field] + 's' as keyof typeof props.workspace].find((item: any) => item.id === value)
  return item.name
}

</script>

<template>
  <div v-if="author" class="wall-item">
    <CommonVImage :size="50" :path="author.avatar" />
    <div class="wall-item__info">
      <div class="wall-item__info-header">
        <span class="wall-item__user">{{ userName(author) }}</span>
        <span class="wall-item__created-at">{{ moment(item.createdAt).fromNow() }}</span>
      </div>
      <div v-if="item.type === SPENT_TIME">
        Added spent time: {{ fromNumberToTime(item.spentTime) }}
      </div>
      <div v-else-if="item.type === COMMENT">
        {{ item.text }}
      </div>
      <div v-else class="wall-item--history">
        <span>Updated:</span>
        <div v-for="(field, index) of item.updatedFields" :key="field">
          {{ capitalizeFirstLetter(UPDATABLE_FIELDS[field]) }}: {{ fieldValues(field, item.previousValues[index]) }} -> {{ fieldValues(field, item.fieldsValues[index]) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wall-item {
  display: flex;
  gap: 8px;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-header {
      display: flex;
      gap: 8px;
    }
  }

  &__user {
    color: $gray-400;
    @include body-1;
  }

  &__created-at {
    color: $gray-500;
    @include body-1;
  }
}
</style>
