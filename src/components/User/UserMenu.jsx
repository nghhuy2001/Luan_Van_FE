import MenuItem from "./MenuItem";
import "../../styles/user-menu.css";
import { Link } from "react-router-dom";

const UserMenu = () => {
    return (
        <div
            className=" user-menu
                absolute right-0 mt-3 w-56
                bg-white rounded-xl shadow-xl
                border border-gray-100
                z-50
            "
        >
            {/* Arrow */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>

            <ul className="py-2 text-sm">
                <Link to="/user/account"><MenuItem icon="fa-user" text="Thông tin cá nhân" /></Link>
                <Link to="/user/purchase"><MenuItem icon="fa-clock-rotate-left" text="Lịch sử đặt hàng" /></Link>
                <Link to="/user/password"><MenuItem icon="fa-key" text="Đặt lại mật khẩu" /></Link>

                <hr className="my-2" />

                {/* Chưa đăng nhập */}
                <Link to="/login"><MenuItem icon="fa-right-to-bracket" text="Đăng nhập" /></Link>
                <Link to="/register"><MenuItem icon="fa-user-plus" text="Đăng ký" /></Link>

                {/* Đã đăng nhập (sau này bật cái này) */}
                {/* <MenuItem icon="fa-right-from-bracket" text="Đăng xuất" danger /> */}
            </ul>
        </div>
    );
};

export default UserMenu;