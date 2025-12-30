// layouts/CustomerLayout.jsx
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const CustomerLayout = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100">
                <Outlet />
            </main>
            <Footer/>
        </>
    );
};

export default CustomerLayout;
