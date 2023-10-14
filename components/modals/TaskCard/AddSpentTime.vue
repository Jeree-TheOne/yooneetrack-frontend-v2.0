<script setup lang="ts">
const time = ref<number>(0)

const addTime = () => {

}
</script>

<template>
  <div class="add-spent-time">
    <CommonVButton v-if="time" :size="24" icon="plusIcon" @click="addTime" />
    <ModalsTaskCardTimeInput v-model="time" class="add-spent-time__input" placeholder="Add spent time" />
  </div>
</template>

<style lang="scss" scoped>
.add-spent-time {
  display: flex;
  align-items: center;

  &__input {
    width: 150px;
  }
}
</style>
