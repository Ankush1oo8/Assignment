"use client"

import { useState, useEffect, useCallback } from "react"
import type { Product, FilterParams } from "./types/product"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<FilterParams>({})
  const [appliedFilters, setAppliedFilters] = useState<FilterParams>({})
  const [loading, setLoading] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (appliedFilters.minPrice) params.append("minPrice", appliedFilters.minPrice.toString())
    if (appliedFilters.maxPrice) params.append("maxPrice", appliedFilters.maxPrice.toString())
    if (appliedFilters.category) params.append("category", appliedFilters.category)
    if (appliedFilters.minRating) params.append("minRating", appliedFilters.minRating.toString())

    try {
      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : Number(value) || value,
    }))
  }

  const applyFilters = () => {
    setAppliedFilters(filters)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product Listings</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="number"
            placeholder="Min Price"
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Max Price"
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Category"
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Min Rating"
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            className="w-full"
          />
        </CardContent>
        <CardContent>
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm">Rating: {product.rating.toFixed(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center">No products found matching the current filters.</p>
      )}
    </div>
  )
}


