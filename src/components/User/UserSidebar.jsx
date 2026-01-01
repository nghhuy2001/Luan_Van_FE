import { NavLink } from "react-router-dom";

const UserSidebar = () => {
    const menu = [
        { label: "Hồ sơ", path: "/user/account", icon: "fa-user" },
        { label: "Địa chỉ", path: "/user/address", icon: "fa-location-dot" },
        { label: "Đổi mật khẩu", path: "/user/password", icon: "fa-key" },
        { label: "Đơn mua", path: "/user/purchase", icon: "fa-receipt" },
    ];

    return (
        <div className="bg-white rounded shadow p-4">
            {/* User info */}
            <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-user text-xl text-gray-500"></i>
                </div>
                <div>
                    <p className="font-semibold">huyhuy212vn</p>
                </div>
            </div>

            {/* Menu */}
            <ul className="mt-4 space-y-2">
                {menu.map(item => (
                    <NavItem key={item.path} {...item} />
                ))}
            </ul>
        </div>
    );
};

const NavItem = ({ label, path, icon }) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded transition
            ${isActive
                ? "bg-blue-50 text-blue-500 font-medium"
                : "text-gray-700 hover:bg-gray-100"}`
        }
    >
        <i className={`fa-solid ${icon}`}></i>
        {label}
    </NavLink>
);

export default UserSidebar;
