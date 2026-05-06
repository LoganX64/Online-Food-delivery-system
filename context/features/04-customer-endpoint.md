Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Requirements

### 1) Customer Module

Create a customer-facing feature set with model, validation, and endpoint support.

---

### A) Restaurant (Customer)

- `GET /restaurants?pincode=`
  * Fetch restaurants based on pincode
  * Validate query param
  * Return 200 status code
  * Return list of restaurants
  * Return empty array if none found

- `GET /restaurants/:id`
  * Fetch a single restaurant by ID
  * Return 200 status code
  * Return restaurant details
  * Return 404 if not found

- `GET /restaurants/:id/menu`
  * Fetch menu items for a restaurant
  * Return 200 status code
  * Return list of menu items
  * Return 404 if restaurant not found

---

### B) Cart

- `GET /cart`
  * Get current user's cart
  * Return 200 status code
  * Return cart with items and pricing details

- `POST /cart/add`
  * Add item to cart
  * Validate request body (menuItemId, quantity)
  * If item exists, update quantity
  * Return updated cart

- `PUT /cart/update`
  * Update item quantity in cart
  * Validate input
  * Return updated cart
  * Handle invalid quantity (e.g., <= 0)

- `DELETE /cart/remove`
  * Remove item from cart
  * Validate input (menuItemId)
  * Return updated cart

- `DELETE /cart/clear`
  * Clear entire cart for current user
  * Return success message

---

### C) Orders (Customer)

- `POST /orders`
  * Create a new order from cart
  * Validate cart is not empty
  * Calculate total amount
  * Store order items snapshot (avoid future menu changes impact)
  * Clear cart after successful order creation
  * Return created order details

- `GET /orders`
  * Get all orders for current user
  * Return 200 status code
  * Return list of orders

- `GET /orders/:id`
  * Get a single order by ID
  * Ensure order belongs to current user
  * Return 200 status code
  * Return order details
  * Return 404 if not found

---

### D) Payment

- `POST /payment/webhook`
  * Handle payment gateway webhook
  * Verify webhook signature
  * Update order payment status
  * Ensure idempotency (avoid duplicate updates)
  * Return 200 acknowledgment

---

### 2) Validation

- Validate all request params, query, and body inputs
- Ensure IDs are valid ObjectIds
- Validate quantities, price calculations, and required fields
- Return structured and meaningful error messages

---

### 3) Security Considerations

- Authenticate user for cart and order endpoints
- Ensure users can only access their own cart and orders
- Validate ownership before operations
- Sanitize inputs to prevent injection attacks

---

### 4) Output Expectations

Generate production-friendly code with:

* clean folder structure
* proper error handling
* environment-based configuration
* readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.