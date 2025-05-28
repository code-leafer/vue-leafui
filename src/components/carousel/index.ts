import { withInstall } from '@utils/with-install'
import Carousel from './src/carousel.vue'
import CarouselItem from './src/carousel-item.vue'

export const MyCarousel = withInstall(Carousel)
export const MyCarouselItem = withInstall(CarouselItem)

export default MyCarousel

export * from './src/carousel' 