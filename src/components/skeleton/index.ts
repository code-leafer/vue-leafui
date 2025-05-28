import { withInstall } from '@utils/with-install'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const MySkeleton = withInstall(Skeleton)
export const MySkeletonItem = withInstall(SkeletonItem)

export default MySkeleton

export * from './src/skeleton' 