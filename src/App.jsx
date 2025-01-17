import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



let query = new QueryClient()
let routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])
function App() {


  return <>

    <QueryClientProvider client={query}>
      <UserContextProvider>
        <ReactQueryDevtools />
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
    </QueryClientProvider>

  </>

}

export default App
