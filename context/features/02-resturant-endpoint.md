Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Requirements

### 1) Restaurant Module

Create a restaurant feature with model, validation, and endpoint support.

#### A) Restaurant CRUD

- `POST /restaurant` → create a new restaurant
  * Validate the request body before saving
  * Return helpful validation errors

- `GET /restaurant` → fetch all restaurants
  * Return 200 status code
  * Return list of restaurants
  * Exclude password field

- `GET /restaurant/:id` → fetch a single restaurant by ID
  * Return 200 status code
  * Return restaurant details
  * Exclude password field
  * Return 404 if not found

- `PUT /restaurant/:id` → update a restaurant
  * Return 200 status code
  * Return updated restaurant
  * Exclude password field
  * Return 404 if not found

- `DELETE /restaurant/:id` → soft delete a restaurant
  * Return 200 status code
  * Return success message
  * Return 404 if not found

#### B) Restaurant (Owner)

- `POST /restaurant` → create a new restaurant
  * Return 200 status code
  * Return restaurant details
  * Exclude password field
  * Return 400 if restaurant already exists

- `GET /restaurant/me` → fetch the restaurant of the logged-in owner
  * Return 200 status code
  * Return restaurant details
  * Exclude password field
  * Return 404 if not found

- `PUT /restaurant/me` → update the restaurant of the logged-in owner
  * Return 200 status code
  * Return updated restaurant
  * Exclude password field
  * Return 404 if not found


### C)  Restaurant Orders

- `GET /restaurant/orders` → fetch all orders
  * Return 200 status code
  * Return list of orders
  * Exclude password field

- `PUT /restaurant/orders/:id/accept` → accept an order
  * Return 200 status code
  * Return updated order
  * Exclude password field
  * Return 404 if not found

- `PUT /restaurant/orders/:id/reject` → reject an order
  * Return 200 status code
  * Return updated order
  * Exclude password field
  * Return 404 if not found

- `PUT /restaurant/orders/:id/status` → update an order status
  * Return 200 status code
  * Return updated order
  * Exclude password field
  * Return 404 if not found

---


### 4) Output Expectations

Generate production-friendly code with:

* clean folder structure
* proper error handling
* environment-based configuration
* readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.