import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Menus from "@/pages/Menus"
import Cart from "@/pages/Cart"
import Checkout from "@/pages/Checkout"
import Orders from "@/pages/Orders"
import AdminDashboard from "@/pages/AdminDashboard"
import { UserDashboard } from "@/pages/UserDashboard"
import RestaurantDashboard from "@/pages/RestaurantDashboard"
import RestaurantLogin from "@/pages/RestaurantLogin"
import RestaurantRegister from "@/pages/RestaurantRegister"
import AdminLogin from "@/pages/AdminLogin"
import RestaurantPublic from "@/pages/RestaurantPublic"
import AllRestaurants from "@/pages/AllRestaurants"
import NotFound from "@/pages/NotFound"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"
import { 
  AboutUs, Careers, Contact, Blog, Support, SafetyConcerns, FAQs, 
  PrivacyPolicy, TermsOfService, CookiePolicy, Accessibility 
} from "@/pages/InfoPages"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "restaurant/login",
        element: <RestaurantLogin />,
      },
      {
        path: "restaurant/register",
        element: <RestaurantRegister />,
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantPublic />,
      },
      {
        path: "restaurants",
        element: <AllRestaurants />,
      },
      {
        path: "menus",
        element: <Menus />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute allowedRoles={['customer']}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute allowedRoles={['customer']}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "safety",
        element: <SafetyConcerns />,
      },
      {
        path: "faq",
        element: <FAQs />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsOfService />,
      },
      {
        path: "cookies",
        element: <CookiePolicy />,
      },
      {
        path: "accessibility",
        element: <Accessibility />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // ── Dashboard routes — outside Layout (no site Navbar / BottomNav) ──
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={['customer']}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['customer']}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurant-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['restaurantOwner']}>
        <RestaurantDashboard />
      </ProtectedRoute>
    ),
  },
    ],
  }
])

