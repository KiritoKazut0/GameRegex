import LoginForm from "./pages/Login"
import HomePage from "./pages/Home"
import {RouterProvider, createBrowserRouter} from "react-router-dom"


const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm/>
  },

  {
    path: '/home',
    element: <HomePage/>
  }
])

function App() {
  return <RouterProvider router={myRouter}/>
}

export default App
