import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Menus from "@/pages/Menus"
import Cart from "@/pages/Cart"
import Checkout from "@/pages/Checkout"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

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
        path: "menus",
        element: <Menus />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
])
