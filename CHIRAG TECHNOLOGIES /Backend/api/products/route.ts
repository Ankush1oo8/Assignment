import { type NextRequest, NextResponse } from "next/server"
import type { Product, FilterParams } from "../../types/product"

// Mock database of products
const products: Product[] = [
  { id: "1", name: "Laptop", price: 999, category: "Electronics", rating: 4.5 },
  { id: "2", name: "Smartphone", price: 699, category: "Electronics", rating: 4.2 },
  { id: "3", name: "Headphones", price: 199, category: "Electronics", rating: 4.0 },
  { id: "4", name: "T-shirt", price: 29, category: "Clothing", rating: 3.8 },
  { id: "5", name: "Jeans", price: 59, category: "Clothing", rating: 4.1 },
  { id: "6", name: "Running Shoes", price: 89, category: "Footwear", rating: 4.3 },
  { id: "7", name: "Novel", price: 15, category: "Books", rating: 4.7 },
  { id: "8", name: "Cookbook", price: 25, category: "Books", rating: 4.4 },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const filters: FilterParams = {
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      category: searchParams.get("category") ?? undefined,
      minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    }

    const filteredProducts = filterProducts(products, filters)

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error("Error in GET /api/products:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

function filterProducts(products: Product[], filters: FilterParams): Product[] {
  return products.filter((product) => {
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false
    if (filters.category !== undefined && product.category.toLowerCase() !== filters.category.toLowerCase())
      return false
    if (filters.minRating !== undefined && product.rating < filters.minRating) return false
    return true
  })
}


