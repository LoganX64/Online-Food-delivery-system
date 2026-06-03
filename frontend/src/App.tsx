import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="foodieflow-theme">
      <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
