import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Comments from "../../Pages/Comments/Comments";
import About from "../../Pages/Home/About/About";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Media from "../../Pages/Media/Media";
import ShowDetails from "../../Pages/ShowDetails/ShowDetails";
import Signup from "../../Pages/Signup/Signup";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
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
                element: <Media></Media>
            },
            {
                path: '/comments/:id',
                element: <Comments></Comments>,
                loader: ({ params }) => fetch(`http://localhost:5000/comments/${params.id}`)
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