<script setup lang="ts">
import { WallItem } from '@/models/Wall'
import { getWall } from '@/services/taskService'
import WorkspaceAttrs from '@/models/WorkspaceAttrs'

const props = defineProps({
  taskId: { type: String, default: null },
  workspace: { type: Object as PropType<WorkspaceAttrs>, default: () => {} }
})

const wallItems = ref<WallItem[]>()
const comment = ref('')

onMounted(async () => {
  if (!props.taskId) return

  wallItems.value = await getWall(props.taskId)
})
</script>

<template>
  <div class="task-card-wall">
    <div class="task-card-wall__items">
      <ModalsTaskCardWallItem
        v-for="wallItem of wallItems"
        v-bind="$attrs"
        :key="wallItem.id"
        :item="wallItem"
        :workspace="workspace"
      />
    </div>
    <div class="task-card-wall__comment-section">
      <CommonVTextarea
        v-model="comment"
        rows="4"
        placeholder="Comment"
        class="task-card-wall__textarea"
      />
      <CommonVButton :disabled="!comment" icon="sendIcon" :size="20" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card-wall {
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__comment-section {
    margin-top: 12px;

    display: flex;
    gap: 4px;
  }

  &__textarea {
    width: 100%;
  }
}
</style>
