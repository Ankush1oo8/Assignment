"use client"

import { useState, useEffect } from "react"
import type { Employee } from "@/lib/types"
import { EmployeeTable } from "./employee-table"
import { EmployeeHeader } from "./employee-header"
import { EmployeeFormModal } from "./employee-form-modal"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"
import { useToast } from "@/hooks/use-toast"

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState<string>()
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const { toast } = useToast()

  const fetchEmployees = async (search?: string, filter?: string) => {
    try {
      setLoading(true)
      let url = "/api/employees"
      const params = new URLSearchParams()

      if (search) params.append("search", search)
      if (filter) params.append("filter", filter)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setEmployees(data.data)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch employees",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee?._id) return

    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setEmployees(employees.filter((emp) => emp._id !== selectedEmployee._id))
        toast({
          title: "Success",
          description: "Employee deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete employee",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive",
      })
    }
  }

  const handleSearch = (query: string, filter?: string) => {
    setSearchQuery(query)
    setSearchFilter(filter)
    fetchEmployees(query, filter)
  }

  const handleAddEmployee = () => {
    setSelectedEmployee(null)
    setFormMode("create")
    setIsFormModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormMode("edit")
    setIsFormModalOpen(true)
  }

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDeleteModalOpen(true)
  }

  const handleFormSuccess = () => {
    fetchEmployees(searchQuery, searchFilter)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <EmployeeHeader
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onRefresh={() => fetchEmployees(searchQuery, searchFilter)}
          onAddEmployee={handleAddEmployee}
        />
        <EmployeeTable
          employees={employees}
          loading={loading}
          onDelete={handleDeleteClick}
          onEdit={handleEditEmployee}
          onRefresh={() => fetchEmployees(searchQuery, searchFilter)}
        />

        <EmployeeFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSuccess={handleFormSuccess}
          employee={selectedEmployee}
          mode={formMode}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteEmployee}
          employee={selectedEmployee}
        />
      </div>
    </div>
  )
}
