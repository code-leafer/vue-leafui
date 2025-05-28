import { withInstall } from '@utils/with-install'
import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export const MyGrid = withInstall(Grid)
export const MyGridItem = withInstall(GridItem)

export default MyGrid

export * from './src/grid' 