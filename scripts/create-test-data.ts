// Script to create test employee data for development
import { getDatabase } from "../lib/mongodb"
import type { Employee } from "../lib/types"

async function createTestData() {
  try {
    const db = await getDatabase()
    const collection = db.collection<Employee>("employees")

    // Clear existing test data
    await collection.deleteMany({})

    const testEmployees = [
      {
        name: "John Smith",
        email: "john.smith@company.com",
        position: "Software Engineer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        position: "Product Manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Chen",
        email: "michael.chen@company.com",
        position: "UX Designer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily Davis",
        email: "emily.davis@company.com",
        position: "Marketing Specialist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David Wilson",
        email: "david.wilson@company.com",
        position: "DevOps Engineer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const result = await collection.insertMany(testEmployees)
    console.log(`✅ Created ${result.insertedCount} test employees`)

    // Verify the data
    const count = await collection.countDocuments()
    console.log(`📊 Total employees in database: ${count}`)
  } catch (error) {
    console.error("❌ Error creating test data:", error)
  }
}

createTestData()
