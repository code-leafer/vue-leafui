import { withInstall } from '@utils/with-install'
import Select from './src/select.vue'
import Option from './src/option/index'
import Group from './src/group/index'

export const MySelect = withInstall(Select)
export const MySelectOption = withInstall(Option)
export const MySelectGroup = withInstall(Group)

export default MySelect

export * from './src/select'
export * from './src/option'
export * from './src/group' 