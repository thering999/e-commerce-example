export interface ServerResponse {
  count: number
  orders : OrderModel[]
}


export interface ProductModel {
  name: string
  imageUrls: []
  price: number
  code: number
  id: string
}




export interface OrderModel {
  id: string
  createdAt: string
  products: ProductModel[]
  total: number
}
