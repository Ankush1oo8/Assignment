import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { UpdateEmployeeData, Employee } from "@/lib/types"
import { ObjectId } from "mongodb"

// GET - Fetch single employee
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    const employee = await collection.findOne({ _id: new ObjectId(id) })

    if (!employee) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...employee,
        _id: employee._id?.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch employee" }, { status: 500 })
  }
}

// PUT - Update employee
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body: UpdateEmployeeData = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    // Email validation if email is being updated
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
      }
    }

    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    // Check if email already exists (excluding current employee)
    if (body.email) {
      const existingEmployee = await collection.findOne({
        email: body.email,
        _id: { $ne: new ObjectId(id) },
      })
      if (existingEmployee) {
        return NextResponse.json({ success: false, error: "Employee with this email already exists" }, { status: 409 })
      }
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" },
    )

    if (!result) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        _id: result._id?.toString(),
      },
    })
  } catch (error) {
    console.error("Error updating employee:", error)
    return NextResponse.json({ success: false, error: "Failed to update employee" }, { status: 500 })
  }
}

// DELETE - Delete employee
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Employee deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting employee:", error)
    return NextResponse.json({ success: false, error: "Failed to delete employee" }, { status: 500 })
  }
}
