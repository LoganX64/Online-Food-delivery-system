# 🚀 Backend API Routes

This document provides a comprehensive list of all API endpoints available in the Online Food Delivery System.

## 🔑 Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive a token | No |
| POST | `/auth/forgot-password` | Request password reset token | No |
| POST | `/auth/reset-password/:token` | Reset password using token | No |
| POST | `/auth/logout` | Logout and clear session | Yes |
| GET | `/auth/me` | Fetch current authenticated user | Yes |

## 👤 User Profile (`/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/users/me` | Fetch profile of current user | Yes |
| PUT | `/users/me` | Update profile of current user | Yes |
| POST | `/users/profile-image` | Upload/Update profile image | Yes |
| POST | `/users` | Create a new user (Admin) | Yes(to check whether user is admin or not) |
| GET | `/users` | Fetch all users (Admin) | Yes(to check whether user is admin or not) |
| GET | `/users/:id` | Fetch user by ID (Admin) | Yes(to check whether user is admin or not) |
| PUT | `/users/:id` | Update user by ID (Admin) | Yes(to check whether user is admin or not) |
| DELETE | `/users/:id` | Delete user by ID (Admin) | Yes(to check whether user is admin or not) |

## 📍 Address Management (`/addresses`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/addresses` | Add a new address | Yes(to check he is adding his own address or not) |
| GET | `/addresses` | Fetch all addresses for current user | Yes(to check he is fetching his own address or not) |
| GET | `/addresses/:id` | Fetch address by ID | Yes(to check he is fetching his own address or not) |
| PUT | `/addresses/:id` | Update address by ID | Yes(to check he is updating his own address or not) |
| DELETE | `/addresses/:id` | Delete address by ID | Yes(to check he is deleting his own address or not) |

## 🏠 Restaurant Management (Owner) (`/restaurant`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/restaurant/me` | Fetch owner's restaurant | Yes (Owner) |
| PUT | `/restaurant/me` | Update owner's restaurant | Yes(to check owner is updating his own restaurant or not) |
| GET | `/restaurant/orders` | Fetch orders for the restaurant | Yes(to check owner is fetching his own orders or not) |
| PUT | `/restaurant/orders/:id/accept` | Accept an order | Yes(to check owner is accepting his own order or not) |
| PUT | `/restaurant/orders/:id/reject` | Reject an order | Yes(to check owner is rejecting his own order or not) |
| PUT | `/restaurant/orders/:id/status` | Update order status | Yes(to check owner is updating his own order or not) |
| POST | `/restaurant` | Register a new restaurant | Yes (Owner) |
| GET | `/restaurant` | Fetch all restaurants | No |
| GET | `/restaurant/:id` | Fetch restaurant by ID | No |
| PUT | `/restaurant/:id` | Update restaurant by ID | Yes(to check admin is updating restaurant or not) |
| DELETE | `/restaurant/:id` | Delete restaurant by ID | Yes(to check admin is deleting restaurant or not) |

## 🔍 Restaurant Discovery (Public) (`/restaurants`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/restaurants` | Fetch restaurants (filtered by pincode) | No |
| GET | `/restaurants/:id` | Fetch restaurant details | No |
| GET | `/restaurants/:id/menu` | Fetch restaurant menu items | No |

## 🍕 Menu Management (`/menu`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/menu` | Add a new menu item | Yes(to check owner is adding menu item to his own restaurant or not) |
| GET | `/menu` | Fetch all menu items | No |
| GET | `/menu/:id` | Fetch menu item by ID | No |
| PUT | `/menu/:id` | Update menu item by ID | Yes(to check owner is updating his own menu item or not) |
| DELETE | `/menu/:id` | Delete menu item by ID | Yes(to check owner is deleting his own menu item or not) |

## 🛒 Cart Management (`/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/cart` | Fetch user's cart | Yes |
| POST | `/cart/add` | Add item to cart | Yes |
| PUT | `/cart/update` | Update item quantity in cart | Yes |
| DELETE | `/cart/remove` | Remove item from cart | Yes |
| DELETE | `/cart/clear` | Clear entire cart | Yes |

## 💳 Checkout & Orders (`/orders` & `/checkout`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/orders` | Place order from cart | Yes |
| GET | `/orders` | Fetch user's order history | Yes |
| GET | `/orders/:id` | Fetch order details | Yes |
| POST | `/checkout` | Checkout and place order | Yes(to check if its login or not) |

## 💰 Payments (`/payment`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/payment/webhook` | Handle Stripe/Payment webhooks | Yes |

## 🛡️ Admin Dashboard (`/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/admin/restaurants` | Fetch all restaurants for review | Yes (Admin) |
| POST | `/admin/restaurants/:id/approve` | Approve a restaurant | Yes (Admin) |
| POST | `/admin/restaurants/:id/reject` | Reject a restaurant | Yes (Admin) |
| PUT | `/admin/restaurants/:id/deactivate` | Deactivate a restaurant | Yes (Admin) |

## 🏥 Health Check
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/api/health` | Check detailed system status | No |
| GET | `/` | Simple server running check | No |
