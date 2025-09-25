"use client"

import type { Employee } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Mail, User, Briefcase } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface EmployeeTableProps {
  employees: Employee[]
  loading: boolean
  onDelete: (employee: Employee) => void // Changed to pass full employee object
  onEdit: (employee: Employee) => void // Added onEdit prop
  onRefresh: () => void
}

export function EmployeeTable({ employees, loading, onDelete, onEdit, onRefresh }: EmployeeTableProps) {
  if (loading) {
    return (
      <Card className="bg-card border-border">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading employees...</p>
        </div>
      </Card>
    )
  }

  if (employees.length === 0) {
    return (
      <Card className="bg-card border-border">
        <div className="p-8 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first employee to the system.</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Employee</Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Employee</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Position</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Added</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-accent/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{employee.position}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-muted-foreground">
                    {employee.createdAt
                      ? formatDistanceToNow(new Date(employee.createdAt), { addSuffix: true })
                      : "Unknown"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Active
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(employee)}
                      className="h-8 w-8 p-0 hover:bg-accent"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(employee)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
