import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const user = { name: "Nguyễn Hoàng Huy" };

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // Detect active parent menus
  const isImportActive = location.pathname.startsWith("/admin/import");
  const isUsersActive = location.pathname.startsWith("/admin/users");

  // Optional: tự mở menu nếu đang đứng trong route con
  useEffect(() => {
    if (isImportActive) setOpenMenu("import");
    else if (isUsersActive) setOpenMenu("users");
  }, [isImportActive, isUsersActive]);

  const linkClass = ({ isActive }) =>
    [
      "block px-4 py-2 rounded transition",
      "hover:bg-slate-800",
      isActive ? "bg-slate-700" : "",
    ].join(" ");

  const subLinkClass = ({ isActive }) =>
    [
      "block px-4 py-2 rounded transition text-sm",
      "hover:bg-slate-800/70",
      isActive ? "bg-slate-700/70" : "",
    ].join(" ");

  const menuButtonClass = (menuKey, forceActive = false) =>
    [
      "w-full text-left px-4 py-2 rounded font-medium transition flex items-center justify-between",
      "hover:bg-slate-800",
      openMenu === menuKey || forceActive ? "bg-slate-800" : "",
    ].join(" ");

  const handleLogout = () => navigate("/");

  return (
    <div className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-6 py-4 text-xl font-bold border-b border-slate-800">
        Bảng điều khiển Admin
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2 flex-1">
        {/* QUAN TRỌNG: thêm end để không active sai */}
        <NavLink to="/admin" end className={linkClass}>
          Tổng quan
        </NavLink>

        {/* Nhập hàng */}
        <div>
          <button
            type="button"
            onClick={() => toggleMenu("import")}
            className={menuButtonClass("import", isImportActive)}
            aria-expanded={openMenu === "import"}
          >
            <span>Nhập hàng</span>
            <i className="fa-solid fa-caret-down" />
          </button>

          {openMenu === "import" && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink to="/admin/import/list" className={subLinkClass}>
                Danh sách phiếu nhập
              </NavLink>
              <NavLink to="/admin/import/create" className={subLinkClass}>
                Tạo phiếu nhập
              </NavLink>
            </div>
          )}
        </div>

        {/* Sản phẩm */}
        <NavLink to="/admin/products" className={linkClass}>
          Sản phẩm
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          Danh mục
        </NavLink>

        <NavLink to="/admin/sales" className={linkClass}>
          Bán hàng
        </NavLink>

        {/* Người dùng */}
        <div>
          <button
            type="button"
            onClick={() => toggleMenu("users")}
            className={menuButtonClass("users", isUsersActive)}
            aria-expanded={openMenu === "users"}
          >
            <span>Người dùng</span>
            <i className="fa-solid fa-caret-down" />
          </button>

          {openMenu === "users" && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink to="/admin/users/customers" className={subLinkClass}>
                Khách hàng
              </NavLink>
              <NavLink to="/admin/users/admins" className={subLinkClass}>
                Quản trị viên
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/admin/analytics" className={linkClass}>
          Thống kê
        </NavLink>
        <NavLink to="/admin/suppliers" className={linkClass}>
          Nhà cung cấp
        </NavLink>
      </nav>

      {/* User info + Logout */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="relative pr-6">
            <p className="text-sm text-slate-400">Quản trị</p>
            <span className="absolute w-2 h-2 top-1 right-0 rounded-full bg-green-500 animate-pulse" />
            <p className="font-medium">{user.name}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded transition hover:bg-slate-800"
            title="Đăng xuất"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
