<script setup lang="ts">
import WorkspaceService from '@/services/workspaceService'
const isExpand = ref(false)

const workspaces = ref([] as {id: string, name: string}[])

const expandSidebar = () => {
  isExpand.value = !isExpand.value
}

onMounted(async () => {
  workspaces.value = await WorkspaceService.getAll()
})
</script>

<template>
  <div class="sidebar__wrapper">
    <div class="sidebar" :class="{'sidebar--expand': isExpand}">
      <CommonVButton
        :size="40"
        icon="menuIcon"
        text
        class="sidebar__button"
        @click.stop="expandSidebar"
      />
      <div class="sidebar__items">
        <CommonVButton
          v-for="workspace in workspaces"
          :key="workspace.id"
          class="sidebar__item"
          :to="{ name: 'workspace-workspace-desk', params: { workspace: workspace.id, desk: 'current' } }"
        >
          {{ workspace.name }}
        </CommonVButton>
      </div>
    </div>
    <CommonVOverlay :z-index="3" :show="isExpand" @click="expandSidebar" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  height: 100%;

  width: 0px;
  transition: width 300ms linear;

  background-color: $gray-800;

  z-index: 4;

  overflow: hidden;

  &--expand {
    width: 300px;
    transition: all 300ms linear;
  }

  &__wrapper {
    height: 100%;
  }

  &__button {
    position: fixed;
    margin: 7px;
    z-index: 5;

    @include set-prop-states-values(color, $gray-0, $green-400)
  }

  &__items {
    position: relative;
    z-index: 4;
    padding-top: 70px;
    display: flex;
    flex-direction: column;

    width: 100%;

    gap: 8px;
  }

  &__item {
    display: block;
    width: 100%;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;

    @include body-2;
  }
}
</style>
