<script setup lang="ts">

defineProps({
  showInputLabel: { type: Boolean, default: true }
})

const isDragging = ref(false)
const files = ref<File[]>([])

const file = ref<HTMLInputElement>()

const emits = defineEmits([ 'changeFiles' ])
const handleChange = () => {
  if (!file.value || !file.value.files) return
  files.value = [ ...file.value.files ]
}

const handleDragover = () => {
  isDragging.value = true
}

const handleDragleave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  if (!file.value) return
  file.value.files = (e.dataTransfer as DataTransfer).files
  isDragging.value = false
}

const remove = (i: any) => {
  files.value.splice(i, 1)
}

const generateURL = (file: any) => {
  const fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)
  return fileSrc
}

watch(files, newValue => {
  if (!newValue.length) emits('changeFiles', [])
  else emits('changeFiles', files.value)
  file.value.value = ''
}, { deep: true })
</script>

<template>
  <div class="v-file-upload">
    <div class="v-file-upload__header">
      <slot name="header" />
      <slot name="uploadButton" for="fileInput" />
    </div>
    <input
      id="fileInput"
      ref="file"
      type="file"
      multiple
      name="file"
      class="v-file-upload__input"
      accept=".pdf,.jpg,.jpeg,.png"
      @change="handleChange"
    >

    <div
      v-if="showInputLabel"
      class="v-file-upload__container"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="handleDragleave"
      @drop.prevent="handleDrop"
    >
      <label for="fileInput" class="v-file-upload__label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
    </div>
    <div />
    <div v-if="files.length" class="v-file-upload__preview-container">
      <div v-for="f in files" :key="f.name" class="v-file-upload__preview">
        <img class="v-file-upload__preview-img" :src="generateURL(f)">
        <div class="v-file-upload__preview-overlay" />
        <div class="v-file-upload__preview-name">{{ f.name }}</div>
        <CommonVButton
          class="v-file-upload__preview-remove"
          icon="crossIcon"
          :size="20"
          @click="remove(files.indexOf(f))"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-file-upload {
  text-align: center;
  width: 100%;

  &__header {
    margin-bottom: 8px;
    display: flex;
    gap: 8;
    align-items: center;
  }

  &__container {
    border: 2px dashed $green-600;
    border-radius: 15px;
  }

  &__input {
    opacity: 0;
    position: fixed;
    left: -100px;
    top: -100px;
  }

  &__label {
    height: 60px;
    padding: 20px;
    font-size: 20px;
    display: block;
    cursor: pointer;

    & div {
      height: 0;
    }
  }

  &__preview {
    position: relative;
    width: fit-content;
    overflow: hidden;
    height: 270px;

    &-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    &-img {
      object-fit: contain;
      height: 270px;

      border: 1px solid $gray-600;
    }

    &-remove,
    &-name {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
    }

    &-name {
      text-align: center;
      width: 90%;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      @include body-2;
    }

    &-overlay {
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0;
    }

    &:hover & {
      &-overlay {
        opacity: 0.38;
      }

      &-remove,
      &-name {
        opacity: 1;
      }
    }
  }
}
</style>
