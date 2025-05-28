import { withInstall } from '@utils/with-install'
import Checkbox from './src/checkbox.vue'
import Group from './src/group.vue'

export const MyCheckbox = withInstall(Checkbox)
export const MyCheckboxGroup = withInstall(Group)

export default MyCheckbox

export * from './src/checkbox'
export * from './src/group' 