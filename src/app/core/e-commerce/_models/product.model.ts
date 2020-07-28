
export interface ProductModelServer {
  name: string
  imageUrls: []
  price : string
  code: number
  id: string
  createdAt: string
}

export interface ServerResponse {
  count: number
  products: ProductModelServer[]
}
