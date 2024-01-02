# Form Builder

## Description

The Form Builder is a dynamic application developed with Next.js and integrated with Supabase for backend services. It allows users to create custom forms with various field types, manage them, and view submissions.

## Features

- Create custom forms with different field types (text, email, multi-select, etc.).
- Drag and drop to rearrange fields.
- Save forms in Supabase database.
- View and manage created forms.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version 12 or later)
- npm or Yarn

## Installation

To set up the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository/form-builder.git
2. **Navigate to the project directory:**
   ```bash
   cd form-builder
3. **Install the dependencies:**
   ```bash
   npm install
   # or
   yarn install

## Environment Setup

Create a .env.local file in the project root with the following variables:

```makefile
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
Replace your_supabase_url and your_supabase_anon_key with your actual Supabase project details.

## Running the Application

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```
## Running Tests

To run the tests, execute the following command:
```bash
npm test
# or
yarn test
```
## Usage

- **Creating a Form**: Navigate to the form builder interface to create a new form.
- **Editing a Form**: Click on a form to edit its fields and properties.
- **Viewing Forms**: All created forms are listed and can be managed from the main dashboard.

## Detailed API Documentation

For more detailed information about the API endpoints, response formats, and usage examples, see our [API Documentation](documentation.md).

## Contributing

Contributions to the project are welcome. Please follow the standard fork, branch, and pull request workflow.
