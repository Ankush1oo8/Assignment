# Employee Data Management System

A modern, full-stack Employee CRUD application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Features a professional dark-themed interface with comprehensive employee management capabilities.

## 🚀 Features

### Core Functionality
- **Full CRUD Operations**: Create, read, update, and delete employees
- **Advanced Search**: Real-time search with field-specific filtering (name, email, position)
- **Form Validation**: Real-time validation with visual feedback and error handling
- **Professional UI**: Dark theme with modern design principles
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### Technical Features
- **MongoDB Integration**: Robust database connection with proper error handling
- **RESTful API**: Clean API endpoints with proper HTTP status codes
- **TypeScript**: Full type safety throughout the application
- **Test Coverage**: Comprehensive backend API tests
- **Email Validation**: Prevents duplicate email addresses
- **Loading States**: Smooth user experience with loading indicators

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS, shadcn/ui components
- **Testing**: Jest, jsdom
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- npm, yarn, or pnpm

## ⚡ Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd employee-crud-app
npm install
\`\`\`

### 2. Environment Setup

Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/employee-management
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-management
\`\`\`

### 3. Database Setup

Run the database seeding script to create sample data:

\`\`\`bash
npm run seed
\`\`\`

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/employees/          # API routes for CRUD operations
│   │   ├── route.ts           # GET (all), POST (create)
│   │   └── [id]/route.ts      # GET, PUT, DELETE (single employee)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── employee-management.tsx    # Main container component
│   ├── employee-table.tsx         # Data table with actions
│   ├── employee-header.tsx        # Search and add functionality
│   ├── employee-form-modal.tsx    # Create/edit modal
│   ├── delete-confirmation-modal.tsx # Delete confirmation
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── mongodb.ts             # Database connection
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # Utility functions
├── scripts/
│   └── create-test-data.ts    # Database seeding script
└── __tests__/
    └── api/employees.test.ts  # API endpoint tests
\`\`\`

## 🔌 API Endpoints

### Employee Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | Fetch all employees with optional search |
| `POST` | `/api/employees` | Create a new employee |
| `GET` | `/api/employees/[id]` | Fetch a specific employee |
| `PUT` | `/api/employees/[id]` | Update an employee |
| `DELETE` | `/api/employees/[id]` | Delete an employee |

### Request/Response Examples

#### Create Employee
\`\`\`bash
POST /api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer"
}
\`\`\`

#### Search Employees
\`\`\`bash
GET /api/employees?search=john&field=name
\`\`\`

#### Response Format
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@company.com",
      "position": "Software Engineer",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
\`\`\`

## 🎨 UI Components

### Main Components

- **EmployeeManagement**: Main container with state management
- **EmployeeTable**: Data table with sorting and actions
- **EmployeeHeader**: Search bar and add employee button
- **EmployeeFormModal**: Create/edit form with validation
- **DeleteConfirmationModal**: Confirmation dialog for deletions

### Search & Filtering

The search functionality supports:
- **Global search**: Search across all fields
- **Field-specific search**: Filter by name, email, or position
- **Real-time results**: Updates as you type

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Test Coverage

The test suite covers:
- All CRUD API endpoints
- Input validation
- Error handling
- Database operations
- Edge cases and error scenarios

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

\`\`\`env
MONGODB_URI=your_production_mongodb_uri
\`\`\`

## 🔧 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run seed         # Seed database with sample data
\`\`\`

## 📝 Employee Data Model

\`\`\`typescript
interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### Validation Rules

- **Name**: Required, 2-50 characters
- **Email**: Required, valid email format, unique
- **Position**: Required, 2-50 characters

## 🎯 Key Features Explained

### Real-time Search
- Search across all employee fields simultaneously
- Field-specific filtering options
- Instant results with debounced input

### Form Validation
- Real-time validation with visual feedback
- Success/error icons for immediate feedback
- Comprehensive error messages

### Professional UI
- Dark theme with excellent contrast ratios
- Consistent spacing and typography
- Responsive design for all screen sizes
- Loading states and empty state handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Issues**
- Verify your `MONGODB_URI` is correct
- Ensure MongoDB is running (for local installations)
- Check network connectivity for cloud databases

**Build Errors**
- Clear `.next` folder and rebuild
- Verify all dependencies are installed
- Check TypeScript errors

**API Errors**
- Check browser console for detailed error messages
- Verify API endpoints are accessible
- Ensure proper request formatting

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section above

---

Built with ❤️ using Next.js, TypeScript, and MongoDB
