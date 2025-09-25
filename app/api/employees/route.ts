import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { CreateEmployeeData, Employee } from "@/lib/types"

// GET - Fetch all employees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const filter = searchParams.get("filter")

    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    let query = {}
    if (search) {
      if (filter && filter !== "all") {
        // Search in specific field
        query = {
          [filter]: { $regex: search, $options: "i" },
        }
      } else {
        // Search in all fields
        query = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { position: { $regex: search, $options: "i" } },
          ],
        }
      }
    }

    const employees = await collection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: employees.map((emp) => ({
        ...emp,
        _id: emp._id?.toString(),
      })),
      count: employees.length,
    })
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch employees" }, { status: 500 })
  }
}

// POST - Create new employee
export async function POST(request: NextRequest) {
  try {
    const body: CreateEmployeeData = await request.json()

    // Validation
    if (!body.name || !body.email || !body.position) {
      return NextResponse.json({ success: false, error: "Name, email, and position are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    // Check if email already exists
    const existingEmployee = await collection.findOne({ email: body.email })
    if (existingEmployee) {
      return NextResponse.json({ success: false, error: "Employee with this email already exists" }, { status: 409 })
    }

    const newEmployee: Omit<Employee, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newEmployee)

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId.toString(),
          ...newEmployee,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json({ success: false, error: "Failed to create employee" }, { status: 500 })
  }
}
