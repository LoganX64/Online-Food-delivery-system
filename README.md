# Online Food Delivery Platform 🍔

![Development Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)

A comprehensive, multi-restaurant food ordering system where users can browse restaurants based on location, add items from multiple restaurants to a single cart, and execute a unified checkout that splits into restaurant-specific orders.

> **Note:** This project is currently in active development. The backend API is fully structured, and the frontend UI is currently being built. The philosophy for this project is _"First make it work, then make it beautiful."_ Currently, the frontend and backend run independently and will be wired together in an upcoming phase.

## 🏗 Architecture & Features

This platform supports three primary roles—**Customer**, **Restaurant Owner**, and **Admin**—enforced by strict Role-Based Access Control (RBAC).

### Key Features (Completed & In-Progress)

- **Multi-Restaurant Cart & Checkout:** Users can mix items from different restaurants in one cart. The backend intelligently splits a single checkout transaction into separate orders per restaurant.
- **Robust Authentication:** JWT-based authentication stored securely in **HTTP-only cookies** to prevent XSS attacks.
- **Role-Based Dashboards:**
  - **Customers** can manage profiles, addresses, and track order lifecycles.
  - **Restaurant Owners** can manage menus (with Cloudinary image uploads), view incoming orders, and update order statuses.
  - **Admins** approve/reject restaurant applications and monitor platform activity.
- **Location-Based Discovery:** Users can filter and search for restaurants and food items based on their pincode.
- **Centralized Error Handling:** Consistent API responses utilizing a custom `AppError` class and global error middleware.

## 🤖 AI-Assisted Development Workflow

This project was built from the ground up using **Antigravity** (an advanced AI coding agent) driven by a highly structured **Spec-First AI Workflow**.

Rather than relying on ad-hoc prompts, the AI's behavior is strictly governed by the `context/` directory in this repository.

- **`ai-workflow-rules.md`**: Imposes strict scoping—the AI is forced to work on one isolated feature at a time, preventing hallucinations and scope creep.
- **`architecture.md` / `project-overview.md`**: Provides the AI with the immutable boundaries of the system (e.g., stateless backend, strict HTTP-only cookies).
- **`progress-tracker.md`**: Acts as the system's memory, ensuring the AI and the developer are perfectly aligned on what is finished and what is next.

This approach demonstrates how to effectively manage, govern, and scale AI-generated code in complex, multi-layered software systems.

## 💻 Tech Stack

**Backend:**

- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT (HTTP-Only Cookies) & Bcrypt
- Zod (Schema Validation)
- Cloudinary & Multer (Image Management)

**Frontend:**

- React (Vite)
- TypeScript
- Tailwind CSS & Shadcn/ui (UI Components)
- React Router

## Demo

https://github.com/user-attachments/assets/39952738-2a34-4988-b916-9fc1b4c6cbbc

## 🚀 Setup & Installation (Coming Soon)

Docker configuration will be added soon to allow running both the frontend, backend, and database in a single command.

Currently, the project is divided into:

- `/backend`: Contains the Express server and API endpoints.
- `/frontend`: Contains the React Vite application.
- `/context`: Contains the system architecture, UI tokens, and AI workflow constraints.

---

_Designed and developed with 💡 and Antigravity AI._
