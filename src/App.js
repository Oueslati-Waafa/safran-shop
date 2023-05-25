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
            <Route exact path="/product/:slug" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
