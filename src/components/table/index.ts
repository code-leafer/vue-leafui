import { withInstall } from '@utils/with-install'
import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'

export const MyTable = withInstall(Table)
export const MyTableColumn = withInstall(TableColumn)

export default MyTable

export * from './src/table' 