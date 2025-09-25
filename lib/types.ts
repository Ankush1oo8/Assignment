export interface Employee {
  _id?: string
  name: string
  email: string
  position: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateEmployeeData {
  name: string
  email: string
  position: string
}

export interface UpdateEmployeeData {
  name?: string
  email?: string
  position?: string
}
