import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const NavBar = () => {
    return (
        <div className="w-full bg-blue-900">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex gap-8 text-white font-medium py-3">

                    <li className="hover:text-yellow-400 cursor-pointer">
                        <Link to="/">Trang Chủ</Link>
                    </li>

                    {/* Dropdown Danh mục */}
                    <li className="relative group cursor-pointer">
                        <span className="hover:text-yellow-400">
                            Danh mục
                        </span>

                        {/* Menu dropdown */}
                        <div className="navbar absolute left-0 top-full mt-2 hidden group-hover:block bg-white text-gray-800 rounded shadow-lg min-w-[220px] z-50">
                            <ul className="py-2">

                                {/* Thương hiệu */}
                                <li className="px-4 py-2 font-semibold text-gray-600">
                                    Thương hiệu
                                </li>
                                 <hr className="my-2" />
                                <Link to="/brand/asus">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        ASUS
                                    </li>
                                </Link>
                                <Link to="/brand/dell">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        Dell
                                    </li>
                                </Link>
                                <Link to="/brand/msi">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        MSI
                                    </li>
                                </Link>
                                <Link to="/brand/hp">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        HP
                                    </li>
                                </Link>
                                <Link to="/brand/lenovo">
                                    <li className="px-4 py-2 hover:bg-gray-100">
                                        Lenovo
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </li>

                    <li className="hover:text-yellow-400 cursor-pointer">Linh Kiện</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Bảo Hành</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Giới Thiệu</li>
                    <li className="hover:text-yellow-400 cursor-pointer">Liên Hệ</li>

                </ul>
            </div>
        </div>
    );
};

export default NavBar;
