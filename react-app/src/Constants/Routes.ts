import Home from "../UI/Pages/Home";
import SignIn from "../UI/Pages/SignIn";
import SignUp from "../UI/Pages/SignUp";

interface IRoute{
    path: string;
    page: () => JSX.Element;
}

export const Routes:IRoute[] = [
    {
        path: "/home",
        page: Home
    },
    {
        path: "/signIn",
        page: SignIn
    },
    {
        path: "/signUp",
        page: SignUp
    }
]
