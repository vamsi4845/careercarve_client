
import HomeLayout from './pages/HomeLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Explore from './components/ui/Explore'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path:"/",
        element: <Explore />,
      },
    ],
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
