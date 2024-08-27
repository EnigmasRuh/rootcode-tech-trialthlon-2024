import {RouterProvider,createBrowserRouter} from "react-router-dom";

import MainLayOut from "../LayOut/LayOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";


const router1 = createBrowserRouter([{
  path : "/",
  element : <MainLayOut/>,
  children : [{
   index : true,
   element : <Home/>
   },
]
},
  {path : "/login",
    children : [{
      index: true,
      element : <Login/>,
    }]},

]);

const AppRouter = () => {
  return  <RouterProvider router={router1}/>;
}

export default AppRouter;

