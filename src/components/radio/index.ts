import { withInstall } from '@utils/with-install'
import Radio from './src/radio.vue'
import Group from './src/group.vue'

export const MyRadio = withInstall(Radio)
export const MyRadioGroup = withInstall(Group)

export default MyRadio

export * from './src/radio'
export * from './src/group' 