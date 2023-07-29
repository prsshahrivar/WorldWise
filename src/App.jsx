import {lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// Context APIs
import {CitiesProvider} from "./contexts/CitiesContext";
import {AuthProvider} from "./contexts/FakeAuthContext";

// Components
import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
// This Component Does Not Allow Going to App Routes While Not Logged In.
import ProtectedRoute from "./pages/ProtectedRoute";



// Implementing Lazy Loading For Each Page for Responsiveness and Optimization .
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


export default function App() {


    return (

        <AuthProvider>
            <CitiesProvider>


                <BrowserRouter>
                    {/* Suspense IS a React Component which Shows <SpinnerFullPage/> While Another Page is Lazy Loading. */}
                    <Suspense fallback={<SpinnerFullPage/>}>
                        <Routes>
                            <Route index element={<Homepage/>}/>


                            <Route path="/app" element={<ProtectedRoute> <AppLayout/> </ProtectedRoute>}>
                                <Route index element={<Navigate replace to="cities"/>}/>
                                <Route path="cities" element={<CityList/>}/>
                                <Route path="cities/:id" element={<City/>}/>
                                <Route path="countries" element={<CountryList/>}/>
                                <Route path="form" element={<Form/>}/>
                            </Route>
                            <Route path="/login" element={<Login/>}/>


                            <Route path="/product" element={<Product/>}/>
                            <Route path="/pricing" element={<Pricing/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>

                </BrowserRouter>


            </CitiesProvider>
        </AuthProvider>
    )
}