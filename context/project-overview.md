# Project Overview

## Overview

This is a multi-restaurant online food ordering platform where users can browse restaurants based on their location, search and select food items, and place a single checkout order that is automatically split into multiple restaurant-specific orders. Each restaurant manages its own order lifecycle independently, while users pay once through a mock payment system and receive order confirmation and updates per restaurant order. The system supports three roles: customer, restaurant owner, and admin, with role-based access control using JWT authentication stored in HTTP-only cookies.

---

## Goals

1. Allow users to browse restaurants and food items based on pincode/location.
2. Enable users to add items from multiple restaurants into a single cart.
3. Support a single checkout that splits into multiple restaurant-specific orders.
4. Implement secure authentication using JWT with role-based access control.
5. Allow restaurant owners to manage menu items and process incoming orders.
6. Provide an admin system to approve and manage restaurants.
7. Simulate payment flow using mock payment integration.
8. Ensure consistent order state management through a defined order lifecycle.

---

## Core User Flow (Step-by-Step)

1. User registers or logs in to the platform.
2. User selects or adds a delivery address.
3. System fetches restaurants based on the selected address pincode.
4. User browses restaurants and views menus.
5. User adds food items from one or multiple restaurants into the cart.
6. User proceeds to checkout.
7. Backend validates cart items and groups them by restaurant.
8. System creates separate orders for each restaurant inside a single transaction.
9. Mock payment is initiated for the total amount.
10. On payment success:
    - Orders are marked as PLACED
    - Restaurant owners are notified (via dashboard)
11. Restaurant owners accept or reject orders.
12. Accepted orders move through preparation stages.
13. Delivery is completed using OTP-based verification.
14. User can view all orders and their statuses in the order history page.

---

## Features

### 1. Authentication & Authorization

- User registration and login
- JWT-based authentication stored in HTTP-only cookies
- Role-based access control (customer, restaurantOwner, admin)

---

### 2. Customer Features

- Browse restaurants based on pincode
- Search restaurants and food items
- View restaurant menus
- Add/remove items from cart
- Multi-restaurant cart support
- Checkout and place orders
- View order history and status
- Manage profile and profile image
- Manage multiple addresses

---

### 3. Restaurant Features

- Restaurant registration (admin approval required)
- Manage restaurant profile
- Create, update, and delete menu items
- View incoming orders
- Accept or reject orders
- Update order status (preparing, out for delivery, delivered)
- View basic earnings summary

---

### 4. Admin Features

- Approve or reject restaurant registrations
- Activate or deactivate restaurants
- Soft delete restaurants
- View all users
- View all restaurants
- View all orders for monitoring

---

### 5. Order & Payment System

- Multi-restaurant cart support
- Automatic order splitting per restaurant
- Order lifecycle management (created → placed → accepted → delivered)
- Mock payment integration
- Payment success/failure handling
- Order snapshot storage (price frozen at order time)

---

## In Scope

- Full customer ordering system
- Restaurant onboarding and management system
- Admin approval and monitoring system
- Multi-restaurant cart and checkout flow
- Mock payment system (no real payment gateway)
- JWT authentication with HTTP-only cookies
- Pincode-based restaurant filtering
- Order lifecycle management
- OTP-based delivery verification (simulation)

---

## Out of Scope

- Real payment gateway integration (Razorpay/Stripe live payments)
- Delivery driver assignment system
- Live GPS tracking of orders
- Real-time chat between users and restaurants
- Recommendation engine or AI-based suggestions
- Ratings and reviews system
- Advanced discount/coupon engine
- Push notifications or real-time WebSocket updates

---

## Success Criteria

The project is considered complete when:

- Users can register, log in, and manage their profile and addresses.
- Users can browse restaurants filtered by pincode and view menus.
- Users can add items from multiple restaurants into a single cart.
- Checkout successfully creates separate orders per restaurant.
- Mock payment flow correctly updates order statuses.
- Restaurant owners can view, accept, reject, and update orders.
- Admin can approve and manage restaurants.
- Order lifecycle is enforced correctly with no invalid state transitions.
- All APIs are secured using JWT and role-based access control.
- Data consistency is maintained across cart, orders, and payments.
