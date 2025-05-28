<template>
  <div
    :class="[
      'my-upload',
      `my-upload--${listType}`,
      {
        'is-disabled': disabled,
        'is-drag': drag
      }
    ]"
  >
    <div
      v-if="drag"
      :class="['my-upload-dragger']"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @dragleave.prevent
    >
      <slot>
        <i class="my-icon-upload"></i>
        <div class="my-upload__text">
          <span>将文件拖到此处，或</span>
          <em>点击上传</em>
        </div>
      </slot>
    </div>
    <div v-else :class="['my-upload__trigger']">
      <slot>
        <button type="button" class="my-button my-button--primary">
          <i class="my-icon-upload"></i>
          <span>点击上传</span>
        </button>
      </slot>
    </div>
    <input
      ref="inputRef"
      type="file"
      :class="['my-upload__input']"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    >
    <div v-if="showFileList" :class="['my-upload__list']">
      <div
        v-for="file in fileList"
        :key="file.uid"
        :class="[
          'my-upload__item',
          `is-${file.status}`
        ]"
      >
        <img
          v-if="listType === 'picture' || listType === 'picture-card'"
          :src="file.url"
          :class="['my-upload__item-thumbnail']"
        >
        <span :class="['my-upload__item-name']">{{ file.name }}</span>
        <span :class="['my-upload__item-status']">
          <i
            v-if="file.status === 'uploading'"
            class="my-icon-loading"
          ></i>
          <i
            v-else-if="file.status === 'success'"
            class="my-icon-success"
          ></i>
          <i
            v-else-if="file.status === 'fail'"
            class="my-icon-error"
          ></i>
        </span>
        <span :class="['my-upload__item-actions']">
          <i
            class="my-icon-delete"
            @click="handleRemove(file)"
          ></i>
        </span>
        <div
          v-if="file.status === 'uploading'"
          :class="['my-upload__item-progress']"
        >
          <div
            :class="['my-upload__item-progress-bar']"
            :style="{ width: file.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { uploadProps, uploadEmits, UploadFile, UploadInstance } from './upload'
import { generateId } from '../../utils/util'

defineOptions({
  name: 'MyUpload'
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const inputRef = ref<HTMLInputElement>()
const fileList = ref<UploadFile[]>([])

const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  const uploadFiles = Array.from(files).map(file => ({
    name: file.name,
    percentage: 0,
    status: 'ready' as const,
    size: file.size,
    uid: generateId(),
    raw: file
  }))

  if (props.limit && fileList.value.length + uploadFiles.length > props.limit) {
    emit('exceed', uploadFiles, fileList.value)
    return
  }

  uploadFiles.forEach(file => {
    if (props.beforeUpload) {
      const result = props.beforeUpload(file.raw!)
      if (result instanceof Promise) {
        result.then(processedFile => {
          upload(processedFile)
        }).catch(() => {
          // Handle error
        })
      } else if (result !== false) {
        upload(file.raw!)
      }
    } else {
      upload(file.raw!)
    }
  })
}

const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files
  if (!files) return

  const uploadFiles = Array.from(files).map(file => ({
    name: file.name,
    percentage: 0,
    status: 'ready' as const,
    size: file.size,
    uid: generateId(),
    raw: file
  }))

  if (props.limit && fileList.value.length + uploadFiles.length > props.limit) {
    emit('exceed', uploadFiles, fileList.value)
    return
  }

  uploadFiles.forEach(file => {
    if (props.beforeUpload) {
      const result = props.beforeUpload(file.raw!)
      if (result instanceof Promise) {
        result.then(processedFile => {
          upload(processedFile)
        }).catch(() => {
          // Handle error
        })
      } else if (result !== false) {
        upload(file.raw!)
      }
    } else {
      upload(file.raw!)
    }
  })
}

