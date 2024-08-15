import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react"
import { MentorProvider } from './contexts/Context'
import HomeLayout from './pages/HomeLayout'
import Explore from './pages/Explore'
import Activity from './pages/Activity'
import Auth from './pages/Auth'
import {Loader2 } from 'lucide-react'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader2 size={60} className='animate-spin text-primary' />
    </div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Explore />,
          },
          {
            path: "activity",
            element: <Activity />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_VERCEL_CLERK_PUBLISHABLE_KEY}>
      <MentorProvider>
        <RouterProvider router={router} />
      </MentorProvider>
    </ClerkProvider>
  )
}

export default App