import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
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
    ],
  },
])
