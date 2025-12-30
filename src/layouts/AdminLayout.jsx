// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* sau này có AdminSidebar */}
            <Outlet />
        </div>
    );
};

export default AdminLayout;
