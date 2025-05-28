import { withInstall } from '@utils/with-install'
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import Submenu from './src/submenu.vue'

export const MyMenu = withInstall(Menu)
export const MyMenuItem = withInstall(MenuItem)
export const MySubmenu = withInstall(Submenu)

export default MyMenu

export * from './src/menu' 