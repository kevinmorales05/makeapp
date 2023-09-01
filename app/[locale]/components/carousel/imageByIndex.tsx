import image1 from './korean-cosmetic/1.jpg'
import image2 from './korean-cosmetic/2.jpg'
import image11 from '@/public/mocking/banila.jpg'
import image22 from '@/public/mocking/chamos.jpg'
import image33 from '@/public/mocking/creams.jpg'
import image44 from '@/public/mocking/mizon.jpg'

export const images: any[] = [image11, image22, image33, image44, image11, image22, image33, image44]
const imageByIndex = (index: number): string => images[index % images.length].src
export default imageByIndex
