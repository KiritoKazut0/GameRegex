import LoginForm from "./pages/Login"
import HomePage from "./pages/Home"
import RegisterForm from "./pages/Register"

import {RouterProvider, createBrowserRouter} from "react-router-dom"


const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm/>
  },

  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/Register',
    element: <RegisterForm/>
  }
])

function App() {
  return <RouterProvider router={myRouter}/>
}

export default App
