import { withInstall } from '@utils/with-install'
import Notification from './src/notification.vue'
import { notification } from './src/notification-service'

export const MyNotification = withInstall(Notification)
export default MyNotification

export * from './src/notification'
export { notification } 