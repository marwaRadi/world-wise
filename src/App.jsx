import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense ,lazy} from "react";


//context
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
// components
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// pages

// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const HomePage = lazy(()=>import('./pages/Homepage'))
const Pricing = lazy(()=>import('./pages/Pricing'))
const Product = lazy(()=>import('./pages/Product'))
const PageNotFound = lazy(()=>import('./pages/PageNotFound'))
const Login = lazy(()=>import('./pages/Login'))
const AppLayout = lazy(()=>import('./pages/AppLayout'))

function App() {
  return (
    <>
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route index element={<HomePage />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="product" element={<Product />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
    </>
  );
}

export default App;
