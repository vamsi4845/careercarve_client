
import HomeLayout from './pages/HomeLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Explore from './pages/Explore'
import Activity from './pages/Activity'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path:"/",
        element: <Explore />,
      },
      {
        path:"/activity",
        element: <Activity/>,
      }
    ],
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
