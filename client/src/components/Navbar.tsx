import { Link2 as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router';
import { useAuth } from '@/lib/useAuth';

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    isAuthenticated ? signOut() : navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <LinkIcon className="h-6 w-6" />
          <span className="font-bold text-lg">URLShortener</span>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </a>
          {isAuthenticated && (
            <a href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </a>
          )}
          <Button variant="ghost" onClick={handleAuthAction}>
            {isAuthenticated ? 'Sign out' : 'Sign in'}
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
