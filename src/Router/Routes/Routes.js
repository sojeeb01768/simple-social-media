import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Comments from "../../Pages/Comments/Comments";
import About from "../../Pages/Home/About/About";
import Home from "../../Pages/Home/Home/Home";
import ShowPost from "../../Pages/Home/ShowPost/ShowPost";
import Login from "../../Pages/Login/Login";
import Media from "../../Pages/Media/Media";
import ShowDetails from "../../Pages/ShowDetails/ShowDetails";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoutes><Home></Home></PrivateRoutes>
            },
            {
                path: '/about',
                element: <About></About>
                // loader: ({ params }) => fetch(`http://localhost:5000/profiles/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/media',
                element: <PrivateRoutes><Media></Media></PrivateRoutes>
            },
            {
                path: '/showdetails/:id',
                element: <ShowDetails></ShowDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/showdetails/${params.id}`)
            },

        ]
    }
])

export default router;