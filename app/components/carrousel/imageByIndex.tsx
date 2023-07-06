import image1 from './korean-cosmetic/1.jpg'
import image2 from './korean-cosmetic/2.jpg'

export const images: any[] = [image1, image2, image1, image2]
console.log("images is this: ", images)

const imageByIndex = (index: number): string => images[index % images.length].src

export default imageByIndex
