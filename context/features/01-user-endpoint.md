# Backend Prompt

Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

Generate a backend entry point with a MongoDB health check and a complete user module.

## Requirements

Create a backend application that includes the following:

### 1) Health Check Entry Point

* Create a startup entry point for the backend.
* Add a health check endpoint such as `GET /health`.
* The endpoint should return a JSON response showing that the backend is running and MongoDB is connected.
* On startup, connect to MongoDB and print a clear console message:

  * success: `MongoDB connected successfully`
  * failure: a clear error message
* Read the MongoDB connection string from the `.env` file.
* Do not hardcode secrets or connection strings.

### 2) MongoDB Setup

* Use the MongoDB URI from `.env`.
* Set up the connection in a clean, reusable way.
* Handle connection errors properly.
* Keep the database connection logic separate from route logic.

### 3) User Module

Create a user feature with model, validation, and endpoint support.

#### User Schema

Use this structure for the `User` model:

```ts
User {
  _id: ObjectId,
  name: string,
  email: string,
  password: string,
  role: "customer" | "restaurantOwner" | "admin",
  profileImage?: string,
  phone?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Address Schema

Use this structure for the `Address` model:

```ts
Address {
  _id: ObjectId,
  userId: ObjectId,
  label: string, // home/work/other
  addressLine: string,
  city: string,
  state: string,
  pincode: string,
  isDefault: boolean,
  createdAt: Date
}
```

### 4) Validation

Add proper validation for user creation and address creation.

For `User`:

* `name` must be required and trimmed
* `email` must be required, valid, and unique
* `password` must be required and strong enough
* `role` must only allow `customer`, `restaurantOwner`, or `admin`
* `profileImage` should be optional
* `phone` should be optional and validated if provided
* `isActive` should default to `true`

For `Address`:

* `userId` must be required and reference a valid user
* `label` must allow only `home`, `work`, or `other`
* `addressLine`, `city`, `state`, and `pincode` must be required
* `isDefault` should default to `false`

### 5) User Endpoints

#### A) User CRUD

* `POST /users` → create a new user
  * Validate the request body before saving
  * Hash the password before storing it
  * Do not return the password in the response
  * Return helpful validation errors

* `GET /users` → fetch all users
  * Exclude `password` field from all results

* `GET /users/:id` → fetch a single user by ID
  * Exclude `password` field
  * Return 404 if not found

* `PUT /users/:id` → update a user
  * Allowed fields to update:
    * `name`
    * `phone`
    * `profileImage`
    * `role` (restricted — only admin should be able to change this)
    * `isActive`
  * Do not allow password updates through this endpoint
  * Return updated user (exclude password)

* `DELETE /users/:id` → soft delete a user
  * Do NOT remove the document from the database
  * Set `isActive = false` instead
  * Return a success message

#### B) Login (Authentication)

* `POST /auth/login`
  * Accept:
    * `email`
    * `password`
  * Validate that both fields are present and properly formatted
  * Look up user by email
  * Compare submitted password against stored hashed password using `bcryptjs`
  * If credentials are invalid, return a 401 error with a generic message
  * If valid:
    * Generate a JWT token
    * Return the token + user info (exclude `password`)

* **JWT Requirements**
  * Use `JWT_KEY` from `.env` as the secret
  * Token payload must include:
    * `userId`
    * `role`
  * Set expiration time of `7d` (or configurable via `.env`)

### 6) Code Structure

Organize the code properly with separate files for:

* server / entry point
* database connection
* models
* validation
* routes
* controllers or services

### 7) Output Expectations

Generate production-friendly code with:

* clean folder structure
* proper error handling
* environment-based configuration
* readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.
