import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home";
import Settings from './pages/Settings';
import Single from './pages/Single';
import Write from './pages/Write';
import Login from "./pages/Login"
import Register from './pages/Register'
import { Context } from './context/Context';
import { useContext } from "react";
import Footer from "./components/footer/Footer";




function App() {
  const {user} = useContext(Context);

  function Layout(){
    return(
    <>
    <Outlet/>
    <Footer/>
    </>
    )
  }
  
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: user? <Home/>: <Login/>,
        },
        {
          path: "/post/:id",
          element: user? <Single/> : <Register/>
        },
        {
          path: "/write",
          element: user? <Write/> : <Register/>
        },
        {
          path: "/settings",
          element: user ? <Settings/>  : <Register/>
        },
      ]
    },
    {
      path: "/register",
      element: user ? <Home/>  :<Register/>
    },
    {
      path: "/login",
      element:  user ? <Home/> :<Login/>
    
    },
  
  ])
  

  return (
    
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;
