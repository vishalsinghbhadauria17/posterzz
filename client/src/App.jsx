import { Route, Routes, useLocation } from "react-router-dom"; 
import Home from "./pages/home/Home";
import Collection from "./pages/collection/Collection.jsx";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import Payments from "./components/payments/Payments.jsx";
import BackButton from "./components/backbutton/BackButton.jsx";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div className="App">
            <Navbar />
            <main>
                <div className="container main-content">
                    {location.pathname !== '/' && <BackButton />}
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryId?" element={<Collection />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/payments/:status" element={<Payments />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
export default App;