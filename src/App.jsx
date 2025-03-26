import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./components/HomePage"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [{ path: "/dashboard", element: <Dashboard /> }],
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
