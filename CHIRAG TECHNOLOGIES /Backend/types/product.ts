export interface Product {
  id: string
  name: string
  price: number
  category: string
  rating: number
}

export interface FilterParams {
  minPrice?: number
  maxPrice?: number
  category?: string
  minRating?: number
}


