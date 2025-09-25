"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { Employee, CreateEmployeeData, UpdateEmployeeData } from "@/lib/types"
import { AlertCircle, CheckCircle } from "lucide-react"

interface EmployeeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  employee?: Employee | null
  mode: "create" | "edit"
}

export function EmployeeFormModal({ isOpen, onClose, onSuccess, employee, mode }: EmployeeFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  useEffect(() => {
    if (employee && mode === "edit") {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
      })
    }
    setErrors({})
    setFieldValidation({})
  }, [employee, mode, isOpen])

  const validateField = (field: string, value: string) => {
    let isValid = false
    let error = ""

    switch (field) {
      case "name":
        isValid = value.trim().length >= 2
        error = isValid ? "" : "Name must be at least 2 characters long"
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        isValid = emailRegex.test(value.trim())
        error = isValid ? "" : "Please enter a valid email address"
        break
      case "position":
        isValid = value.trim().length >= 2
        error = isValid ? "" : "Position must be at least 2 characters long"
        break
    }

    return { isValid, error }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const newValidation: Record<string, boolean> = {}

    Object.keys(formData).forEach((field) => {
      const { isValid, error } = validateField(field, formData[field as keyof typeof formData])
      newValidation[field] = isValid
      if (!isValid) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
    setFieldValidation(newValidation)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const url = mode === "create" ? "/api/employees" : `/api/employees/${employee?._id}`
      const method = mode === "create" ? "POST" : "PUT"

      const payload: CreateEmployeeData | UpdateEmployeeData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        position: formData.position.trim(),
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Employee ${mode === "create" ? "created" : "updated"} successfully`,
        })
        onSuccess()
        onClose()
      } else {
        if (response.status === 409) {
          setErrors({ email: "An employee with this email already exists" })
          setFieldValidation((prev) => ({ ...prev, email: false }))
        } else {
          toast({
            title: "Error",
            description: data.error || `Failed to ${mode} employee`,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode} employee`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    const { isValid, error } = validateField(field, value)
    setFieldValidation((prev) => ({ ...prev, [field]: isValid }))
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const getFieldIcon = (field: string) => {
    if (fieldValidation[field] === true) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (fieldValidation[field] === false) {
      return <AlertCircle className="h-4 w-4 text-destructive" />
    }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {mode === "create" ? "Add New Employee" : "Edit Employee"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 ${
                    errors.name ? "border-destructive" : fieldValidation.name ? "border-green-500" : ""
                  }`}
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getFieldIcon("name")}</div>
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 ${
                    errors.email ? "border-destructive" : fieldValidation.email ? "border-green-500" : ""
                  }`}
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getFieldIcon("email")}</div>
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-foreground">
                Position
              </Label>
              <div className="relative">
                <Input
                  id="position"
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="Enter job position"
                  className={`bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 ${
                    errors.position ? "border-destructive" : fieldValidation.position ? "border-green-500" : ""
                  }`}
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getFieldIcon("position")}</div>
              </div>
              {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="border-border hover:bg-accent bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  {mode === "create" ? "Creating..." : "Updating..."}
                </div>
              ) : (
                <>{mode === "create" ? "Create Employee" : "Update Employee"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
