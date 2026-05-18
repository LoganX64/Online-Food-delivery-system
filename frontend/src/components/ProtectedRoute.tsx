import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('customer' | 'restaurantOwner' | 'admin')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium text-sm animate-pulse">
          Verifying secure session...
        </p>
      </div>
    );
  }

  // Not authenticated -> redirect to login with return path
  if (!isAuthenticated) {
    // Determine the best login page to redirect to based on the attempted path
    let loginPath = '/login';
    if (location.pathname.startsWith('/admin')) {
      loginPath = '/admin/login';
    } else if (location.pathname.startsWith('/restaurant')) {
      loginPath = '/restaurant/login';
    }

    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Authenticated but wrong role -> show fallback UI
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Access Restricted</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          You are signed in as a <span className="font-semibold text-foreground capitalize">{role.replace('Owner', ' Owner')}</span>, 
          which does not have permission to view this directory.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
