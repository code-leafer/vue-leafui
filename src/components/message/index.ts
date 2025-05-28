import { withInstall } from '../../utils/with-install'
import Message from './src/message.vue'
import message from './src/message-service'

export const MyMessage = withInstall(Message)
export default message

export * from './src/message'
export * from './src/message-service' 