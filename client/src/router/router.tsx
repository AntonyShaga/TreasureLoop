import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import Home from "../pages/Home.tsx";
import Transactions, {transactionAction, transactionLoader} from "../pages/Transactions.tsx";
import Categories, {categoriesAction, categoryLoader} from "../pages/Categories.tsx";
import Auth from "../pages/Auth.tsx";
import {Layout} from "../pages/Layout.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";

export const router = createBrowserRouter([{
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: 'transactions',
            loader:transactionLoader,
            action:transactionAction,
            element: (<ProtectedRoute><Transactions/></ProtectedRoute>),
        },
        {
            path: 'categories',
            loader:categoryLoader,
            action: categoriesAction,
            element: (<ProtectedRoute><Categories/></ProtectedRoute>),
        },
        {
            path: 'auth',
            element: <Auth/>,
        }
    ]
}])
