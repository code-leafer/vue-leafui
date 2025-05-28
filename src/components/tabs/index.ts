import { withInstall } from '@utils/with-install'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

export const MyTabs = withInstall(Tabs)
export const MyTabPane = withInstall(TabPane)

export default MyTabs

export * from './src/tabs' 