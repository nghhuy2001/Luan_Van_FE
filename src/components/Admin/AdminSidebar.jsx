import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);

    const user = {
        name: "Nguyễn Hoàng Huy",
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded transition
        hover:bg-slate-800
        ${isActive ? "bg-slate-700" : ""}`;

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col">
            {/* Logo */}
            <div className="px-6 py-4 text-xl font-bold border-b border-slate-800">
                Admin Panel
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-2 flex-1">
                {/* Products */}
                <div>
                    <button
                        onClick={() => toggleMenu("products")}
                        className="w-full text-left px-4 py-2 rounded font-medium transition hover:bg-slate-800"
                    >
                        Products
                    </button>

                    {openMenu === "products" && (
                        <div className="ml-4 mt-1 space-y-1 text-sm">
                            <NavLink to="/admin/products" className={linkClass}>
                                Product List
                            </NavLink>
                            <NavLink to="/admin/categories" className={linkClass}>
                                Categories
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Sales */}
                <NavLink to="/admin/sales" className={linkClass}>
                    Sales
                </NavLink>

                {/* Users */}
                <div>
                    <button
                        onClick={() => toggleMenu("users")}
                        className="w-full text-left px-4 py-2 rounded font-medium transition hover:bg-slate-800"
                    >
                        Users
                    </button>

                    {openMenu === "users" && (
                        <div className="ml-4 mt-1 space-y-1 text-sm">
                            <NavLink
                                to="/admin/users/customers"
                                className={linkClass}
                            >
                                Customers
                            </NavLink>
                            <NavLink
                                to="/admin/users/admins"
                                className={linkClass}
                            >
                                Admins
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Analytics */}
                <NavLink to="/admin/analytics" className={linkClass}>
                    Analytics
                </NavLink>
            </nav>

            {/* User info + Logout */}
            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <p className="text-sm text-slate-400 ">Admin</p>
                        <span className="absolute w-2 h-2 top-1 right-[85px] rounded-full bg-green-600 animate-pulse"></span>
                        <p className="font-medium">{user.name}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="p-2 rounded transition hover:bg-slate-800"
                        title="Logout"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
