# Backend API

This is a simple RESTful API built with Node.js, Express, and MongoDB to manage users. The API provides basic CRUD (Create, Read, Update, Delete) operations.

## Project Structure
```
backend-api/
│── db/
│   ├── db.js         # Database connection
│   ├── dbinit.js     # Initialize database with demo data
│
│── models/
│   ├── User.js       # User model schema
│
│── routes/
│   ├── userRoutes.js # User-related API routes
│
│── server.js         # Main server file
│── package.json      # Project dependencies and scripts
│── README.md         # API documentation and setup instructions
│── .gitignore        # Files to ignore in Git
```

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Start the Server
```sh
node server.js
```
By default, the server runs on `http://localhost:3000`

### 3. Initialize Database with Demo Data
To populate the database with sample users, run:
```sh
node db/dbinit.js
```

## API Endpoints

### Create a User
**Endpoint:** `POST /users`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}
```
- **Response:**
```json
{
  "_id": "60d5f484bc3b4e3d4c8b4567",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}
```

### Retrieve All Users
**Endpoint:** `GET /users`
- **Response:**
```json
[
  {
    "_id": "60d5f484bc3b4e3d4c8b4567",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28
  }
]
```

### Retrieve a Single User
**Endpoint:** `GET /users/:id`
- **Response:**
```json
{
  "_id": "60d5f484bc3b4e3d4c8b4567",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}
```

### Update a User
**Endpoint:** `PUT /users/:id`
- **Request Body:**
```json
{
  "name": "John Smith"
}
```
- **Response:**
```json
{
  "_id": "60d5f484bc3b4e3d4c8b4567",
  "name": "John Smith",
  "email": "john@example.com",
  "age": 28
}
```

### Delete a User
**Endpoint:** `DELETE /users/:id`
- **Response:**
```json
{
  "message": "User deleted"
}
```

## Testing the API
You can test the API using tools like:
- **Postman** (GUI-based API testing)
- **cURL** (Command-line API testing)
- **REST Client** (VS Code extension)

Example cURL command to create a user:
```sh
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name": "Alice", "email": "alice@example.com", "age": 25}'
```

## Notes
- Ensure MongoDB is running before starting the server.
- `db/dbinit.js` resets the database and adds demo users.
- Error handling is implemented for invalid inputs and non-existent users.



