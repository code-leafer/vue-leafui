import { withInstall } from '@utils/with-install'
import Steps from './src/steps.vue'
import Step from './src/step.vue'

export const MySteps = withInstall(Steps)
export const MyStep = withInstall(Step)

export default MySteps

export * from './src/steps' 