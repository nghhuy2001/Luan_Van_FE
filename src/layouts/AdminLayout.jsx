// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            {/* Main content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
