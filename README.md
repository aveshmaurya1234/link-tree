# LinkHub - LinkTree Clone

A full-stack LinkTree clone built using React, Node.js, Express, MongoDB, and Redux Toolkit.

## Features

* User Authentication (JWT)
* Profile Management
* Public Profile Page
* Add / Edit / Delete Links
* Click Analytics
* Responsive Design
* Protected Routes

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Joi Validation

## Screens

* Dashboard
* Profile Page
* Analytics Page
* Public Profile Page

## Environment Variables

Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

Backend (.env)

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
npm run dev
```

## Analytics

Every public link click is tracked automatically.

Flow:

User Click
→ Redirect API
→ Click Count Increment
→ Redirect To Actual URL

## Public Profile

Example:

```text
https://your-domain.com/avesh
```

## Author

Avesh Maurya

MERN Stack Developer