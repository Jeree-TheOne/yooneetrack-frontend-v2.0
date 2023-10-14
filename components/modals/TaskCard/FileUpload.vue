<script setup lang="ts">
import axios from 'axios'

const props = defineProps({
  files: { type: Array as PropType<string[]>, default: () => [] }
})

const emits = defineEmits([ 'filesUpdate' ])

const changeFiles = (addedFiles: File[]) => {
  loadedFiles.value = addedFiles
  nextTick(() => {
    emits('filesUpdate', localFiles.value)
  })
}

const loadedFiles = ref<File[]>([])
const localFiles = ref<File[]>([])

const generateURL = (file: any) => {
  if (file.name.includes(import.meta.env.VITE_API_URL)) return file.name
  const fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)
  return fileSrc
}

watch([ () => loadedFiles.value, () => props.files ], async () => {
  const files = await Promise.all(props.files.map(value => axios.get(value)))
  localFiles.value = [ ...files.map(file => new File([ file.data ], file.request.responseURL)), ...loadedFiles.value ]
}, { deep: true })
</script>

<template>
  <div class="file-upload">
    <CommonVFileUpload :show-input-label="!localFiles.length" @change-files="changeFiles">
      <template #header>
        Attachments: {{ localFiles.length }}
      </template>
      <template #uploadButton="uploadAttrs">
        <label class="file-upload__upload-button" v-bind="uploadAttrs">
          <CommonVIcon :size="14" name="plusIcon" />
        </label>
      </template>
    </CommonVFileUpload>
    <div class="file-upload__files-container">
      <CommonVImage
        v-for="file in localFiles"
        :key="file.name"
        raw-src
        class="file-upload__files"
        :path="generateURL(file)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-upload {
  &__upload-button {
    display: flex;
    height: fit-content;
    padding: 4px;

    cursor: pointer;

    @include set-prop-states-values(color, $green-600, $green-400);
  }

  &__files {
    width: 120px;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid $gray-700;
    background-color: $gray-700;

    &-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
      gap: 4px;
    }
  }
}
</style>
