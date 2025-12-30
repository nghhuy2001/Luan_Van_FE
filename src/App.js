import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import  "./index.css"
import ProductDetail from "./pages/ProductDetail";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import BackToTop from "./components/BackToTop";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/*  CUSTOMER  */}
           <Route element={<CustomerLayout/>}>
               <Route path="/" element={<Home />} />
               <Route path="/products/:id" element={<ProductDetail />} />
           </Route>

        {/*    ADMIN  */}
            <Route path="/admin" element={<AdminLayout />}>
                {/*<Route index element={<Dashboard />} />*/}
                {/*<Route path="products" element={<ProductManage />} />*/}
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
