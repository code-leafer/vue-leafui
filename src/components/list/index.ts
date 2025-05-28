import { withInstall } from '@utils/with-install'
import List from './src/list.vue'
import ListItem from './src/list-item.vue'

export const MyList = withInstall(List)
export const MyListItem = withInstall(ListItem)

export default MyList

export * from './src/list' 