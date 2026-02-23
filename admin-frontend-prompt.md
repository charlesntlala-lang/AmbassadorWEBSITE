# Admin Site Frontend Prompt

You are building an admin dashboard for the Ambassador International School website. Use the following specifications:

## Tech Stack (MUST USE)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Components**: Radix UI (same as existing project in `/components/ui/`)
- **Styling**: Tailwind CSS with `tailwind-merge` and `clsx` utilities
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts (already installed)
- **State Management**: React hooks (useState, useEffect)

## Project Structure
Create the admin site at `/app/admin` route with:
- `/app/admin/layout.tsx` - Admin layout with sidebar navigation
- `/app/admin/page.tsx` - Dashboard home
- `/app/admin/applications/page.tsx` - Student applications management
- `/app/admin/gallery/page.tsx` - Image gallery management
- `/app/admin/fees/page.tsx` - Fee structure management
- `/app/admin/settings/page.tsx` - School settings

## Features Required

### 1. Dashboard (Home)
- Overview cards showing:
  - Total applications received
  - Pending applications (payment not confirmed)
  - Confirmed admissions
  - Total gallery images
- Recent applications table (last 5)
- Quick action buttons

### 2. Applications Management
- Table view of all student applications with columns:
  - Reference ID, Student Name, Grade, Guardian Name, Guardian Phone, Payment Status, Date
- Filter by: payment status, grade, date range
- Search by student name or reference ID
- View application details in a modal/drawer
- Actions: View, Update payment status, Delete
- Export functionality (CSV)

### 3. Gallery Management
- Grid view of all images (from `/public/images/ais/` and `/public/images/hero/`)
- Upload new images with drag & drop
- Delete images
- Organize into categories (AIS images, Hero images)
- Image preview modal

### 4. Fee Management
- View and edit fee structure for:
  - Pre-school: Playgroup, Nursery, Reception
  - Primary: Grade 1-6
- Edit fields: Registration fee, Term 1-4 fees
- Edit extra fees ( Graduation, Sports, HEC Project, Gas)
- Save changes button

### 5. Settings
- School information management:
  - School name
  - Contact information
  - Payment details (EcoCash merchant number, Bank account)
- About content editor
- Programs management

## UI Design Guidelines
- Use existing UI components from `/components/ui/` (Button, Card, Table, Dialog, Input, etc.)
- Follow the same color scheme as the main site (blue primary: #1e40af or similar)
- Sidebar navigation with icons
- Responsive design (mobile-friendly)
- Loading states and error handling
- Toast notifications for actions (use existing sonner/ toast pattern)

## Data Flow
- For applications: Create API endpoints at `/api/applications/` (GET, POST, PATCH, DELETE)
- For images: Use existing `/api/images` endpoint and add upload endpoint
- For fees: Create `/api/fees` endpoint for CRUD operations
- Use local JSON file or simple backend storage for persistence (can use file system like the images API does)

## Important Notes
- The existing application modal collects: student details, guardian info, payment status, declarations
- Fee structure exists in the code (see application-modal.tsx)
- Images are stored in `/public/images/ais/` and `/public/images/hero/`

## Example API Endpoints to Create
```
GET    /api/applications     - List all applications
GET    /api/applications/[id] - Get single application
POST   /api/applications     - Create new application (from the public form)
PATCH  /api/applications/[id] - Update application status
DELETE /api/applications/[id] - Delete application
POST   /api/images/upload    - Upload new gallery image
DELETE /api/images/[filename] - Delete image
GET    /api/fees            - Get fee structure
PATCH  /api/fees            - Update fee structure
```

Generate the complete admin site with all pages, components, and API routes.
