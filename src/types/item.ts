export interface Item {
  id: string
  name: string
  code: string | null
  price: ItemPrice
  image: ItemImage
  material: number
}

interface ItemPrice {
  old_price: number | null
  current_price: number
}

interface ItemImage {
  url: string
}
