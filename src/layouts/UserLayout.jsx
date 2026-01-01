import { Outlet } from "react-router-dom";
import UserSidebar from "../components/User/UserSidebar";

// Layout for User Account pages
const UserLayout = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-6xl mx-auto flex gap-6">
                
                {/* Sidebar */}
                <div className="w-64">
                    <UserSidebar />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded shadow p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