const upload = (file: File) => {
  const uploadFile: UploadFile = {
    name: file.name,
    percentage: 0,
    status: 'uploading',
    size: file.size,
    uid: generateId(),
    raw: file
  }

  fileList.value.push(uploadFile)
  emit('change', uploadFile)

  const formData = new FormData()
  formData.append(props.name, file)
  Object.keys(props.data).forEach(key => {
    formData.append(key, props.data[key])
  })

  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      uploadFile.percentage = Math.round((e.loaded * 100) / e.total)
      emit('progress', e, uploadFile)
    }
  })

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      uploadFile.status = 'success'
      uploadFile.response = xhr.response
      emit('success', xhr.response, uploadFile)
    } else {
      uploadFile.status = 'fail'
      emit('error', new Error(xhr.statusText), uploadFile)
    }
  })

  xhr.addEventListener('error', () => {
    uploadFile.status = 'fail'
    emit('error', new Error('Network Error'), uploadFile)
  })

  xhr.open(props.method, props.action, true)
  Object.keys(props.headers).forEach(key => {
    xhr.setRequestHeader(key, props.headers[key])
  })
  xhr.withCredentials = props.withCredentials
  xhr.send(formData)
}

const handleRemove = (file: UploadFile) => {
  if (props.beforeRemove) {
    const result = props.beforeRemove(file)
    if (result instanceof Promise) {
      result.then(() => {
        remove(file)
      }).catch(() => {
        // Handle error
      })
    } else if (result !== false) {
      remove(file)
    }
  } else {
    remove(file)
  }
}

const remove = (file: UploadFile) => {
  const index = fileList.value.indexOf(file)
  if (index !== -1) {
    fileList.value.splice(index, 1)
    emit('remove', file)
  }
}

const clearFiles = () => {
  fileList.value = []
}

const submit = () => {
  fileList.value.forEach(file => {
    if (file.status === 'ready' && file.raw) {
      upload(file.raw)
    }
  })
}

const uploadInstance: UploadInstance = {
  upload,
  abort: (file: UploadFile) => {
    // Implement abort functionality
  },
  clearFiles,
  submit
}

defineExpose(uploadInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;

  &__input {
    display: none;
  }

  &__trigger {
    display: inline-block;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    font-size: $font-size-base;
    line-height: 1.8;
    margin-top: 8px;
    position: relative;
    transition: all 0.3s;

    &-name {
      color: $text-regular;
      display: inline-block;
      padding-right: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }

    &-status {
      position: absolute;
      right: 0;
      top: 0;
      line-height: inherit;
    }

    &-actions {
      position: absolute;
      right: 7px;
      top: 0;
      line-height: inherit;
      display: none;
    }

    &:hover {
      .my-upload__item-actions {
        display: inline-block;
      }
    }

    &-progress {
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
    }

    &-progress-bar {
      background-color: $primary-color;
      height: 2px;
      transition: width 0.3s;
    }

    &-thumbnail {
      width: 40px;
      height: 40px;
      position: relative;
      z-index: 1;
      background-color: #fff;
      object-fit: cover;
    }
  }

  &--picture {
    .my-upload__item {
      overflow: hidden;
      background-color: #fff;
      border: 1px solid $border-color-base;
      border-radius: $border-radius-base;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;

      &-thumbnail {
        display: block;
        width: 100%;
        height: 100%;
      }

      &-name {
        display: none;
      }

      &-status {
        display: none;
      }

      &-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        .my-upload__item-actions {
          opacity: 1;
        }
      }
    }
  }

  &--picture-card {
    .my-upload__item {
      overflow: hidden;
      background-color: #fff;
      border: 1px dashed $border-color-base;
      border-radius: $border-radius-base;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;

      &-thumbnail {
        display: block;
        width: 100%;
        height: 100%;
      }

      &-name {
        display: none;
      }

      &-status {
        display: none;
      }

      &-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        .my-upload__item-actions {
          opacity: 1;
        }
      }
    }
  }

  &-dragger {
    border: 1px dashed $border-color-base;
    border-radius: $border-radius-base;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 20px;
    width: 360px;
    height: 180px;
    box-sizing: border-box;

    &:hover {
      border-color: $primary-color;
    }

    .my-icon-upload {
      font-size: 48px;
      color: $text-secondary;
      margin-bottom: 16px;
    }

    .my-upload__text {
      color: $text-regular;
      font-size: $font-size-base;
      text-align: center;

      em {
        color: $primary-color;
        font-style: normal;
      }
    }
  }

  &.is-disabled {
    .my-upload-dragger {
      cursor: not-allowed;
      border-color: $disabled-color-base;

      &:hover {
        border-color: $disabled-color-base;
      }
    }
  }
}
</style> 