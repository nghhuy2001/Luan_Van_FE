import { useState } from "react";
import MiniCart from "../Cart/MiniCart";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "../User/UserMenu";

const TopBar = () => {
    const [showCart, setShowCart] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        navigate(`/search?q=${encodeURIComponent(keyword)}`);
        setKeyword("");
    };

    return (
        <div className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-700">
                    LAPTOP<span className="text-red-500">4</span><span className="text-black">YOU</span>
                </Link>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex-1 mx-6">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full border rounded-full px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>

                {/* Hotline + Cart + User */}
                <div className="flex items-center gap-4 relative">
                    <div className="bg-blue-900 text-white px-4 py-2 rounded-full">
                        📞 08.33.88.77.33
                    </div>

                    {/* Cart */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowCart(true)}
                        onMouseLeave={() => setShowCart(false)}
                    >
                        <span className="shadow bg-red-500 text-white rounded-full 
                        w-6 h-6 text-center leading-6 font-bold text-sm absolute -top-2 -right-2">
                            2
                        </span>
                        <button type="button" className="text-2xl">🛒</button>
                        {showCart && <MiniCart />}
                    </div>

                    {/* User */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowUserMenu(true)}
                        onMouseLeave={() => setShowUserMenu(false)}
                    >
                        <div className="w-10 h-10 flex items-center justify-center
                        rounded-full bg-gray-100 text-blue-900
                        hover:bg-blue-900 hover:text-white shadow cursor-pointer">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        {showUserMenu && <UserMenu />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
