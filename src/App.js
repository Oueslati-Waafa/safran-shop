import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./Variables/StyleVariables.css";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import Contact from "./Pages/Contact/Contact";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Footer from "./Components/Footer/Footer";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import WishlistPage from "./Pages/WishlistPage/WishlistPage";
import AccountDetails from "./Pages/AccountDetails/AccountDetails";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Login from "./Components/Login/Login";
import NotFoundPage from "./Pages/404Page/NotFoundPage";
import ContinueOrder from "./Pages/ContinueOrder/ContinueOrder";
import ThankPage from "./Pages/CheckoutPage/ThankPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/about" element={<AboutUsPage />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route exact path="/wishlist" element={<WishlistPage />} />
            <Route exact path="/account" element={<AccountDetails />} />
            <Route exact path="/orders" element={<OrderHistory />} />
            <Route exact path="/product/:slug" element={<ProductPage />} />
            <Route exact path="/order/:id" element={<ContinueOrder />} />
            <Route exact path="/log" element={<Login />} />
            <Route exact path="/thank" element={<ThankPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
