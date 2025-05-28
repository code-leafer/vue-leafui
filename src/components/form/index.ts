import { withInstall } from '../../utils/with-install'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const MyForm = withInstall(Form)
export const MyFormItem = withInstall(FormItem)
export default MyForm

export * from './src/form'
export * from './src/form-item' 