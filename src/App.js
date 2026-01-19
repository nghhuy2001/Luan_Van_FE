import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"
import ProductDetail from "./pages/ProductDetail";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import Account from "./pages/Account";
import Purchase from "./pages/Purchase";
import UserLayout from "./layouts/UserLayout";
import Address from "./pages/Address";
import ChangePassword from "./pages/ChangePassword";
import { Toaster } from "react-hot-toast";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/admin/Products/ProductList";
import Analytics from "./pages/admin/Analytics/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import ImportProducts from "./pages/admin/Import/ImportProducts";
import ImportList from "./pages/admin/Import/ImportList";
import ImportViewModalPage from "./pages/admin/Import/ImportViewModalPage";
import ProductEdit from "./pages/admin/Products/ProductEdit";
import CategoryList from "./pages/admin/Categories/CategoryList";
import SalesOrderList from "./pages/admin/Sales/SalesOrderList";
import {AdminListPage, CustomerListPage} from "./pages/admin/Users/UserListPage";
import SupplierListPage from "./pages/admin/Suppliers/SupplierListPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="top-center"
        containerStyle={{
          marginTop: "85px",
        }}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  CUSTOMER  */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/checkout" element={<Order />} />
          <Route path="/brand/:brand" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<UserLayout />}>
            <Route path="account" element={<Account />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="address" element={<Address />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/*    ADMIN  */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index  element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="import/list" element={<ImportList />} />
          <Route path="import/create" element={<ImportProducts />} />
          <Route path="import/:importCode" element={<ImportViewModalPage />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="sales" element={<SalesOrderList />} />
          <Route path="users/customers" element={<CustomerListPage />} />
          <Route path="users/admins" element={<AdminListPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="suppliers" element={<SupplierListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
