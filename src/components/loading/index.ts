import { withInstall } from '@utils'
import Loading from './src/loading.vue'
import loading from './src/loading-service'

export const MyLoading = withInstall(Loading)
export default MyLoading

export { loading }
export * from './src/loading' 