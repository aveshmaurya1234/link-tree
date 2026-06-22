# LinkHub - LinkTree Clone

## Overview

LinkHub is a full-stack LinkTree-inspired application that allows users to create a personalized public profile and share multiple links through a single URL.

Users can register, log in, manage their profile, add social or custom links, and track link performance through analytics.

---

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Protected Routes

### Profile Management

* Update Profile Information
* Upload Profile Picture
* Username Support
* Public Profile Page

### Link Management

* Create Link
* Update Link
* Delete Link
* View All Links

### Analytics

* Total Links Count
* Total Clicks Count
* Top Performing Link
* Link Performance Tracking

### Public Profile

* Shareable Public URL
* Display User Information
* Display User Links
* Click Tracking

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Joi Validation

---

## Project Structure

Frontend

src/
├── components/
├── pages/
├── routes/
├── redux/
├── layouts/
├── lib/
└── helpers/

Backend

src/
├── modules/
│   ├── user/
│   ├── link/
│   └── analytics/
├── middleware/
├── models/
├── shared/
└── config/

---

## Public Profile URL

https://your-domain.com/:username

Example:

https://your-domain.com/avesh

---

## Analytics Flow

Visitor Click

↓

GET /api/links/redirect/:id

↓

Clicks + 1

↓

Redirect To Original URL

---

## Future Improvements

* Drag and Drop Link Ordering
* Theme Customization
* QR Code Generation
* Social Login
* Profile View Tracking
* Custom Domains

---

## Author

Avesh Maurya

Full Stack Developer (MERN Stack)