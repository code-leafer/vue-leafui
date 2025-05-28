import { withInstall } from '@utils/with-install'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'

export const MyBreadcrumb = withInstall(Breadcrumb)
export const MyBreadcrumbItem = withInstall(BreadcrumbItem)

export default MyBreadcrumb

export * from './src/breadcrumb' 