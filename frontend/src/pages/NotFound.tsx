import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="flex items-center justify-center size-20 bg-primary/10 rounded-full mb-8">
        <AlertCircle className="size-10 text-primary" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-[42rem]">
        Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/">Go to Homepage</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
          <Link to={-1 as any} onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}>Go Back</Link>
        </Button>
      </div>
    </div>
  )
}
