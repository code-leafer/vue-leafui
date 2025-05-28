import type { ExtractPropTypes, PropType } from 'vue'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'fail'
export type UploadListType = 'text' | 'picture' | 'picture-card'

export interface UploadFile {
  name: string
  percentage?: number
  status: UploadFileStatus
  size: number
  response?: any
  uid: number
  url?: string
  raw?: File
}

export const uploadProps = {
  action: {
    type: String,
    required: true
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  method: {
    type: String,
    default: 'post'
  },
  data: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: 'file'
  },
  withCredentials: {
    type: Boolean,
    default: false
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  drag: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 0
  },
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text'
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeUpload: {
    type: Function as PropType<(file: File) => boolean | Promise<File>>,
    default: null
  },
  beforeRemove: {
    type: Function as PropType<(file: UploadFile) => boolean | Promise<boolean>>,
    default: null
  },
  onSuccess: {
    type: Function as PropType<(response: any, file: UploadFile) => void>,
    default: null
  },
  onError: {
    type: Function as PropType<(error: Error, file: UploadFile) => void>,
    default: null
  },
  onProgress: {
    type: Function as PropType<(evt: ProgressEvent, file: UploadFile) => void>,
    default: null
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: null
  },
  onRemove: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: null
  },
  onExceed: {
    type: Function as PropType<(files: File[], uploadFiles: UploadFile[]) => void>,
    default: null
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export const uploadEmits = {
  'update:fileList': (fileList: UploadFile[]) => true,
  'change': (file: UploadFile) => true,
  'remove': (file: UploadFile) => true,
  'success': (response: any, file: UploadFile) => true,
  'error': (error: Error, file: UploadFile) => true,
  'progress': (evt: ProgressEvent, file: UploadFile) => true,
  'exceed': (files: File[], uploadFiles: UploadFile[]) => true
}

export type UploadEmits = typeof uploadEmits

export interface UploadInstance {
  upload: (file: File) => void
  abort: (file: UploadFile) => void
  clearFiles: () => void
  submit: () => void
} 