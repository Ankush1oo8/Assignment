"use client"

import type React from "react"

import { Search, Plus, RefreshCw, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface EmployeeHeaderProps {
  onSearch: (query: string, filter?: string) => void
  searchQuery: string
  onRefresh: () => void
  onAddEmployee: () => void
}

export function EmployeeHeader({ onSearch, searchQuery, onRefresh, onAddEmployee }: EmployeeHeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [searchFilter, setSearchFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localSearch, searchFilter !== "all" ? searchFilter : undefined)
  }

  const handleFilterChange = (value: string) => {
    setSearchFilter(value)
    onSearch(localSearch, value !== "all" ? value : undefined)
  }

  const clearSearch = () => {
    setLocalSearch("")
    setSearchFilter("all")
    onSearch("", undefined)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Employee Management</h1>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="border-border hover:bg-accent bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={onAddEmployee} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search employees..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </form>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="border-border hover:bg-accent bg-transparent"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        {(searchQuery || searchFilter !== "all") && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearSearch}
            className="border-border hover:bg-accent bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Search in:</label>
              <Select value={searchFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All fields</SelectItem>
                  <SelectItem value="name">Name only</SelectItem>
                  <SelectItem value="email">Email only</SelectItem>
                  <SelectItem value="position">Position only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
