Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Requirements

### 1) Menu Module (Restaurant)

Create a menu feature with model, validation, and endpoint support.

#### A) Menu CRUD

- `POST /menu` → create a new menu item
  * Validate the request body before saving
  * Return helpful validation errors

- `GET /menu` → fetch all menu items
  * Return 200 status code
  * Return list of menu items
  * Exclude password field

- `GET /menu/:id` → fetch a single menu item by ID
  * Return 200 status code
  * Return menu item details
  * Exclude password field
  * Return 404 if not found

- `PUT /menu/:id` → update a menu item
  * Return 200 status code
  * Return updated menu item
  * Exclude password field
  * Return 404 if not found

- `DELETE /menu/:id` → soft delete a menu item
  * Return 200 status code
  * Return success message
  * Return 404 if not found


### Image handling

- Menu items can have an image.
- The image should be uploaded to Cloudinary.
- The image URL should be stored in the menu item document.
- The image should be deleted when the menu item is deleted.
- The image should be updated when the menu item is updated.



### 2) Output Expectations

Generate production-friendly code with:

* clean folder structure
* proper error handling
* environment-based configuration
* readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.
