# Form Builder API Documentation

## Overview

This document provides detailed information about the Form Builder API, designed to create and manage dynamic forms. Developed using Next.js and integrated with Supabase, this API facilitates operations related to form creation, editing, and retrieval.

## Setup Instructions

**Clone the Repository:**
```bash
git clone https://github.com/your-repository/form-builder.git
```
**Install Dependencies:**
```bash
cd form-builder
npm install
```
**Set Environment Variables:**

Create a .env.local file with the necessary Supabase credentials.

**Run the Application:**
```bash 
npm run dev
```
## API Endpoints

### 1. Create Form
- **Endpoint**: `/api/forms`
- **Method**: `POST`
- **Description**: Creates a new form.
- **Request Body**:
  ```json
  {
    "name": "Form Name",
    "fields": [
      {
        "type": "text",
        "label": "First Name"
      }
      // ... other fields
    ]
  }

- **Response**:
```json
{
  "status": "success",
  "message": "Form created successfully."
},
{
  "status": "Error (4xx/5xx)",
  "message": "Error details."
}
```
### 2. Get Forms
- **Endpoint**: `/api/forms`
- **Method**: `GET`
- **Description**: Retrieves a list of all forms.
- **Response:**
```json
{
  "status": "success",
  "message": "Array of form objects."
},
{
  "status": "Error (4xx/5xx)",
  "message": "Error details."
}
```
### 3. Update Form
- **Endpoint**: /api/forms/{formId}
- **Method**: `PUT`
- **Description**: Updates a specific form.
- **Request Parameters**: formId - The ID of the form to update.
- **Request Body:**
```json
{
  "name": "Updated Form Name",
  "fields": [/* updated fields */]
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Form updated successfully."
},
{
  "status": "Error (4xx/5xx)",
  "message": "Error details."
}.
```
### 4. Delete Form
- **Endpoint**: /api/forms/{formId}
- **Method**: `DELETE`
- **Description**: Deletes a specific form.
- **Request Parameters**: formId - The ID of the form to delete.
- **Response:**
```
{
  "status": "success",
  "message": "Form deleted successfully."
},
{
  "status": "Error (4xx/5xx)",
  "message": "Error details."
}.
```
## Usage Examples

### Creating a Form:
```bash
curl -X POST http://localhost:3000/api/forms -H "Content-Type: application/json" -d '{
  "name": "Form Name",
  "fields": [
    {
      "type": "text",
      "label": "First Name"
    }
    // ... other fields
  ]
}'
```
### Fetching Forms:
```bash
curl http://localhost:3000/api/forms
```

Key Points:
- **Endpoint URL**: Ensure you include the full URL (including `http://localhost:3000` if you're testing locally).
- **Content-Type Header**: For `POST` requests with JSON data, it's important to set `Content-Type: application/json` in the header.
- **JSON Data**: The `-d` flag in `curl` is used to pass data. Ensure your JSON data is correctly formatted.

These usage examples provide clear instructions for interacting with your API using `curl`, a common tool for testing HTTP endpoints.


## Design Decisions and Challenges

### Architecture:
**Why Next.js:**

We chose Next.js for its seamless server-side rendering capabilities, which enhance our application's performance and SEO. Its easy-to-use routing and built-in API support allowed us to rapidly develop both the frontend and backend.

**Why Supabase:**

Supabase provided a quick and efficient way to set up our backend. Its real-time database features and ready-to-use authentication saved us significant development time.

## Contributing

We welcome contributions from everyone. Please report issues via GitHub issues and suggest new features or improvements through pull requests. Keep all interactions respectful and constructive.
