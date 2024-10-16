import { Button } from "@/components/ui/button"
import { Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <Link2 className="h-12 w-12 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}